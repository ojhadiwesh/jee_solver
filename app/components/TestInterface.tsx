import React, { useState, useEffect } from 'react';
import { Problem, TestConfig } from '../types/problem';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';

interface TestInterfaceProps {
  config: TestConfig;
  onEndTest: () => void;
}

export default function TestInterface({ config, onEndTest }: TestInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(config.duration * 60); // Convert minutes to seconds
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [questions, setQuestions] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testId] = useState(() => uuidv4());
  const { data: session } = useSession();

  // Load questions and check for existing progress
  useEffect(() => {
    const loadQuestionsAndProgress = async () => {
      try {
        // Fetch questions
        const response = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config),
        });

        if (!response.ok) throw new Error('Failed to fetch questions');
        const questionData = await response.json();
        setQuestions(questionData);

        // Check for existing progress if user is logged in
        if (session?.user?.email) {
          const progressResponse = await fetch(`/api/test-progress?testId=${testId}`);
          if (progressResponse.ok) {
            const progress = await progressResponse.json();
            if (progress) {
              setSelectedAnswers(progress.answers);
              setTimeRemaining(progress.timeRemaining);
              // Don't restore the current question index to allow users to navigate freely
            }
          }
        }

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load questions');
        setIsLoading(false);
      }
    };

    loadQuestionsAndProgress();
  }, [config, session, testId]);

  // Save progress periodically
  useEffect(() => {
    const saveProgress = async () => {
      if (!session?.user?.email || isPaused) return;

      try {
        await fetch('/api/test-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            testId,
            answers: selectedAnswers,
            timeRemaining,
            selectedTopic: config.topics[0],
            config,
          }),
        });
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    };

    // Save progress every 30 seconds
    const progressInterval = setInterval(saveProgress, 30000);
    
    // Also save when component unmounts
    return () => {
      clearInterval(progressInterval);
      saveProgress();
    };
  }, [session, testId, selectedAnswers, timeRemaining, config, isPaused]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused && timeRemaining > 0 && !showSubmitConfirm) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused, timeRemaining, showSubmitConfirm]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const getQuestionStatus = (index: number) => {
    const question = questions[index];
    if (selectedAnswers[question.id]) {
      return 'answered';
    }
    return 'unanswered';
  };

  const handleSubmitTest = async () => {
    try {
      const results = {
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(selectedAnswers).length,
        answers: selectedAnswers,
        timeSpent: config.duration * 60 - timeRemaining,
        subjects: config.subjects,
        topics: config.topics,
        difficulty: config.difficulty,
        questions,
      };

      const response = await fetch('/api/test-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results),
      });

      if (!response.ok) {
        throw new Error('Failed to save test results');
      }

      // Delete progress after successful submission
      if (session?.user?.email) {
        await fetch(`/api/test-progress?testId=${testId}`, {
          method: 'DELETE',
        });
      }

      const savedResults = await response.json();
      alert(`Test completed!\nScore: ${savedResults.score.toFixed(2)}%\nCorrect Answers: ${savedResults.correctAnswers}/${questions.length}`);
      
      onEndTest();
    } catch (error) {
      console.error('Error saving test results:', error);
      alert('There was an error saving your test results. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#2563EB]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Error Loading Questions</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">No Questions Available</h3>
          <p>No questions match the selected criteria. Please try different options.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Question Palette */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Palette</h3>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`
                    w-full aspect-square rounded-md text-sm font-medium
                    ${currentQuestionIndex === index ? 'ring-2 ring-[#2563EB]' : ''}
                    ${
                      getQuestionStatus(index) === 'answered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }
                    hover:opacity-80 transition-opacity
                  `}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 rounded"></div>
                <span className="text-sm text-gray-600">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <span className="text-sm text-gray-600">Not Answered</span>
              </div>
            </div>
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Timer and Controls */}
          <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-[#2563EB]">
                {formatTime(timeRemaining)}
              </div>
              <button
                onClick={togglePause}
                className={`px-4 py-2 rounded-md ${
                  isPaused
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                } text-white font-medium`}
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
            <div className="text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {isPaused ? (
              <div className="flex flex-col items-center justify-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Paused</h2>
                <p className="text-gray-600 mb-6">Click Resume to continue the test</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {currentQuestion.title}
                </h2>
                <p className="text-gray-600 mb-6">{currentQuestion.description}</p>

                {/* Options */}
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option.text)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                        selectedAnswers[currentQuestion.id] === option.text
                          ? 'border-[#2563EB] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-medium">
                        {String.fromCharCode(65 + index)}.
                      </span>{' '}
                      {option.text}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="px-6 py-2 bg-[#2563EB] text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Submit Test?</h3>
            <p className="text-gray-600 mb-6">
              You have answered {Object.keys(selectedAnswers).length} out of {questions.length} questions.
              Are you sure you want to submit?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTest}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
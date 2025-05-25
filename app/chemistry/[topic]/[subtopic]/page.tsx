'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import TestInterface from '../../../components/TestInterface';
import { Subject, Topic, Difficulty, TestConfig, Problem } from '../../../types/problem';

export default function SubtopicPage({ params }: { params: { topic: string; subtopic: string } }) {
  const router = useRouter();
  const [isStartingTest, setIsStartingTest] = useState(false);
  const [questions, setQuestions] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format the topic and subtopic names for display
  const topicName = decodeURIComponent(params.topic)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const subtopicName = decodeURIComponent(params.subtopic)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subjects: ['Chemistry' as Subject],
            topics: [topicName as Topic],
            difficulty: 'Medium' as Difficulty,
            numberOfQuestions: 50 // Fetch more than we need to get an accurate count
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }

        const data = await response.json();
        setQuestions(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load questions');
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [topicName]);

  const handleStartTest = () => {
    setIsStartingTest(true);
  };

  const handleEndTest = () => {
    setIsStartingTest(false);
    router.push(`/chemistry/${params.topic}`);
  };

  const testConfig: TestConfig = {
    subjects: ['Chemistry' as Subject],
    topics: [topicName as Topic],
    difficulty: 'Medium' as Difficulty,
    duration: 20,
    numberOfQuestions: Math.min(10, questions.length),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-red-50 text-red-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Error Loading Questions</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {!isStartingTest ? (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{subtopicName}</h1>
                <p className="text-gray-600">
                  Topic: {topicName}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Test Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-blue-800">Available Questions</h3>
                    <p className="text-blue-900">{questions.length} questions</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">Test Duration</h3>
                    <p className="text-blue-900">20 minutes</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">Questions in Test</h3>
                    <p className="text-blue-900">{Math.min(10, questions.length)} questions</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">Difficulty</h3>
                    <p className="text-blue-900">Medium</p>
                  </div>
                </div>
              </div>

              {questions.length > 0 ? (
                <button
                  onClick={handleStartTest}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Test
                </button>
              ) : (
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-yellow-800">
                    No questions are available for this topic yet. Please check back later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <TestInterface config={testConfig} onEndTest={handleEndTest} />
      )}
    </div>
  );
} 
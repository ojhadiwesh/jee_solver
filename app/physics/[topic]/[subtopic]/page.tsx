'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import TestInterface from '../../../components/TestInterface';
import { Subject, Topic, Difficulty, TestConfig } from '../../../types/problem';
import { physicsQuestions } from '../../../data/physicsQuestions';

export default function SubtopicPage({ params }: { params: { topic: string; subtopic: string } }) {
  const router = useRouter();
  const [isStartingTest, setIsStartingTest] = useState(false);

  // Format the topic and subtopic names for display
  const topicName = decodeURIComponent(params.topic)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const subtopicName = decodeURIComponent(params.subtopic)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const handleStartTest = () => {
    setIsStartingTest(true);
  };

  const handleEndTest = () => {
    setIsStartingTest(false);
    router.push(`/physics/${params.topic}`);
  };

  // Get available questions for this subtopic
  const availableQuestions = physicsQuestions[topicName]?.[subtopicName] || [];
  const questionCount = availableQuestions.length;

  const testConfig: TestConfig = {
    subjects: ['Physics' as Subject],
    topics: [topicName as Topic],
    difficulty: 'Medium' as Difficulty,
    duration: 20,
    numberOfQuestions: Math.min(10, questionCount), // Either 10 questions or all available questions
  };

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
                    <p className="text-blue-900">{questionCount} questions</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">Test Duration</h3>
                    <p className="text-blue-900">20 minutes</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">Questions in Test</h3>
                    <p className="text-blue-900">{Math.min(10, questionCount)} questions</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">Difficulty</h3>
                    <p className="text-blue-900">Medium</p>
                  </div>
                </div>
              </div>

              {questionCount > 0 ? (
                <button
                  onClick={handleStartTest}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Test
                </button>
              ) : (
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-yellow-800">
                    No questions are available for this subtopic yet. Please check back later.
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
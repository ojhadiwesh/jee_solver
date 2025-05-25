'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import TestInterface from '../../components/TestInterface';
import { Subject, Topic, Difficulty, TestConfig } from '../../types/problem';

export default function TopicPage({ params }: { params: { topic: string } }) {
  const router = useRouter();
  const [isStartingTest, setIsStartingTest] = useState(false);

  // Format the topic name for display
  const topicName = decodeURIComponent(params.topic)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const handleStartTest = () => {
    setIsStartingTest(true);
  };

  const handleEndTest = () => {
    setIsStartingTest(false);
    router.push('/maths'); // Return to maths page after test
  };

  const testConfig: TestConfig = {
    subjects: ['Mathematics' as Subject],
    topics: [topicName as Topic],
    difficulty: 'Medium' as Difficulty,
    duration: 30,
    numberOfQuestions: 10,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {!isStartingTest ? (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{topicName}</h1>
              <p className="text-gray-600 mb-8">
                Test your knowledge in {topicName} with a focused practice test.
                The test will contain 10 questions and last 30 minutes.
              </p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h2 className="font-semibold text-blue-900 mb-2">Test Details</h2>
                  <ul className="text-blue-800">
                    <li>• 10 questions</li>
                    <li>• 30 minutes duration</li>
                    <li>• Medium difficulty</li>
                    <li>• Focused on {topicName}</li>
                  </ul>
                </div>
                
                <button
                  onClick={handleStartTest}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <TestInterface config={testConfig} onEndTest={handleEndTest} />
      )}
    </div>
  );
} 
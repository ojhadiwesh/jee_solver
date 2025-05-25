'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import PhysicsSidebar from '../components/PhysicsSidebar';
import TestInterface from '../components/TestInterface';
import { physicsQuestions } from '../data/physicsQuestions';
import { Topic, Subject, Difficulty, TestConfig } from '../types/problem';

export default function PhysicsPage() {
  const [selectedTopic, setSelectedTopic] = useState<{ topic: string; subtopic: string } | null>(null);
  const [isStartingTest, setIsStartingTest] = useState(false);
  const router = useRouter();

  // Add navigation prevention when test is active
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isStartingTest) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handleNavigation = () => {
      if (isStartingTest) {
        if (!window.confirm('You have an active test. Are you sure you want to leave? Your progress will be lost.')) {
          throw 'Route Cancelled';
        }
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handleNavigation);

    // Clean up event listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [isStartingTest]);

  const handleTopicSelect = (topic: string, subtopic: string) => {
    if (isStartingTest) {
      if (!window.confirm('You have an active test. Are you sure you want to switch topics? Your progress will be lost.')) {
        return;
      }
    }
    setSelectedTopic({ topic, subtopic });
    setIsStartingTest(false);
  };

  const handleStartTest = () => {
    setIsStartingTest(true);
  };

  const handleEndTest = () => {
    setIsStartingTest(false);
    setSelectedTopic(null);
  };

  const testConfig: TestConfig | null = selectedTopic ? {
    subjects: ['Physics' as Subject],
    topics: [selectedTopic.topic as Topic],
    difficulty: 'Medium' as Difficulty,
    duration: 20,
    numberOfQuestions: 10
  } : null;

  // Get all chapters and their subtopics
  const chapters = Object.keys(physicsQuestions);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar preventNavigation={isStartingTest} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0">
          <PhysicsSidebar onSelectTopic={handleTopicSelect} />
        </aside>
        
        <main className="flex-1 p-6 overflow-y-auto">
          {!isStartingTest ? (
            selectedTopic ? (
              <div className="bg-white shadow rounded-lg p-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedTopic.subtopic}</h1>
                  <p className="text-gray-600">
                    Topic: {selectedTopic.topic}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">Test Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-blue-800">Test Duration</h3>
                      <p className="text-blue-900">20 minutes</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-800">Questions</h3>
                      <p className="text-blue-900">10 questions</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-800">Difficulty</h3>
                      <p className="text-blue-900">Medium</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartTest}
                  className="mx-auto block px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Test
                </button>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700">Select a topic from the sidebar to start a test</h2>
                <p className="mt-2 text-gray-500">Choose any chapter and topic to practice JEE Physics questions</p>
              </div>
            )
          ) : testConfig ? (
            <TestInterface config={testConfig} onEndTest={handleEndTest} />
          ) : null}
        </main>
      </div>
    </div>
  );
} 
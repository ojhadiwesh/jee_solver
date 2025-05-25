'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TestInterface from '../components/TestInterface';
import { Subject, Topic, Difficulty, TestConfig } from '../types/problem';

interface DBSubject {
  id: string;
  name: string;
  description: string | null;
  topics: DBTopic[];
}

interface DBTopic {
  id: string;
  name: string;
  description: string | null;
  problemCount: number;
}

export default function ProblemsPage() {
  const [isConfiguring, setIsConfiguring] = useState(true);
  const [subjects, setSubjects] = useState<DBSubject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [testConfig, setTestConfig] = useState<TestConfig>({
    subjects: [],
    topics: [],
    difficulty: 'Medium',
    duration: 60,
    numberOfQuestions: 30,
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('/api/subjects');
        if (!response.ok) throw new Error('Failed to fetch subjects');
        const data = await response.json();
        setSubjects(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load subjects');
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const difficulties = ['Easy', 'Medium', 'Hard'] as Difficulty[];

  const handleSubjectChange = (subjectName: string) => {
    setTestConfig(prev => {
      const newSubjects = prev.subjects.includes(subjectName)
        ? prev.subjects.filter(s => s !== subjectName)
        : [...prev.subjects, subjectName];
      
      // Update topics based on selected subjects
      const newTopics = prev.topics.filter(topic => 
        subjects
          .filter(s => newSubjects.includes(s.name))
          .some(s => s.topics.some(t => t.name === topic))
      );

      return {
        ...prev,
        subjects: newSubjects,
        topics: newTopics,
      };
    });
  };

  const handleTopicChange = (topicName: string) => {
    setTestConfig(prev => ({
      ...prev,
      topics: prev.topics.includes(topicName)
        ? prev.topics.filter(t => t !== topicName)
        : [...prev.topics, topicName],
    }));
  };

  const handleStartTest = () => {
    if (testConfig.subjects.length === 0) {
      alert('Please select at least one subject');
      return;
    }
    if (testConfig.topics.length === 0) {
      alert('Please select at least one topic');
      return;
    }
    setIsConfiguring(false);
  };

  const handleEndTest = () => {
    setIsConfiguring(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#2563EB]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="bg-red-50 text-red-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Error Loading Subjects</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {isConfiguring ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Configure Your Test</h1>
            
            {/* Subjects Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Subjects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subjects.map(subject => (
                  <button
                    key={subject.id}
                    onClick={() => handleSubjectChange(subject.name)}
                    className={`p-4 rounded-lg border-2 ${
                      testConfig.subjects.includes(subject.name)
                        ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg font-medium">{subject.name}</div>
                    <div className="text-sm text-gray-500">
                      {subject.topics.length} topics • {subject.topics.reduce((sum, topic) => sum + topic.problemCount, 0)} problems
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Topics Selection */}
            {testConfig.subjects.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Topics</h2>
                {subjects
                  .filter(subject => testConfig.subjects.includes(subject.name))
                  .map(subject => (
                    <div key={subject.id} className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-3">{subject.name}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {subject.topics.map(topic => (
                          <button
                            key={topic.id}
                            onClick={() => handleTopicChange(topic.name)}
                            className={`w-full p-3 rounded-lg border-2 transition-all ${
                              testConfig.topics.includes(topic.name)
                                ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] shadow-sm'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="text-left">
                              <div className="font-medium truncate">{topic.name}</div>
                              <div className="text-sm text-gray-500">{topic.problemCount} problems</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Test Configuration */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={testConfig.difficulty}
                    onChange={(e) => setTestConfig(prev => ({ ...prev, difficulty: e.target.value as Difficulty }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    value={testConfig.numberOfQuestions}
                    onChange={(e) => setTestConfig(prev => ({ ...prev, numberOfQuestions: parseInt(e.target.value) }))}
                    min={1}
                    max={100}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={testConfig.duration}
                    onChange={(e) => setTestConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    min={1}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Start Test Button */}
            <div className="flex justify-center">
              <button
                onClick={handleStartTest}
                disabled={testConfig.subjects.length === 0 || testConfig.topics.length === 0}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Test
              </button>
            </div>
          </div>
        ) : (
          <TestInterface config={testConfig} onEndTest={handleEndTest} />
        )}
      </main>
    </div>
  );
} 
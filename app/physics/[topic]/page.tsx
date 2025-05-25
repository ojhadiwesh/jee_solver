'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { physicsQuestions } from '../../data/physicsQuestions';

export default function TopicPage({ params }: { params: { topic: string } }) {
  const router = useRouter();

  // Format the topic name for display
  const topicName = params.topic
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Get subtopics for this topic
  const subtopics = Object.keys(physicsQuestions[topicName] || {});

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{topicName}</h1>
            <p className="text-gray-600">
              Select a subtopic to practice or take a test
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subtopics.map((subtopic) => {
              const questionCount = physicsQuestions[topicName][subtopic].length;
              const subtopicSlug = subtopic.toLowerCase().replace(/\s+/g, '-');

              return (
                <div
                  key={subtopic}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {subtopic}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {questionCount} questions available
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/physics/${params.topic}/${subtopicSlug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Start Practice →
                    </Link>
                    <span className="text-gray-500 text-sm">
                      ~20 min
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {subtopics.length === 0 && (
            <div className="text-center p-8 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800">
                No subtopics are available for this topic yet. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

// Define mathematics topics and their subtopics
const mathsTopics = [
  {
    name: 'Algebra',
    icon: '📐',
    subtopics: [
      'Complex Numbers',
      'Quadratic Equations',
      'Matrices & Determinants',
      'Sets, Relations & Functions',
      'Mathematical Induction',
      'Permutations & Combinations',
      'Binomial Theorem',
      'Sequences & Series'
    ]
  },
  {
    name: 'Calculus',
    icon: '∫',
    subtopics: [
      'Functions & Limits',
      'Continuity & Differentiability',
      'Applications of Derivatives',
      'Indefinite Integration',
      'Definite Integration',
      'Differential Equations',
      'Area Under Curves'
    ]
  },
  {
    name: 'Coordinate Geometry',
    icon: '📊',
    subtopics: [
      'Straight Lines',
      'Circles',
      'Parabola',
      'Ellipse',
      'Hyperbola',
      '3D Geometry'
    ]
  },
  {
    name: 'Trigonometry',
    icon: '📏',
    subtopics: [
      'Basic Concepts',
      'Trigonometric Functions',
      'Heights & Distances',
      'Trigonometric Equations',
      'Inverse Trigonometric Functions'
    ]
  },
  {
    name: 'Statistics & Probability',
    icon: '📈',
    subtopics: [
      'Measures of Central Tendency',
      'Probability',
      'Random Variables',
      'Bernoulli Trials',
      'Normal Distribution'
    ]
  }
];

export default function MathsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Mathematics</h1>
          <p className="mt-2 text-sm text-gray-600">
            Master JEE Mathematics through comprehensive topic coverage and targeted problem-solving
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mathsTopics.map((topic) => (
            <div
              key={topic.name}
              className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{topic.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-900">{topic.name}</h2>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Subtopics:</h3>
                  <ul className="space-y-2">
                    {topic.subtopics.map((subtopic) => (
                      <li key={subtopic} className="text-sm text-gray-600">
                        <Link 
                          href={`/maths/${topic.name.toLowerCase().replace(/ & /g, '-')}/${subtopic.toLowerCase().replace(/ /g, '-')}`}
                          className="hover:text-blue-600 flex items-center"
                        >
                          <span className="mr-2">•</span>
                          {subtopic}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      href={`/maths/${topic.name.toLowerCase().replace(/ & /g, '-')}`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      View All Problems →
                    </Link>
                    <span className="text-xs text-gray-500">
                      {topic.subtopics.length} subtopics
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Mathematics Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800">Problems Solved</h3>
              <p className="mt-2 text-2xl font-semibold text-blue-900">0/500</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-sm font-medium text-green-800">Accuracy Rate</h3>
              <p className="mt-2 text-2xl font-semibold text-green-900">0%</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-sm font-medium text-purple-800">Time Spent</h3>
              <p className="mt-2 text-2xl font-semibold text-purple-900">0h</p>
            </div>
          </div>
        </div>

        {/* Study Resources */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/maths/formulas" className="p-4 border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium text-gray-900">Formula Sheets</h3>
              <p className="text-sm text-gray-500">Quick reference guides</p>
            </Link>
            <Link href="/maths/previous-years" className="p-4 border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium text-gray-900">Previous Year Papers</h3>
              <p className="text-sm text-gray-500">Practice with real questions</p>
            </Link>
            <Link href="/maths/mock-tests" className="p-4 border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium text-gray-900">Mock Tests</h3>
              <p className="text-sm text-gray-500">Test your preparation</p>
            </Link>
            <Link href="/maths/video-lectures" className="p-4 border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium text-gray-900">Video Lectures</h3>
              <p className="text-sm text-gray-500">Visual learning resources</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
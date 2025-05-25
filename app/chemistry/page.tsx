'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { chemistryQuestions } from '../data/chemistryQuestions';
import { Topic } from '../types/problem';

// NCERT chapter icons
const chapterIcons: Record<Topic, string> = {
  'Some Basic Concepts of Chemistry': '⚗️',
  'Structure of Atom': '⚛️',
  'Chemical Bonding and Molecular Structure': '🔗',
  'States of Matter': '🌡️',
  'Thermodynamics': '🔥',
  'Solutions': '💧',
  'Electrochemistry': '⚡',
  'Chemical Kinetics': '⏱️',
  'Surface Chemistry': '🧪',
  'Solid State': '💎',
  // Other topics (needed for type completion)
  'Units, Dimensions & Measurement': '📏',
  'Mechanics & Properties of Matter': '⚡',
  'Thermal Physics': '🌡️',
  'Oscillations & Waves': '🌊',
  'Electrodynamics': '⚡',
  'Optics': '👁️',
  'Modern Physics': '🔮',
  'Electronics & Communication': '💻',
  'Physical Chemistry': '🧪',
  'Organic Chemistry': '🧬',
  'Inorganic Chemistry': '⚗️',
  'Algebra': '🔢',
  'Calculus': '📈',
  'Coordinate Geometry': '📐',
  'Trigonometry': '📏',
  'Statistics & Probability': '🎲'
};

export default function ChemistryPage() {
  // Get all chapters and their subtopics
  const chapters = Object.keys(chemistryQuestions);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Chemistry</h1>
            <p className="text-gray-600">
              JEE Chemistry syllabus organized by NCERT chapters
            </p>
          </div>

          <div className="space-y-8">
            {chapters.map((chapter) => {
              const subtopics = Object.keys(chemistryQuestions[chapter]);
              const totalQuestions = subtopics.reduce(
                (sum, subtopic) => sum + chemistryQuestions[chapter][subtopic].length,
                0
              );
              const chapterSlug = chapter
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

              return (
                <div key={chapter} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-label={chapter}>
                        {chapterIcons[chapter as Topic]}
                      </span>
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                          {chapter}
                        </h2>
                        <p className="text-gray-600">
                          {subtopics.length} subtopics • {totalQuestions} questions
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/chemistry/${chapterSlug}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subtopics.map((subtopic) => {
                      const questionCount = chemistryQuestions[chapter][subtopic].length;
                      const subtopicSlug = subtopic
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '');

                      return (
                        <Link
                          key={subtopic}
                          href={`/chemistry/${chapterSlug}/${subtopicSlug}`}
                          className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all"
                        >
                          <h3 className="font-medium text-gray-900 mb-2">
                            {subtopic}
                          </h3>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">
                              {questionCount} questions
                            </span>
                            <span className="text-blue-600 text-sm">
                              Practice →
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {chapters.length === 0 && (
            <div className="text-center p-8 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800">
                No chapters are available yet. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
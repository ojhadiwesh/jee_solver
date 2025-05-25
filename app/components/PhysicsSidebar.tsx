'use client';

import React, { useState } from 'react';
import { physicsQuestions } from '../data/physicsQuestions';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PhysicsSidebarProps {
  onSelectTopic: (topic: string, subtopic: string) => void;
}

// Physics chapter icons
const chapterIcons: { [key: string]: string } = {
  'Units, Dimensions & Measurement': '📏',
  'Mechanics & Properties of Matter': '⚡',
  'Thermal Physics': '🌡️',
  'Oscillations & Waves': '🌊',
  'Electrodynamics': '⚡',
  'Optics': '👁️',
  'Modern Physics': '🔮',
  'Electronics & Communication': '💻'
};

export default function PhysicsSidebar({ onSelectTopic }: PhysicsSidebarProps) {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const handleChapterClick = (chapter: string) => {
    setExpandedChapter(expandedChapter === chapter ? null : chapter);
  };

  return (
    <div className="w-64 bg-white shadow-lg h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Physics Chapters</h2>
        <div className="space-y-2">
          {Object.entries(physicsQuestions).map(([chapter, subtopics]) => {
            const subtopicCount = Object.keys(subtopics).length;
            const questionCount = Object.values(subtopics).reduce((sum, questions) => sum + questions.length, 0);

            return (
              <div key={chapter} className="rounded-lg overflow-hidden">
                <button
                  onClick={() => handleChapterClick(chapter)}
                  className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl" role="img" aria-label={chapter}>
                      {chapterIcons[chapter] || '📚'}
                    </span>
                    <div>
                      <span className="text-sm font-medium text-gray-700">{chapter}</span>
                      <p className="text-xs text-gray-500">
                        {subtopicCount} topics • {questionCount} questions
                      </p>
                    </div>
                  </div>
                  {expandedChapter === chapter ? (
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                {expandedChapter === chapter && (
                  <div className="bg-white border-l-2 border-blue-500 ml-2">
                    {Object.entries(subtopics).map(([subtopic, questions]) => (
                      <button
                        key={subtopic}
                        onClick={() => onSelectTopic(chapter, subtopic)}
                        className="w-full p-2 pl-4 text-left transition-colors hover:bg-blue-50"
                      >
                        <div className="text-sm text-gray-700">{subtopic}</div>
                        <div className="text-xs text-gray-500">{questions.length} questions</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 
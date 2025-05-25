'use client';

import React from 'react';
import { Subject, Topic, Difficulty, QuestionType } from '../types/problem';

interface SidebarProps {
  selectedSubjects: Subject[];
  selectedTopics: Topic[];
  selectedDifficulties: Difficulty[];
  selectedTypes: QuestionType[];
  onSubjectChange: (subject: Subject) => void;
  onTopicChange: (topic: Topic) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onTypeChange: (type: QuestionType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedSubjects,
  selectedTopics,
  selectedDifficulties,
  selectedTypes,
  onSubjectChange,
  onTopicChange,
  onDifficultyChange,
  onTypeChange,
}) => {
  const subjects: Subject[] = ['Physics', 'Chemistry', 'Mathematics'];
  const topics: Topic[] = ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Organic Chemistry', 'Calculus', 'Algebra'];
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
  const questionTypes: QuestionType[] = ['Single Choice', 'Multiple Choice', 'Numerical'];

  return (
    <div className="w-64 bg-white p-6 space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search problems..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div>
        <h3 className="font-medium mb-3">Subjects</h3>
        {subjects.map((subject) => (
          <div key={subject} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={subject}
              checked={selectedSubjects.includes(subject)}
              onChange={() => onSubjectChange(subject)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor={subject} className="ml-2 text-gray-700">
              {subject}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-medium mb-3">Topics</h3>
        {topics.map((topic) => (
          <div key={topic} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={topic}
              checked={selectedTopics.includes(topic)}
              onChange={() => onTopicChange(topic)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor={topic} className="ml-2 text-gray-700">
              {topic}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-medium mb-3">Difficulty</h3>
        {difficulties.map((difficulty) => (
          <div key={difficulty} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={difficulty}
              checked={selectedDifficulties.includes(difficulty)}
              onChange={() => onDifficultyChange(difficulty)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor={difficulty} className="ml-2 text-gray-700">
              {difficulty}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-medium mb-3">Question Type</h3>
        {questionTypes.map((type) => (
          <div key={type} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={type}
              checked={selectedTypes.includes(type)}
              onChange={() => onTypeChange(type)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor={type} className="ml-2 text-gray-700">
              {type}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 
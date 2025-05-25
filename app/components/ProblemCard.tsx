'use client';

import React, { useState } from 'react';
import { Problem } from '../types/problem';

interface ProblemCardProps {
  problem: Problem;
  currentProblem: number;
  totalProblems: number;
  onNext: () => void;
  onPrevious: () => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  currentProblem,
  totalProblems,
  onNext,
  onPrevious,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [workArea, setWorkArea] = useState('');

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onPrevious}
            disabled={currentProblem === 1}
            className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-gray-600">Problem {currentProblem} of {totalProblems}</span>
          <button
            onClick={onNext}
            disabled={currentProblem === totalProblems}
            className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="text-gray-600">Time Remaining: {Math.floor(problem.timeLimit)} min</div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{problem.subject}</span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{problem.difficulty}</span>
          <span className="text-gray-600 text-sm">Topic: {problem.topic}</span>
        </div>

        <h2 className="text-xl font-semibold">{problem.title}</h2>
        <p className="text-gray-700">{problem.description}</p>

        <div className="space-y-4">
          {problem.options.map((option, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedOption === option.text
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
              onClick={() => setSelectedOption(option.text)}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center mr-4">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Show Hint
            </button>
            <button className="text-blue-600 hover:text-blue-700 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Formula Sheet
            </button>
            <button className="text-red-600 hover:text-red-700 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Report Issue
            </button>
          </div>

          {showHint && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">Here's a hint to help you solve this problem...</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Your Work</h3>
          <textarea
            value={workArea}
            onChange={(e) => setWorkArea(e.target.value)}
            placeholder="Write your solution steps here..."
            className="w-full h-32 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => {
              // Handle submit
            }}
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard; 
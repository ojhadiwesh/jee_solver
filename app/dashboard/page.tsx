'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Navbar from '../components/Navbar';

interface ChartDataPoint {
  startedAt: string;
  score: number;
}

interface SubjectPerformance {
  subject: string;
  average: number;
}

interface TestResult {
  id: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  subjects: string[];
  topics: string[];
  difficulty: string;
  startedAt: string;
  completedAt: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await fetch('/api/test-results');
        const data = await response.json();
        setTestResults(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching test results:', error);
        setLoading(false);
      }
    };

    if (session) {
      fetchTestResults();
    }
  }, [session]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateAverageScore = () => {
    if (testResults.length === 0) return 0;
    return (
      testResults.reduce((sum, test) => sum + test.score, 0) / testResults.length
    ).toFixed(2);
  };

  const calculateSubjectPerformance = () => {
    const subjectScores: { [key: string]: { total: number; count: number } } = {};
    testResults.forEach((test) => {
      test.subjects.forEach((subject) => {
        if (!subjectScores[subject]) {
          subjectScores[subject] = { total: 0, count: 0 };
        }
        subjectScores[subject].total += test.score;
        subjectScores[subject].count += 1;
      });
    });

    return Object.entries(subjectScores).map(([subject, { total, count }]) => ({
      subject,
      average: total / count,
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Performance Dashboard</h1>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Overall Statistics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Tests Taken</p>
                  <p className="text-2xl font-bold text-[#2563EB]">{testResults.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-green-600">{calculateAverageScore()}%</p>
                </div>
              </div>
            </div>

            {/* Score Trend */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Score Trend</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={testResults as ChartDataPoint[]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="startedAt" 
                      tickFormatter={(date: string) => new Date(date).toLocaleDateString()} 
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      labelFormatter={(date: string) => formatDate(date)}
                      formatter={(value: number) => [`${value}%`, 'Score']}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#2563EB" name="Score" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Subject Performance */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Subject Performance</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={calculateSubjectPerformance()}
                      dataKey="average"
                      nameKey="subject"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ subject, average }: SubjectPerformance) => 
                        `${subject}: ${average.toFixed(1)}%`
                      }
                    >
                      {calculateSubjectPerformance().map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Tests */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Tests</h2>
              <div className="space-y-4">
                {testResults.slice(0, 5).map((test) => (
                  <div
                    key={test.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedTest(test)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {test.subjects.join(', ')} - {test.difficulty}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(test.startedAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#2563EB]">
                          {test.score.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-600">
                          {test.correctAnswers}/{test.totalQuestions} correct
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Test Details Modal */}
        {selectedTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Test Details</h3>
                <button
                  onClick={() => setSelectedTest(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{formatDate(selectedTest.startedAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Score</p>
                    <p className="font-medium">{selectedTest.score.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time Spent</p>
                    <p className="font-medium">{formatTime(selectedTest.timeSpent)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Difficulty</p>
                    <p className="font-medium">{selectedTest.difficulty}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Subjects</p>
                  <p className="font-medium">{selectedTest.subjects.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Topics</p>
                  <p className="font-medium">{selectedTest.topics.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Performance</p>
                  <p className="font-medium">
                    {selectedTest.correctAnswers} correct out of {selectedTest.totalQuestions} questions
                    ({((selectedTest.correctAnswers / selectedTest.totalQuestions) * 100).toFixed(1)}% accuracy)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 
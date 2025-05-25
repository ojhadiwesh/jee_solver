'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome, {session?.user?.name || 'Student'}!
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-700 mb-2">Your Progress</h2>
                <p className="text-blue-600">Problems Solved: 0</p>
                <p className="text-blue-600">Average Score: 0%</p>
              </div>

              {/* Recent Activity */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-green-700 mb-2">Recent Activity</h2>
                <p className="text-green-600">No recent activity</p>
              </div>

              {/* Upcoming Tests */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-purple-700 mb-2">Upcoming Tests</h2>
                <p className="text-purple-600">No upcoming tests</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors">
                Start Practice
              </button>
              <button className="bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors">
                Take Mock Test
              </button>
              <button className="bg-yellow-600 text-white p-3 rounded-md hover:bg-yellow-700 transition-colors">
                View Analytics
              </button>
              <button className="bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition-colors">
                Study Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 
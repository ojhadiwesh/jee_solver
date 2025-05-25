'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import PerformanceAnalytics from '../components/PerformanceAnalytics';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PerformanceAnalytics />
    </div>
  );
} 
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  tooltip: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, tooltip }) => {
  const isPositive = !change.startsWith('-');
  return (
    <motion.div 
      className="bg-white rounded-lg shadow p-6 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      data-tooltip-id={`tooltip-${title}`}
      data-tooltip-content={tooltip}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-600">{title}</div>
        {icon}
      </div>
      <div className="flex items-end">
        <div className="text-2xl font-bold mr-2">{value}</div>
        <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </div>
      </div>
      <ReactTooltip id={`tooltip-${title}`} place="top" />
    </motion.div>
  );
};

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const PerformanceAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Physics', 'Chemistry', 'Mathematics']);
  const [chartView, setChartView] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

  const handleDateRangeChange = (update: [Date | null, Date | null]) => {
    setDateRange({
      startDate: update[0],
      endDate: update[1]
    });
  };

  // Sample data for the line chart
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Physics',
        data: [65, 67, 75, 72, 78, 82],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Chemistry',
        data: [55, 58, 63, 70, 72, 75],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
      {
        label: 'Mathematics',
        data: [70, 73, 71, 78, 82, 85],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
      },
    ],
  };

  // Enhanced chart options with animations and interactions
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value: number) {
            return value + '%';
          }
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: false
      }
    }
  } as const;

  const recentActivity = [
    {
      subject: 'Physics',
      topic: 'Mechanics',
      score: '4/4',
      time: '1:45',
      timeAgo: '2 min ago',
      success: true,
    },
    {
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      score: '0/4',
      time: '3:20',
      timeAgo: '15 min ago',
      success: false,
    },
    {
      subject: 'Mathematics',
      topic: 'Calculus',
      score: '4/4',
      time: '2:10',
      timeAgo: '45 min ago',
      success: true,
    },
    {
      subject: 'Physics',
      topic: 'Thermodynamics',
      score: '4/4',
      time: '2:30',
      timeAgo: '1 hour ago',
      success: true,
    },
    {
      subject: 'Mathematics',
      topic: 'Trigonometry',
      score: '0/4',
      time: '4:15',
      timeAgo: '2 hours ago',
      success: false,
    },
  ];

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleExport = () => {
    // Implementation for exporting analytics data
    console.log('Exporting analytics...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Performance Analytics</h1>
          <p className="text-gray-600">Track your progress and identify areas for improvement</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <DatePicker
              selectsRange
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onChange={handleDateRangeChange}
              className="px-3 py-2 border rounded-md"
              placeholderText="Select date range"
            />
          </div>
          <button
            onClick={handleExport}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StatsCard
          title="Overall Score"
          value="76%"
          change="+5.2%"
          tooltip="Your overall performance across all subjects"
          icon={<svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>}
        />
        <StatsCard
          title="Average Time/Question"
          value="2.4 min"
          change="-0.3 min"
          tooltip="Average time spent per question compared to last week"
          icon={<svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>}
        />
        <StatsCard
          title="Questions Solved"
          value="1,248"
          change="+83"
          tooltip="Total number of questions attempted"
          icon={<svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>}
        />
        <StatsCard
          title="Accuracy Rate"
          value="82%"
          change="+2.1%"
          tooltip="Percentage of correct answers out of total attempts"
          icon={<svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>}
        />
      </motion.div>

      {/* Performance Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div 
          className="lg:col-span-2 bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Performance Trend</h2>
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['weekly', 'monthly', 'yearly'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setChartView(view as any)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      chartView === view 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>
              <div className="flex space-x-2">
                {['Physics', 'Chemistry', 'Mathematics'].map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      selectedSubjects.includes(subject)
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Line data={chartData} options={chartOptions} />
        </motion.div>

        {/* Topic-wise Performance */}
        <motion.div 
          className="bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-6">Topic-wise Performance</h2>
          
          {/* Physics Section */}
          <div className="mb-8">
            <h3 className="text-base font-medium text-gray-900 mb-4">Physics</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Mechanics</span>
                  <span className="text-sm font-medium">85/120</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '71%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">71% Accuracy</span>
                  <span className="text-xs text-gray-500">71% Complete</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Electromagnetism</span>
                  <span className="text-sm font-medium">65/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">65% Accuracy</span>
                  <span className="text-xs text-gray-500">65% Complete</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Thermodynamics</span>
                  <span className="text-sm font-medium">45/80</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '56%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">56% Accuracy</span>
                  <span className="text-xs text-gray-500">69% Complete</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Modern Physics</span>
                  <span className="text-sm font-medium">30/60</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">50% Accuracy</span>
                  <span className="text-xs text-gray-500">83% Complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chemistry Section */}
          <div className="mb-8">
            <h3 className="text-base font-medium text-gray-900 mb-4">Chemistry</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Physical Chemistry</span>
                  <span className="text-sm font-medium">75/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">75% Accuracy</span>
                  <span className="text-xs text-gray-500">75% Complete</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Organic Chemistry</span>
                  <span className="text-sm font-medium">55/120</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '46%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">46% Accuracy</span>
                  <span className="text-xs text-gray-500">38% Complete</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Inorganic Chemistry</span>
                  <span className="text-sm font-medium">60/90</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">67% Accuracy</span>
                  <span className="text-xs text-gray-500">73% Complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mathematics Section */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">Mathematics</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Calculus</span>
                  <span className="text-sm font-medium">90/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">90% Accuracy</span>
                  <span className="text-xs text-gray-500">90% Complete</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Algebra</span>
                  <span className="text-sm font-medium">80/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">80% Accuracy</span>
                  <span className="text-xs text-gray-500">80% Complete</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Coordinate Geometry</span>
                  <span className="text-sm font-medium">70/80</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">88% Accuracy</span>
                  <span className="text-xs text-gray-500">100% Complete</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Trigonometry</span>
                  <span className="text-sm font-medium">65/60</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '108%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">108% Accuracy</span>
                  <span className="text-xs text-gray-500">180% Complete</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Improvement Tips */}
        <motion.div 
          className="bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Improvement Tips</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-medium">1</span>
              </div>
              <div>
                <p className="text-gray-800">Focus more time on Organic Chemistry - your weakest topic</p>
                <p className="text-sm text-gray-500 mt-1">Currently at 46% accuracy with only 38% completion</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-medium">2</span>
              </div>
              <div>
                <p className="text-gray-800">Try to reduce time spent on easy questions</p>
                <p className="text-sm text-gray-500 mt-1">Your average time on 1-mark questions is higher than recommended</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-medium">3</span>
              </div>
              <div>
                <p className="text-gray-800">Practice more numerical type questions</p>
                <p className="text-sm text-gray-500 mt-1">Your accuracy in calculation-based problems is lower than theory</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <a href="#" className="text-blue-600 text-sm hover:underline">View All Activity</a>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`mt-1 p-1 rounded-full ${activity.success ? 'bg-green-100' : 'bg-red-100'}`}>
                  {activity.success ? (
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{activity.subject} - {activity.topic}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Time taken: {activity.time}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-sm ${activity.success ? 'text-green-600' : 'text-red-600'}`}>
                        {activity.score}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{activity.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics; 
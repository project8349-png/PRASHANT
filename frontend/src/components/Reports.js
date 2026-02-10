import React, { useState, useEffect, useContext } from 'react';
import { getWeeklyReport, getMonthlyReport } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { FiTrendingUp, FiBarChart2 } from 'react-icons/fi';

export default function Reports() {
  const { user } = useContext(AuthContext);
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [activeTab, setActiveTab] = useState('weekly');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const weekly = await getWeeklyReport();
      const monthly = await getMonthlyReport();
      setWeeklyData(weekly.data);
      setMonthlyData(monthly.data);
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };

  const data = activeTab === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="p-8 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600 mb-8 flex items-center gap-3">
          <FiBarChart2 className="text-4xl" /> Reports & Analytics
        </h1>

        <div className="flex gap-4 mb-8">
          {['weekly', 'monthly'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold transition capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-violet-500 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-violet-500'
              }`}
            >
              {tab === 'weekly' ? '📊 Weekly' : '📈 Monthly'}
            </button>
          ))}
        </div>

        {data && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Study Hours</h3>
                  <FiTrendingUp className="text-3xl text-blue-500" />
                </div>
                <p className="text-5xl font-bold text-blue-600 mb-2">
                  {data.totalStudyHours || 0}
                </p>
                {activeTab === 'monthly' && (
                  <p className="text-gray-600">
                    Avg: {data.avgStudyPerDay || 0} hours/day
                  </p>
                )}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Sleep Hours</h3>
                  <FiTrendingUp className="text-3xl text-purple-500" />
                </div>
                <p className="text-5xl font-bold text-purple-600 mb-2">
                  {data.totalSleepHours || 0}
                </p>
                {activeTab === 'monthly' && (
                  <p className="text-gray-600">
                    Avg: {data.avgSleepPerDay || 0} hours/day
                  </p>
                )}
              </div>
            </div>

            {/* Daily Breakdown */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Breakdown</h2>
              <div className="space-y-4">
                {data.activities && data.activities.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg border-l-4 border-indigo-500">
                    <div>
                      <p className="text-gray-700 font-semibold">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 text-sm">{activity.studyNotes || 'No notes'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 font-bold">📚 {activity.studyHours}h</p>
                      <p className="text-purple-600 font-bold">😴 {activity.sleepHours}h</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Visualization */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Goal Progress</h2>
              {data.activities && data.activities.some(a => a.weeklyGoals?.length > 0) ? (
                <div className="space-y-3">
                  {data.activities?.map((activity, idx) => (
                    activity.weeklyGoals?.map((goal, goalIdx) => (
                      <div key={`${idx}-${goalIdx}`} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{
                          backgroundColor: goal.completed ? '#10b981' : '#e5e7eb'
                        }}></div>
                        <span className={goal.completed ? 'line-through text-gray-400' : 'text-gray-800'}>
                          {goal.goal}
                        </span>
                      </div>
                    ))
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No goals set yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useContext, useEffect } from 'react';
import { addActivity, getTodayActivity } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { FiSave, FiActivity } from 'react-icons/fi';

export default function ActivityTracker() {
  const { user } = useContext(AuthContext);
  const [studyHours, setStudyHours] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);
  const [studyNotes, setStudyNotes] = useState('');
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [currentGoal, setCurrentGoal] = useState('');
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
    try {
      const response = await getTodayActivity();
      setActivity(response.data);
      setStudyHours(response.data.studyHours || 0);
      setSleepHours(response.data.sleepHours || 0);
      setStudyNotes(response.data.studyNotes || '');
      setWeeklyGoals(response.data.weeklyGoals || []);
    } catch (error) {
      console.error('Error loading activity:', error);
    }
  };

  const handleAddGoal = () => {
    if (currentGoal.trim()) {
      setWeeklyGoals([...weeklyGoals, { goal: currentGoal, completed: false }]);
      setCurrentGoal('');
    }
  };

  const handleSaveActivity = async () => {
    try {
      await addActivity({ studyHours, sleepHours, studyNotes, weeklyGoals });
      toast.success('Activity saved successfully!');
      loadActivity();
    } catch (error) {
      toast.error('Failed to save activity');
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 flex items-center gap-3">
          <FiActivity className="text-4xl" /> Daily Activity Tracker
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
            <label className="block text-gray-700 font-bold mb-2">Study Hours</label>
            <input
              type="number"
              value={studyHours}
              onChange={(e) => setStudyHours(parseFloat(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              min="0"
              max="24"
              step="0.5"
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
            <label className="block text-gray-700 font-bold mb-2">Sleep Hours</label>
            <input
              type="number"
              value={sleepHours}
              onChange={(e) => setSleepHours(parseFloat(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              min="0"
              max="24"
              step="0.5"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <label className="block text-gray-700 font-bold mb-2">What Did You Study?</label>
          <textarea
            value={studyNotes}
            onChange={(e) => setStudyNotes(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 resize-none h-32"
            placeholder="Write about your study session..."
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Weekly Goals</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={currentGoal}
              onChange={(e) => setCurrentGoal(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Add a new goal..."
            />
            <button
              onClick={handleAddGoal}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition"
            >
              Add Goal
            </button>
          </div>
          
          <div className="space-y-2">
            {weeklyGoals.map((goal, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => {
                    const newGoals = [...weeklyGoals];
                    newGoals[index].completed = !newGoals[index].completed;
                    setWeeklyGoals(newGoals);
                  }}
                  className="w-5 h-5 text-purple-600 rounded cursor-pointer"
                />
                <span className={goal.completed ? 'line-through text-gray-400' : 'text-gray-800'}>
                  {goal.goal}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSaveActivity}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2 text-lg"
        >
          <FiSave /> Save Activity
        </button>
      </div>
    </div>
  );
}

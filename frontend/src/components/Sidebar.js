import React from 'react';
import { FiActivity, FiMessageSquare, FiUsers, FiBookmark, FiBarChart2, FiLogOut, FiHome } from 'react-icons/fi';

export default function Sidebar({ activeTab, setActiveTab, logout }) {
  const menuItems = [
    { id: 'activity', label: 'Activity', icon: <FiActivity /> },
    { id: 'chat', label: 'Chat', icon: <FiMessageSquare /> },
    { id: 'friends', label: 'Friends', icon: <FiUsers /> },
    { id: 'notes', label: 'Notes', icon: <FiBookmark /> },
    { id: 'reports', label: 'Reports', icon: <FiBarChart2 /> }
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-6 shadow-xl min-h-screen">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <FiHome className="text-3xl" /> PRASHANT
      </h1>

      <nav className="space-y-3 mb-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
              activeTab === item.id
                ? 'bg-white text-purple-600 shadow-lg'
                : 'hover:bg-white hover:text-purple-600'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={logout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition bg-red-500 hover:bg-red-600"
      >
        <FiLogOut className="text-xl" /> Logout
      </button>
    </div>
  );
}

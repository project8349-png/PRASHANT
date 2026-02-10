import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import ActivityTracker from '../components/ActivityTracker';
import Chat from '../components/Chat';
import FriendsList from '../components/FriendsList';
import NotesList from '../components/NotesList';
import Reports from '../components/Reports';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('activity');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />
      
      <div className="flex-1 overflow-auto">
        {activeTab === 'activity' && <ActivityTracker />}
        {activeTab === 'chat' && <Chat />}
        {activeTab === 'friends' && <FriendsList />}
        {activeTab === 'notes' && <NotesList />}
        {activeTab === 'reports' && <Reports />}
      </div>
    </div>
  );
}

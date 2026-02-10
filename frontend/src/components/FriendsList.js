import React, { useState, useEffect, useContext } from 'react';
import { getAllUsers, sendFriendRequest, getFriendRequests, acceptFriendRequest, getFriends } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { FiUsers, FiUserPlus, FiUserCheck } from 'react-icons/fi';

export default function FriendsList() {
  const { user } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('friends');

  useEffect(() => {
    loadFriends();
    loadRequests();
    loadAllUsers();
  }, []);

  const loadFriends = async () => {
    try {
      const response = await getFriends();
      setFriends(response.data);
    } catch (error) {
      console.error('Error loading friends:', error);
    }
  };

  const loadRequests = async () => {
    try {
      const response = await getFriendRequests();
      setRequests(response.data);
    } catch (error) {
      console.error('Error loading requests:', error);
    }
  };

  const loadAllUsers = async () => {
    try {
      const response = await getAllUsers();
      setAllUsers(response.data.filter(u => u._id !== user?.id));
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleSendRequest = async (friendId) => {
    try {
      await sendFriendRequest(friendId);
      toast.success('Friend request sent!');
      loadAllUsers();
    } catch (error) {
      toast.error('Error sending request');
    }
  };

  const handleAcceptRequest = async (friendshipId) => {
    try {
      await acceptFriendRequest(friendshipId);
      toast.success('Friend request accepted!');
      loadFriends();
      loadRequests();
    } catch (error) {
      toast.error('Error accepting request');
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 min-h-screen">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-8 flex items-center gap-3">
          <FiUsers className="text-4xl" /> Friends
        </h1>

        <div className="flex gap-4 mb-8">
          {['friends', 'requests', 'discover'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold transition capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-green-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend) => (
              <div key={friend._id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={friend.profilePic}
                    alt={friend.username}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{friend.username}</h3>
                    <p className={`text-sm ${friend.isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                      {friend.isOnline ? '🟢 Online' : '⚪ Offline'}
                    </p>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition">
                  💬 Message
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <div key={request._id} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={request.userId?.profilePic}
                    alt={request.userId?.username}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{request.userId?.username}</h3>
                    <p className="text-sm text-gray-500">{request.userId?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAcceptRequest(request._id)}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <FiUserCheck /> Accept
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Discover Tab */}
        {activeTab === 'discover' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allUsers.map((u) => (
              <div key={u._id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={u.profilePic}
                    alt={u.username}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{u.username}</h3>
                    <p className={`text-sm ${u.isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                      {u.isOnline ? '🟢 Online' : '⚪ Offline'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleSendRequest(u._id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <FiUserPlus /> Add Friend
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

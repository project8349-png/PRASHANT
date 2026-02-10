import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { FiMessageSquare, FiSend } from 'react-icons/fi';

export default function Chat() {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [activeChat, setActiveChat] = useState('group');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('users-online', (users) => {
      setOnlineUsers(users);
    });

    newSocket.on('receive-message', (data) => {
      if (activeChat === data.sender) {
        setMessages((prev) => [...prev, data]);
      }
    });

    newSocket.on('receive-group-message', (data) => {
      setGroupMessages((prev) => [...prev, data]);
      if (data.sender !== user?.id) {
        toast.info(`New message from ${data.senderName}`);
      }
    });

    if (user?.id) {
      newSocket.emit('user-online', user.id);
    }

    return () => newSocket.disconnect();
  }, [user, activeChat]);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      if (activeChat === 'group') {
        socket.emit('send-group-message', {
          senderId: user?.id,
          senderName: user?.username,
          message: currentMessage
        });
        setGroupMessages((prev) => [
          ...prev,
          {
            sender: user?.id,
            senderName: user?.username,
            message: currentMessage,
            timestamp: new Date()
          }
        ]);
      } else if (selectedUser) {
        socket.emit('send-message', {
          senderId: user?.id,
          receiverId: selectedUser._id,
          message: currentMessage
        });
        setMessages((prev) => [...prev, {
          sender: user?.id,
          message: currentMessage,
          timestamp: new Date()
        }]);
      }
      setCurrentMessage('');
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 min-h-screen">
      <ToastContainer />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
        {/* Users List */}
        <div className="md:col-span-1 bg-white rounded-2xl p-4 shadow-lg h-96 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiMessageSquare /> Online Friends
          </h2>
          
          <div
            onClick={() => setActiveChat('group')}
            className={`p-3 rounded-lg mb-2 cursor-pointer font-semibold transition ${
              activeChat === 'group'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            📢 Public Group
          </div>

          {onlineUsers.map((userId) => (
            <div
              key={userId}
              onClick={() => {
                setActiveChat('private');
                setSelectedUser({ _id: userId });
              }}
              className={`p-3 rounded-lg mb-2 cursor-pointer font-semibold transition ${
                activeChat === 'private' && selectedUser?._id === userId
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              👤 {userId}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="md:col-span-3 bg-white rounded-2xl shadow-lg p-6 flex flex-col h-96">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {activeChat === 'group' ? '📢 Public Group Chat' : '💬 Private Chat'}
          </h2>

          <div className="flex-1 overflow-y-auto border-t border-gray-200 pt-4 mb-4 space-y-3">
            {(activeChat === 'group' ? groupMessages : messages).map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === user?.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm font-semibold">{msg.senderName || 'User'}</p>
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition flex items-center gap-2"
            >
              <FiSend /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

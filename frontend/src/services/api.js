import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getToken = () => localStorage.getItem('token');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User services
export const getAllUsers = () => api.get('/users/all');
export const getOnlineUsers = () => api.get('/users/online');
export const getUserProfile = () => api.get('/users/profile');
export const updateProfile = (data) => api.put('/users/profile', data);

// Activity services
export const addActivity = (data) => api.post('/activity/add', data);
export const getTodayActivity = () => api.get('/activity/today');
export const getWeeklyReport = () => api.get('/activity/weekly');
export const getMonthlyReport = () => api.get('/activity/monthly');
export const updateActivity = (id, data) => api.put(`/activity/update/${id}`, data);

// Notes services
export const addNote = (data) => api.post('/notes/add', data);
export const getPublicNotes = () => api.get('/notes/public');
export const getMyNotes = () => api.get('/notes/my-notes');
export const updateNote = (id, data) => api.put(`/notes/update/${id}`, data);
export const deleteNote = (id) => api.delete(`/notes/delete/${id}`);

// Friends services
export const sendFriendRequest = (friendId) => api.post('/friends/request', { friendId });
export const acceptFriendRequest = (friendshipId) => api.post('/friends/accept', { friendshipId });
export const getFriendRequests = () => api.get('/friends/requests');
export const getFriends = () => api.get('/friends/list');
export const removeFriend = (friendId) => api.post('/friends/remove', { friendId });

export default api;

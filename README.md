# PRASHANT - Daily Activity Tracker

A beautiful, feature-rich web application to track daily activities, manage friendships, chat with friends, and share notes. Built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

✨ **Core Features:**
- 📝 **Daily Activity Tracking** - Record study hours, sleep hours, and study notes
- 📊 **Weekly & Monthly Reports** - Analyze your productivity trends
- 👥 **Friend System** - Send/accept friend requests and maintain a friend list
- 💬 **Real-time Chat** - Chat with friends and in public group
- 🌐 **Shared Notes** - Create and share notes with all users
- 🔐 **Secure Authentication** - JWT-based login/signup system
- 🎨 **Beautiful UI** - Colorful, responsive design with Tailwind CSS

## Project Structure

```
arad/
├── backend/                 # Node.js + Express server
│   ├── models/             # MongoDB schemas
│   ├── controllers/        # Business logic
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication middleware
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React application
│   ├── public/             # Static files
│   ├── src/
│   │   ├── pages/          # Login, Signup, Dashboard pages
│   │   ├── components/     # UI components
│   │   ├── context/        # Auth context
│   │   ├── services/       # API calls
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind configuration
└── README.md               # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/prashant
JWT_SECRET=your_secret_key_change_this
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/all` - Get all users
- `GET /api/users/online` - Get online users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update profile

### Activities
- `POST /api/activity/add` - Record activity
- `GET /api/activity/today` - Get today's activity
- `GET /api/activity/weekly` - Get weekly report
- `GET /api/activity/monthly` - Get monthly report
- `PUT /api/activity/update/:id` - Update activity

### Notes
- `POST /api/notes/add` - Create note
- `GET /api/notes/public` - Get public notes
- `GET /api/notes/my-notes` - Get user's notes
- `PUT /api/notes/update/:id` - Update note
- `DELETE /api/notes/delete/:id` - Delete note

### Friends
- `POST /api/friends/request` - Send friend request
- `POST /api/friends/accept` - Accept friend request
- `GET /api/friends/requests` - Get pending requests
- `GET /api/friends/list` - Get friend list
- `POST /api/friends/remove` - Remove friend

## Real-time Features (Socket.io)

- User online status
- Live chat messages
- Group chat announcements
- Instant notifications

## Technologies Used

### Backend
- Express.js - Web framework
- Socket.io - Real-time communication
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- Bcryptjs - Password hashing
- CORS - Cross-origin support

### Frontend
- React - UI library
- React Router - Routing
- Axios - HTTP client
- Socket.io Client - Real-time updates
- Tailwind CSS - Styling
- React Icons - Icons
- React Toastify - Notifications

## Usage

1. **Sign Up** - Create a new account
2. **Log In** - Enter your credentials
3. **Track Activity** - Record your daily study and sleep hours
4. **Find Friends** - Browse and send friend requests
5. **Accept Requests** - Accept incoming friend requests
6. **Chat** - Start chatting with friends or in the public group
7. **Share Notes** - Create and share study notes
8. **View Reports** - Check weekly and monthly analytics

## Features in Detail

### Daily Activity Tracking
- Log study hours and sleep hours
- Add detailed study notes
- Set and track weekly goals
- Mark goals as completed

### Friend System
- Search for other users
- Send/receive friend requests
- See online status of friends
- Maintain friend list

### Chat System
- Real-time messaging with friends
- Public group chat (everyone joins automatically)
- Message notifications
- See who's online

### Notes Sharing
- Create and edit notes
- Make notes public or private
- View all public notes from others
- Delete your own notes

### Reports & Analytics
- Weekly study and sleep statistics
- Monthly trends and averages
- Goal completion tracking
- Activity history

## Environment Variables

**.env (Backend)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/prashant
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## Contributors

Created with ❤️ for students and professionals

## License

ISC License

## Support

For issues and questions, please create an issue on GitHub.

---

**Happy tracking! Start your journey to productivity with PRASHANT! 🚀**

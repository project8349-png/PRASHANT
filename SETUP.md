# PRASHANT Setup Guide

## Quick Start

### Option 1: Automated Setup (Recommended)

From the root directory:

```bash
npm install-all
npm start
```

This will:
1. Install all dependencies
2. Start both backend and frontend servers

### Option 2: Manual Setup

#### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:5000`

#### Frontend Setup (in a new terminal)

```bash
cd frontend
npm install
npm start
```

The frontend will open at `http://localhost:3000`

## MongoDB Setup

### Option A: Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)

2. Start MongoDB:
   - **Windows**: MongoDB should start automatically after installation, or run `mongod` in Command Prompt
   - **Mac/Linux**: `brew services start mongodb-community` or `mongod`

3. MongoDB will run on `mongodb://localhost:27017/prashant`

### Option B: MongoDB Atlas (Cloud)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. Create a free account and cluster

3. Get your connection string

4. Update `.env` in the backend folder:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/prashant?retryWrites=true&w=majority
```

## Environment Variables

Create a `.env` file in the `backend` folder:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/prashant
JWT_SECRET=your_super_secret_key_here_change_in_production
NODE_ENV=development
```

## Port Information

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Testing the App

1. Go to http://localhost:3000
2. Sign up with a new account
3. Open another browser/incognito window and create another account
4. Send friend requests between accounts
5. Chat with each other!
6. Create activities and notes
7. View reports

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Try connecting with MongoDB Compass to verify

### Port Already in Use
- Change `PORT` in `.env` if 5000 is taken
- Change port in `frontend/.env` if 3000 is taken

### Node Modules Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear Browser Cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Development Mode

For development with auto-reload:

```bash
npm run dev
```

This will run both servers in watch mode.

## Production Build

To build for production:

```bash
cd frontend
npm run build
```

This creates an optimized build in `frontend/build`

## API Testing

Use Postman or similar tool with base URL: `http://localhost:5000/api`

Example:
```
POST http://localhost:5000/api/auth/signup
Body (JSON):
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

## Need Help?

Check the main README.md for:
- Feature details
- API endpoints
- Project structure
- Technology stack

---

**Happy Coding! 🚀**

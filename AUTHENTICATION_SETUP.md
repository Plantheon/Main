# Authentication Setup Guide

This guide explains how to set up Google Sign-In authentication for the Plantheon project.

## Prerequisites

1. A Google Cloud Console account
2. MongoDB database (local or cloud)
3. Node.js and npm installed

## Step 1: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized origins:
     - `http://localhost:5173` (for development)
     - Your production domain
   - Add authorized redirect URIs:
     - `http://localhost:5173/auth/callback` (for development)
     - `https://yourdomain.com/auth/callback` (for production)
5. Copy the Client ID and Client Secret

## Step 2: Environment Variables

1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```

2. Update the `.env` file with your actual values:
   ```
   VITE_MONGODB_URI=mongodb://localhost:27017/plantheon
   MONGODB_URI=mongodb://localhost:27017/plantheon
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   VITE_GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   PORT=3001
   NODE_ENV=development
   ```

## Step 3: MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `plantheon` (or update the URI accordingly)
3. The User model will be automatically created when the first user signs in

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Run the Application

### Development Mode (Frontend + Backend)
```bash
npm run dev:full
```

This will start both the frontend (Vite dev server) and backend (Express server) simultaneously.

### Production Mode
1. Build the frontend:
   ```bash
   npm run build
   ```

2. Start the backend server:
   ```bash
   npm run server
   ```

## How It Works

1. **Frontend**: React app with authentication context and sign-in button
2. **Backend**: Express server handling Google OAuth token exchange
3. **Authentication Flow**: 
   - User clicks "Sign in with Google"
   - Popup opens with Google's OAuth consent screen
   - After authorization, Google redirects to `/auth/callback`
   - Frontend sends authorization code to backend
   - Backend exchanges code for tokens and gets user info
   - User is created/updated in MongoDB
   - User data is returned to frontend and stored in localStorage

## Files Added/Modified

### New Files:
- `src/contexts/AuthContext.tsx` - Authentication context and state management
- `src/components/auth/SignInButton.tsx` - Sign-in/sign-out button component
- `src/pages/AuthCallback.tsx` - OAuth callback handler
- `src/utils/database.ts` - MongoDB connection utility
- `src/models/User.ts` - User data model
- `server/index.js` - Express backend server
- `env.example` - Environment variables template

### Modified Files:
- `src/App.tsx` - Added AuthProvider wrapper and auth callback route
- `src/components/layout/Header.tsx` - Added SignInButton to navigation
- `package.json` - Added authentication and server dependencies
- `src/vite-env.d.ts` - Added environment variable types

## API Endpoints

### Backend Server (Port 3001)

- `POST /api/auth/google` - Handle Google OAuth token exchange
- `GET /api/health` - Health check endpoint

## Security Notes

1. Never commit your `.env` file to version control
2. Use environment variables for all sensitive configuration
3. Implement proper CORS policies in production
4. Consider adding rate limiting for authentication endpoints
5. Use HTTPS in production
6. The backend server handles sensitive operations (token exchange)

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI" error**: Make sure your redirect URI exactly matches what's configured in Google Cloud Console
2. **MongoDB connection failed**: Check your MongoDB URI and ensure the database is running
3. **"Client ID not found"**: Verify your Google Client ID is correct and the API is enabled
4. **CORS errors**: Ensure the backend CORS configuration matches your frontend URL
5. **Server not starting**: Check if port 3001 is available or change the PORT in .env

### Development vs Production:

- For development: Use `http://localhost:5173` (frontend) and `http://localhost:3001` (backend)
- For production: Use your actual domain with HTTPS
- Update Google Cloud Console settings accordingly
- Update CORS configuration in server/index.js for production 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'https://plantheon-app.onrender.com', // Production domain
    'https://main-1-rtxy.onrender.com', // Render backend domain
    process.env.FRONTEND_URL // Dynamic frontend URL
  ].filter(Boolean), // Remove undefined values
  credentials: true
}));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/plantheon', {
  dbName: "user"
});

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  }
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/auth/google', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Exchange authorization code for tokens
    const getRedirectUri = () => {
      if (process.env.NODE_ENV === 'production') {
        return process.env.FRONTEND_URL 
          ? `${process.env.FRONTEND_URL}/auth/callback`
          : `https://plantheon-app.onrender.com/auth/callback`;
      }
      return 'http://localhost:5173/auth/callback';
    };

    const redirectUri = getRedirectUri();
    
    // Debug logging
    console.log('=== Google OAuth Debug Info ===');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
    console.log('Using redirect URI:', redirectUri);
    console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Missing');
    console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Missing');
    console.log('==============================');

    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri
    });

    const { access_token } = tokenResponse.data;

    // Get user info from Google
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const { email, name, picture } = userResponse.data;

    // Find or create user in database
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        image: picture
      });
    }

    res.json({
      user: {
        email: user.email,
        name: user.name,
        image: user.image
      }
    });

  } catch (error) {
    console.error('Google auth error:', error);
    
    // Log more detailed error information
    if (error.response) {
      console.error('Google API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    }
    
    res.status(500).json({ 
      error: 'Authentication failed',
      details: error.response?.data || error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Serve React app for any non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Deployment timestamp: ${new Date().toISOString()}`);
}); 
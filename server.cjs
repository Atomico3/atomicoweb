const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env.local' });

const app = express();

// Enable CORS for all routes with specific origins for credentials
app.use(cors({
  // Allow specific origins instead of wildcard when using credentials
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000', 
    'http://66.97.47.32',
    'https://www.atomico3.io'
  ],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
const uri = process.env.NEXT_PUBLIC_MONGODB_URI || process.env.VITE_MONGODB_URI;
let client;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

// Add a basic root route to check if server is running
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Atomico API server is running!',
    serverTime: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { 
      username, 
      password, 
      email,
      firstName,
      lastName,
      phoneNumber,
      taxID,
      walletAddress,
      identityDocument,
      country,
      postalCode,
      address,
      addressNumber,
      isUIFF,
      isExposed,
      role
    } = req.body;

    console.log('Registration request received with data:', {
      username,
      email,
      firstName,
      lastName,
      phoneNumber,
      taxID,
      walletAddress,
      identityDocument,
      country,
      postalCode,
      address,
      addressNumber,
      isUIFF,
      isExposed,
      role
    });

    // Basic validation
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const client = await connectDB();
    const db = client.db();
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.username === username 
          ? 'Username already taken' 
          : 'Email already registered' 
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Prepare user object with all fields
    const newUser = {
      username,
      email,
      password: hashedPassword,
      firstName: firstName || '',
      lastName: lastName || '',
      phoneNumber: phoneNumber || '',
      taxID: taxID || '',
      walletAddress: walletAddress || '',
      identityDocument: identityDocument || '',
      country: country || '',
      postalCode: postalCode || '',
      address: address || '',
      addressNumber: parseInt(addressNumber) || 0,
      isUIFF: !!isUIFF,
      isExposed: !!isExposed,
      role: parseInt(role) || 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert new user with all fields
    const result = await db.collection('users').insertOne(newUser);
    
    console.log('User successfully registered with ID:', result.insertedId);
    
    // Return success without exposing sensitive information
    return res.status(201).json({ 
      message: 'User registered successfully',
      userId: result.insertedId,
      user: {
        id: result.insertedId,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const client = await connectDB();
    const db = client.db();
    
    // Find user
    const user = await db.collection('users').findOne({ username });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'atomico3_secret_key',
      { expiresIn: '1d' }
    );
    
    // Return success response with user info
    return res.status(200).json({ 
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
});

// Get user info endpoint
app.get('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const client = await connectDB();
    const db = client.db();
    
    // Find user by ID
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } } // Exclude password
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json({ 
      user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Server error while fetching user data' });
  }
});

// For non-implemented API routes, proxy to the remote API
app.use('/api', createProxyMiddleware({
  target: 'https://atomico3-api.vercel.app',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    // Add necessary headers for CORS
    proxyReq.setHeader('Origin', 'https://atomico3-api.vercel.app');
  },
  onProxyRes: (proxyRes, req, res) => {
    // Add CORS headers to the proxied response - use specific origins instead of wildcard
    const clientOrigin = req.headers.origin;
    if (clientOrigin && [
      'http://localhost:5173', 
      'http://localhost:3000', 
      'http://66.97.47.32', 
      'https://www.atomico3.io'
    ].includes(clientOrigin)) {
      proxyRes.headers['Access-Control-Allow-Origin'] = clientOrigin;
    }
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  }
}));

// Start the server
const PORT = process.env.PORT || 80;
const SERVER_URL = 'http://66.97.47.32';
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════╗
║                                            ║
║   🚀 Atomico API server running on:        ║
║      ${SERVER_URL}                         ║
║                                            ║
║   📅 Server started at:                    ║
║      ${new Date().toLocaleString()}        ║
║                                            ║
║   🔌 MongoDB connection:                   ║
║      ${uri ? '✅ Configured' : '❌ Not configured'}             ║
║                                            ║
╚════════════════════════════════════════════╝
  `);
  console.log('Server is listening on all network interfaces (0.0.0.0)');
  console.log('If you cannot access the server externally, check your firewall settings');
});
import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();
// Also load .env.local if it exists
try {
  dotenv.config({ path: join(__dirname, '.env.local') });
} catch (e) {
  console.log("No .env.local file found, using .env");
}

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

// MongoDB connection - use either the specific environment variable or fall back to the general one
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
      addressNumber: parseInt(addressNumber) || 0,
      isUIFF: !!isUIFF,
      isExposed: !!isExposed,
      role: role || 1
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
    
    // Insert new user with all fields - ensure proper type conversion
    const result = await db.collection('users').insertOne({
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
    });
    
    console.log('User successfully registered with ID:', result.insertedId);
    
    return res.status(201).json({ 
      message: 'User registered successfully',
      userId: result.insertedId
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
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
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

import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  // Set correct CORS headers for API access
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const client = await clientPromise;
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
    
    // Insert new user
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
      createdAt: new Date()
    });
    
    return res.status(201).json({ 
      message: 'User registered successfully',
      userId: result.insertedId
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
}

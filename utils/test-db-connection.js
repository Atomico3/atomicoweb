import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const uri = process.env.NEXT_PUBLIC_MONGODB_URI || process.env.VITE_MONGODB_URI;

if (!uri) {
  console.error('MongoDB URI not found in environment variables');
  process.exit(1);
}

async function testConnection() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');
    
    const db = client.db();
    console.log(`Connected to database: ${db.databaseName}`);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('Available collections:');
    collections.forEach(collection => {
      console.log(` - ${collection.name}`);
    });
    
    // Check if users collection exists
    const usersCollection = collections.find(c => c.name === 'users');
    if (usersCollection) {
      const userCount = await db.collection('users').countDocuments();
      console.log(`Users collection exists with ${userCount} document(s)`);
    } else {
      console.log('Users collection does not exist yet');
    }

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

testConnection();

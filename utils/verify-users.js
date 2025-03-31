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

async function verifyUsers() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const users = await db.collection('users').find({}, {
      projection: {
        password: 0 // Exclude password from results
      }
    }).toArray();
    
    console.log('Total users found:', users.length);
    
    users.forEach((user, index) => {
      console.log(`\nUser ${index + 1}:`);
      console.log(JSON.stringify(user, null, 2));
    });
    
  } catch (error) {
    console.error('Error verifying users:', error);
  } finally {
    await client.close();
  }
}

verifyUsers();

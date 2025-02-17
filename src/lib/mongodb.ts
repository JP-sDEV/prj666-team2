import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

async function createIndexes(client: MongoClient) {
  try {
    const db = client.db('datasense-db');
    const users = db.collection('users');
    
    // Drop existing indexes
    await users.dropIndexes();
    
    // Create new unique index
    await users.createIndex(
      { email: 1 },
      { 
        unique: true,
        name: 'email_unique' // Named index for easier management
      }
    );
    console.log('Indexes recreated successfully');
  } catch (error) {
    console.error('Error managing indexes:', error);
  }
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().then(async (client) => {
      await createIndexes(client);
      return client;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise!;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then(async (client) => {
    await createIndexes(client);
    return client;
  });
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

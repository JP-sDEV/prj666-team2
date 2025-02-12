const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'datasense_db';

// Initialize the database schema
async function initDatabase() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    // Create collections
    await db.createCollection('users');
    await db.createCollection('raspberryPis');
    await db.createCollection('sensorData');
    await db.createCollection('notifications');

    console.log('Collections created successfully');

    // Define indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('raspberryPis').createIndex({ userId: 1 });
    await db.collection('sensorData').createIndex({ raspberryPiId: 1 });
    await db.collection('sensorData').createIndex({ timestamp: 1 });
    await db.collection('notifications').createIndex({ userId: 1 });
    await db.collection('notifications').createIndex({ raspberryPiId: 1 });

    console.log('Indexes created successfully');

    console.log('Database schema initialized successfully!');
  } catch (err) {
    console.error('Error initializing database schema:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Run the initialization script
initDatabase();

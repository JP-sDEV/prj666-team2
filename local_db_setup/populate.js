// require('dotenv').config();
// const mongoose = require('mongoose');
// const User = require('../src/app/models/user');
// const RaspberryPi = require('../src/app/models/raspberryPi');
// const SensorData = require('../src/app/models/sensorData');
// const Notification = require('../src/app/models/notification');

// const DATABASE_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/datasense-db';

// async function connectDB() {
//   try {
//     await mongoose.connect(DATABASE_URL, { dbName: 'datasense-db' });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Failed to connect to MongoDB:', error);
//     process.exit(1);
//   }
// }

// async function seedDatabase() {
//   try {
//     await User.deleteMany({});

//     // Create User (Email Authentication Example)
//     const emailUser = new User({
//       name: 'johndoe',
//       email: 'johndoe@example.com',
//       passwordHash: 'hashedpassword123', // For email auth, we use a password
//       authProvider: 'email', // Specifying the auth provider as 'email'
//     });
//     await emailUser.save();

//     // Create User (Google Authentication Example)
//     const googleUser = new User({
//       name: 'googleuser',
//       email: 'googleuser@example.com',
//       googleId: 'google-unique-id-123456', // This should come from Google OAuth
//       authProvider: 'google', // Specifying the auth provider as 'google'
//     });
//     await googleUser.save();

//     // Create RaspberryPi associated with the emailUser
//     const raspberryPi = new RaspberryPi({
//       userId: emailUser._id,
//       name: 'RaspberryPi 1',
//       serialId: '12345',
//     });
//     await raspberryPi.save();

//     // Create SensorData associated with the RaspberryPi
//     const sensorData = new SensorData({
//       raspberryPi: raspberryPi._id,
//       temperature: 25.5,
//       humidity: 60.2,
//       moisture: 50,
//       timestamp: new Date(),
//     });
//     await sensorData.save();

//     // Create Notification associated with the emailUser and RaspberryPi
//     const notification = new Notification({
//       userId: emailUser._id,
//       raspberryPiId: raspberryPi._id,
//       message: 'Raspberry Pi has new data.',
//       type: 'info',
//       read: false,
//     });
//     await notification.save();

//     console.log('Database seeded successfully');
//   } catch (error) {
//     console.error('Error seeding the database:', error);
//   }
// }

// async function run() {
//   await connectDB();
//   await seedDatabase();
//   mongoose.connection.close();
// }

// run();
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/app/models/user');
const RaspberryPi = require('../src/app/models/raspberryPi');
const SensorData = require('../src/app/models/sensorData');
const Notification = require('../src/app/models/notification');

const DATABASE_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/datasense-db';

async function connectDB() {
  try {
    await mongoose.connect(DATABASE_URL, { dbName: 'datasense-db' });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

async function seedDatabase() {
  try {
    await User.deleteMany({});
    await RaspberryPi.deleteMany({});
    await SensorData.deleteMany({});
    await Notification.deleteMany({});

    // Create User
    const emailUser = new User({
      name: 'johndoe',
      email: 'johndoe@example.com',
      passwordHash: 'hashedpassword123',
      authProvider: 'email',
    });
    await emailUser.save();

    // Create 3 RaspberryPis
    const raspberryPis = [];
    for (let i = 1; i <= 3; i++) {
      const raspberryPi = new RaspberryPi({
        userId: emailUser._id,
        name: `RaspberryPi ${i}`,
        serialId: `${12345 + i}`, // Incremental serial IDs
      });
      await raspberryPi.save();
      raspberryPis.push(raspberryPi);
    }

    // Generate SensorData for each RaspberryPi
    for (const raspberryPi of raspberryPis) {
      // Create 5 random SensorData entries for each RaspberryPi
      for (let i = 0; i < 5; i++) {
        const temperature = (Math.random() * 20).toFixed(2); // Temperature between 0 and 20°C
        const humidity = (Math.random() * 100).toFixed(2); // Random humidity between 0 and 100
        const moisture = (Math.random() * 100).toFixed(2); // Random moisture between 0 and 100

        const sensorEntry = new SensorData({
          raspberryPi: raspberryPi._id,
          temperature: parseFloat(temperature),
          humidity: parseFloat(humidity),
          moisture: parseFloat(moisture),
          timestamp: new Date(),
        });
        await sensorEntry.save();
      }
    }

    // Create Notifications
    for (const raspberryPi of raspberryPis) {
      const notification = new Notification({
        userId: emailUser._id,
        raspberryPiId: raspberryPi._id,
        message: `Raspberry Pi ${raspberryPi.serialId} has new data.`,
        type: 'info',
        read: false,
      });
      await notification.save();
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
}

async function run() {
  await connectDB();
  await seedDatabase();
  mongoose.connection.close();
}

run();

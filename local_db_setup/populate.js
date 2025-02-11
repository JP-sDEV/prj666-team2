const mongoose = require('mongoose');
const User = require('../src/app/models/user');
const RaspberryPi = require('../src/app/models/raspberryPi');
const SensorData = require('../src/app/models/sensorData');
const Notification = require('../src/app/models/notification');

const DATABASE_URL = 'mongodb://localhost:27017/datasense-db';

async function connectDB() {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

async function seedDatabase() {
  try {
    // Create User
    const user = new User({
      username: 'johndoe',
      email: 'johndoe@example.com',
      passwordHash: 'hashedpassword123',
    });
    await user.save();

    // Create RaspberryPi associated with the user
    const raspberryPi = new RaspberryPi({
      userId: user._id,
      name: 'RaspberryPi 1',
      serialId: '1234567890',
    });
    await raspberryPi.save();

    // Create SensorData associated with the RaspberryPi
    const sensorData = new SensorData({
      raspberryPiId: raspberryPi._id,
      temperature: 25.5,
      humidity: 60.2,
      moisture: 50,
      timestamp: new Date(),
    });
    await sensorData.save();

    // Create Notification associated with the user and RaspberryPi
    const notification = new Notification({
      userId: user._id,
      raspberryPiId: raspberryPi._id,
      message: 'Raspberry Pi has new data.',
      type: 'info',
      read: false,
    });
    await notification.save();

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

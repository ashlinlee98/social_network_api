import mongoose from 'mongoose';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/yourdb');

    const userData = [
      { username: "JohnDoe", email: "john.doe@example.com" },
      { username: "JaneSmith", email: "jane.smith@example.com" },
    ];

    const users = await User.insertMany(userData);

    const thoughtsData = [
      {
        thoughtText: "This is a test thought from John.",
        username: users[0].username,
      },
      {
        thoughtText: "Another test thought from Jane.",
        username: users[1].username,
      },
    ];

    await Thought.insertMany(thoughtsData);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();

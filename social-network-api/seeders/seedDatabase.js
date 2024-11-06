import mongoose from 'mongoose';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

const seedDatabase = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/yourdb');
  
      const thoughtsData = [
        {
          username: "JohnDoe",
          thoughtText: "This is a test thought.",
        },
        {
          username: "JaneSmith",
          thoughtText: "Another test thought.",
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
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Create hashed password
const createHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Get the sample user IDs from mentors.js
const mentors = require('./mentors');
const sampleUserIds = mentors.map(mentor => mentor.user);

// Create sample users data
const createUsersData = async () => {
  const hashedPassword = await createHashedPassword('password123');

  return [
    {
      _id: sampleUserIds[0],
      name: "John Doe",
      email: "john@example.com",
      password: hashedPassword,
      role: "mentor"
    },
    {
      _id: sampleUserIds[1],
      name: "Jane Smith",
      email: "jane@example.com",
      password: hashedPassword,
      role: "mentor"
    },
    {
      _id: sampleUserIds[2],
      name: "Dr. Alex Brown",
      email: "alex@example.com",
      password: hashedPassword,
      role: "mentor"
    },
    {
      _id: sampleUserIds[3],
      name: "Dr. Maria Rodriguez",
      email: "maria@example.com",
      password: hashedPassword,
      role: "mentor"
    },
    {
      _id: sampleUserIds[4],
      name: "Robert Chen",
      email: "robert@example.com",
      password: hashedPassword,
      role: "mentor"
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin"
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: "Regular User",
      email: "user@example.com",
      password: hashedPassword,
      role: "user"
    }
  ];
};

module.exports = { createUsersData }; 
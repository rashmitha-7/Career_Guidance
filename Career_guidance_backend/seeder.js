const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/User');
const Mentor = require('./models/Mentor');
const Category = require('./models/Category');
const Booking = require('./models/Booking');

// Load data
const categories = require('./data/categories');
const mentors = require('./data/mentors');
const { createUsersData } = require('./data/users');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import into DB
const importData = async () => {
  try {
    // Clear categories
    await Category.deleteMany();
    console.log('Categories cleared...'.yellow.inverse);

    // Create users only if they don't exist
    const users = await createUsersData();
    for (const user of users) {
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        const newUser = await User.create(user);
        
        // If this is a mentor user, create their mentor profile
        if (user.role === 'mentor') {
          const mentorData = mentors.find(m => m.user.toString() === user._id.toString());
          if (mentorData) {
            await Mentor.create({
              user: newUser._id,
              name: mentorData.name,
              title: mentorData.title,
              experience: mentorData.experience,
              education: mentorData.education,
              categories: mentorData.categories,
              expertise: mentorData.expertise,
              ratings: mentorData.ratings,
              reviewCount: mentorData.reviewCount,
              hourlyRate: mentorData.hourlyRate,
              availability: mentorData.availability,
              languages: mentorData.languages,
              image: mentorData.image,
              bio: mentorData.bio
            });
          }
        }
      }
    }
    console.log('Users and Mentor profiles checked/updated...'.green.inverse);

    // Create categories
    await Category.insertMany(categories);
    console.log('Categories imported...'.green.inverse);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Category.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} 
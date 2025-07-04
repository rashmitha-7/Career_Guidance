const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category'); // Adjust path as needed

dotenv.config({ path: __dirname + '/../.env' }); // Load env vars from the correct path

const updateCategoryCounts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');

    const categories = await Category.find();

    console.log(`Found ${categories.length} categories.`);

    for (const category of categories) {
      const subcategoryCount = category.subcategories ? category.subcategories.length : 0;
      if (category.count !== subcategoryCount) {
        await Category.updateOne(
          { _id: category._id },
          { $set: { count: subcategoryCount } }
        );
        console.log(`Updated category "${category.name}" count to ${subcategoryCount}.`);
      } else {
        console.log(`Category "${category.name}" already has correct count: ${subcategoryCount}.`);
      }
    }

    console.log('Category counts updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error updating category counts: ${error.message}`);
    process.exit(1);
  }
};

updateCategoryCounts(); 
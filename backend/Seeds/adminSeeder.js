// THIS FILE IS FOR SEEDING THE DB( ADMIN COLLECTION ) WITH INITIAL DATASET

require('dotenv').config()
const mongoose = require('mongoose');
const Admin = require('../Models/Admin');

const MONGO_URI = process.env.MONGO_URL; // Change to your DB name

// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(async () => {
//     const existingAdmin = await Admin.findOne({ username: 'anant' });
//     if (existingAdmin) {
//       console.log('Admin already exists');
//     } else {
//       const admin = new Admin({
//         username: 'anant',
//         password: '1234567890',
//       });
//       await admin.save();
//       console.log('Admin user created successfully');
//     }
//     mongoose.connection.close();
//   })
//   .catch(err => console.error('MongoDB connection error:', err));

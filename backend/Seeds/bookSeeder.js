// THIS FILE IS FOR SEEDING THE DB( BooknReview COLLECTION ) WITH INITIAL DATASET

// require('dotenv').config();
// const mongoose = require('mongoose');
// const BooknReview = require('../Models/BooknReview');
// const { faker } = require('@faker-js/faker');

// const MONGO_URI = process.env.MONGO_URL; // Your MongoDB URI from .env

// // Connect to MongoDB (no deprecated options)
// mongoose.connect(MONGO_URI)
//   .then(async () => {
//     await BooknReview.deleteMany(); // Clear existing data if needed

//     const books = [];

//     for (let i = 0; i < 30; i++) {
//       books.push(new BooknReview({
//         title: faker.lorem.words(3),
//         author: faker.person.fullName(), // ✅ Updated from deprecated `faker.name.findName()`
//         genre: faker.helpers.arrayElement(['Fiction', 'Non-Fiction', 'Fantasy', 'Mystery', 'Sci-Fi', 'Biography']),
//         summary: faker.lorem.paragraph(),
//         coverImage: faker.image.urlPicsumPhotos({ width: 300, height: 400 }), // ✅ Modern faker image method
//         publicationYear: faker.date.past({ years: 50 }).getFullYear(), // Updated for faker v8+
//         isbn: faker.string.uuid(), // ✅ Replaces `faker.datatype.uuid()`
//         addedBy: faker.internet.userName(),
//         likes: faker.number.int({ min: 0, max: 200 }), // ✅ Replaces `faker.datatype.number`
//         comments: [
//           {
//             text: faker.lorem.sentence(),
//             author: faker.person.firstName(),
//             createdAt: faker.date.recent(),
//           },
//           {
//             text: faker.lorem.sentence(),
//             author: faker.person.firstName(),
//             createdAt: faker.date.recent(),
//           }
//         ]
//       }));
//     }

//     await BooknReview.insertMany(books);
//     console.log('✅ 30 sample books seeded successfully!');
//     mongoose.connection.close();
//   })
//   .catch(err => {
//     console.error('❌ MongoDB connection failed:', err);
//   });
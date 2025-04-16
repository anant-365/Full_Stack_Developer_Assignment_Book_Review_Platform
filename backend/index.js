require('dotenv').config()
const express = require('express');
const Admin = require('./Models/Admin');
const BooknReview = require('./Models/BooknReview');
const Userbookapp = require('./Models/Userbookapp');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const dbConnect = function(){
    mongoose.connect(process.env.MONGO_URL)
    mongoose.connection.on("error",console.error.bind(console,'connection error'));
    mongoose.connection.once("open",()=>{
    console.log("database connected")
  })
  }

  dbConnect();


  const app = express();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


  // MIDDLEWARES 
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json       
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_SERVER, credentials: true }));
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use('/api/', apiLimiter);

// Helper function to generate JWT tokens
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Tokens expire in 1 hour
  });
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.userIdYelp || req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user
    req.tokenExpiry = decoded.exp ? decoded.exp : null; 
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.', tokenExpiry: req.tokenExpiry });
  }
};

app.get('/api/protected', authenticateToken, (req, res) => {
  // Access req.user and req.tokenExpiry if needed
  res.json({ message: 'Access granted to protected data.', user: req.user, tokenExpiry: req.tokenExpiry });
});


app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const userExists = await Userbookapp.findOne({ username });
    if (userExists) return res.json({ success: false, message: 'User already exists' });
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Userbookapp({
      username,
      password: hashedPassword,
      userId: uuidv4(),
    });
  
    await newUser.save();
    const token = generateToken(username);
    res.json({ success: true, jwtToken: token });
  });
  
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await Userbookapp.findOne({ username });
  
    if (!user) return res.json({ success: false, message: 'User not found' });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: 'Invalid credentials' });
    const token = generateToken(username);
    res.json({ success: true, jwtToken: token });
  });

  app.get('/books', authenticateToken, async (req, res) => {
    try {
      const books = await BooknReview.find({});
      res.json([...books]);
    } catch (error) {
      console.error('Error fetching campgrounds:', error);
    }
  });

  app.get('/api/users/:userId', authenticateToken, async (req, res) => {
    try {
      const userId  = req.user; // Get userId from the URL parameters
      const user = await Userbookapp.findOne({ username: userId });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
  });

  app.get('/api/users', authenticateToken, async (req, res) => {
    try {
      const users = await Userbookapp.find(); // Fetch all users from the database
      res.json(users);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });

  app.get('/api/allusers/:userId', authenticateToken, async (req, res) => {
    try {
      const userId = req.params.userId
      const user = await Userbookapp.findOne({username: userId}); // Fetch user by ID
      console.log(user)
      res.json(user);
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error');
    }
  });  


  app.post('/books', authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
          return res.status(401).json({ message: 'Unauthorized: No user found' });
        }
    
        const admin = await Admin.findOne({ username: req.user });
        if (!admin) {
          return res.status(403).json({ message: 'Forbidden: Not an admin' });
        }
    
        const { title, author, genre, summary, coverImage, publicationYear, isbn } = req.body;
    
        const newBook = new BooknReview({
          title,
          author,
          genre,
          summary,
          coverImage,
          publicationYear,
          isbn,
        });
    
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
  }); 

  app.put('/api/posts/:isbn/likenreview', authenticateToken, async (req, res) => {
    try {
      const book = await BooknReview.findOne({ isbn: req.params.isbn });
      if (!book) return res.status(404).send('Book not found');
  
      const username = req.user;
      const incomingComments = req.body.comments || [];
      const latestComment = incomingComments[0];
  
      if (latestComment && latestComment.text) {
        book.comments.unshift({
          text: latestComment.text,
          author: username || 'Anonymous',
          createdAt: latestComment.createdAt || new Date(),
        });
      }
  
      book.likes = req.body.likeCount;
  
      await book.save();
      res.send(book);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });  
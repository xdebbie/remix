import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import songsRouter from './songs';

dotenv.config();

// Create an instance of the Express application and define the port
const app = express();
const port = process.env.port || 3000;

// Fetch the connection string 
const mongoUri = process.env.MONGO_URI || '';

// Connect to MongoDB Atlas
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Root route handler
app.get('/', (req, res) => {
  res.send('Please go to /api/songs to access the API data');
});

// Routes
app.use('/api/songs', songsRouter);
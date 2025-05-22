import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Express } from 'express';
import AuthRouter from  './routes/AuthRouter';
import UserProfileRouter from './routes/UserProfileRoutes';

dotenv.config();

const app : Express = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth' , AuthRouter);
app.use('/api/user' , UserProfileRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL as string)
  .then(() => {
    app.listen(process.env.PORT || 5002, () => {
      console.log(`✅ Server is running on port ${process.env.PORT || 3002}`);
    });
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.log('❌ Error connecting to MongoDB:', err);
  });

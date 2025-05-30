import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Express } from 'express';
import AuthRouter from  './routes/AuthRouter';
import UserProfileRouter from './routes/UserProfileRoutes';
import TransactionRouter from './routes/TransactionRouter';

dotenv.config();

const app : Express = express();

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use(cors());
app.use(express.json());

app.use('/api/auth' , AuthRouter);
app.use('/api/user' , UserProfileRouter);
app.use('/api/transactions' , TransactionRouter);

// Connect to MongoDB
const port = process.env.PORT || 5002;

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.log('❌ Error connecting to MongoDB:', err);
  });

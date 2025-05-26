import express from 'express';
const router = express.Router();
import{ getTransactionHistory, postTransaction} from '../controllers/TransactionController';
import { authMiddleware } from '../middlewares/authMiddlewar';

router.post('/post' ,authMiddleware, postTransaction);

router.get('/history' , authMiddleware , getTransactionHistory)
export default router;
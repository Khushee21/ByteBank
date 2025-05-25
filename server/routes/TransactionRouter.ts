import express from 'express';
const router = express.Router();
import{ postTransaction} from '../controllers/TransactionController';
import { authMiddleware } from '../middlewares/authMiddlewar';

router.post('/post' ,authMiddleware, postTransaction);

export default router;
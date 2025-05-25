import { Request, Response, NextFunction } from 'express';
import Transaction from "../models/Transation";;
import User from '../models/User'; // optional if you use user info


export const getUserProfile = async (
  req: Request,  // or CustomRequest if you're using custom typing for req.user
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authUser = (req as any).user; // ✅ safer if you're not using a custom type

    if (!authUser) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user= await User.findById(authUser.id).select('-password');
    if(!user){
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const transactions = await Transaction.find({ user: user._id }).sort({ date: -1 });

    res.json({
      user: {
        email: user.email,
        walletAddress: user.walletAddress.toLowerCase(),
        balance: user.balance,
        currencies: user.currencies,
      },
      transactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

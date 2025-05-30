import { NextFunction, Response } from 'express';
import { TransactionBody, users } from '../types/User';
import { AuthRequest } from '../middlewares/authMiddlewar';
import User from '../models/User';
import Transation from '../models/Transation';
import QRCode from 'qrcode';

export const postTransaction = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const { type, currency, amount, recipient }: TransactionBody = req.body;

    const currentUserWallet = req.user?.wallet;
   // console.log("current user wallet", currentUserWallet);
    if (!currentUserWallet ) {
      res.status(401).json({ error: 'Unauthorized or user not found' });
      return;
    }

    if (!req.user) {
     res.status(401).json({ error: 'Unauthorized: user not found' });
        return;
    }


    if (!currency || !amount || amount <= 0) {
      res.status(400).json({ error: 'Invalid amount or currency.' });
      return;
    }
    const user = await User.findById(req.user.id).select("-password");
   // console.log("res.user", req.user);
    //console.log("user", user);
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }
    

    if (type === 'send') {
      if (!recipient) {
        res.status(400).json({ error: 'Recipient not found.' });
        return;
      }

      const receiver = await User.findOne({ walletAddress: recipient });
      if (!receiver) {
         res.status(400).json({ error: 'Recipient not found.' });
        return;
      }

      if ((user.currencies as any)[currency] < amount) {
         res.status(400).json({ error: 'Insufficient balance.' });
         return;
      }
      (user.currencies as any)[currency] -= amount;
      (receiver.currencies as any)[currency] += amount;

      await user.save();
      await receiver.save();

      await Transation.create({
         user: user._id,
        type: 'send',
        currency,
        amount,
        to: recipient,
        date: new Date(),
      });

       res.json({ message: `Sent ${amount} ${currency} to ${recipient}` });
       return;
    }

    if (type === 'receive') {
      (user.currencies as any)[currency] += amount;

      const qrData = `${currency.toLowerCase()}:${user.walletAddress}`;
      const qrImage = await QRCode.toDataURL(qrData); 
      await Transation.create({
        user: user._id,
        type: 'receive',
        currency,
        amount,
        from: 'simulation',
        to: user.walletAddress,
        date: new Date(),
      });

       res.json({ message: `Received ${amount} ${currency}` });
       return;
    }

     res.status(400).json({ error: 'Invalid transaction type.' });
     return;
  } catch (error) {
    //console.error('Transaction Error:', error);
    next(error);
  }
};


export const getTransactionHistory = async (req : AuthRequest, res:Response ) : Promise<void> => {
  try{
    const userId = req.user?.id;
    //console.log("userId", userId);
    if(!userId) {
      res.status(401).json({ error : 'Unauthorized: user not found' });
      return;
    }
    const transactions = await Transation.find({ user: userId}).sort({ date: -1});
    res.json(transactions);
  }
  catch(error){
   // console.error('Error fetching transaction history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
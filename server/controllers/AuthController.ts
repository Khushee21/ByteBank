import { RequestHandler } from 'express';
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateWalletAddress = (): string => {
  return "0x" + Math.random().toString(16).slice(2);
};

export const register: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      walletAddress: generateWalletAddress(),
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
   // console.error("Error in register controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN CONTROLLER
export const login: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        walletAddress: user.walletAddress,
      },
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Error in login" });
  }
};

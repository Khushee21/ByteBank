"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import '@/app/globals.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Label from '@/components/ui/label';

interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    walletAddress: string;
  };
}

export default function AuthPages() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const endpoint = isLogin ? 'api/auth/login' : 'api/auth/register';
      const res = await api.post<AuthResponse>(endpoint, { email, password });
        console.log("Registering with:", { email, password });
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        toast.success('Logged in successfully!');
        router.push('/dashboard');
      } else {
        toast.success('User created successfully! Please login.');
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      console.error('Error during login/register:', err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[400px] shadow-xl border-blue-200 border">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center text-blue-800">
              {isLogin ? 'Login' : 'Sign Up'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
              </div>

              {!isLogin && (
                <div className="relative">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    required
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute top-[38px] right-3 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>

                  {confirmPassword.length > 0 &&
                    password !== confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        Passwords don&apos;t match
                      </p>
                    )}
                </div>
              )}

              <Button type="submit" className="w-full">
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </form>

            <p className="text-sm text-center text-gray-700">
              {isLogin
                ? "Don't have an account?"
                : 'Already have an account?'}{' '}
              <button
                className="text-blue-600 font-semibold hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

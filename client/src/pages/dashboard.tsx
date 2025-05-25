import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wallet, Send, DownloadCloud } from 'lucide-react';
import '@/app/globals.css';
import {useRouter}  from 'next/navigation';
import Header from '@/components/Header';

const Dashboard = () => {
  const router = useRouter();
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-blue-100 text-black p-8 mt-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-10 text-center text-black mt-12"
      >
        Welcome to Your Wallet
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <motion.div
          className="bg-gradient-to-r from-blue-400 via-blue-50 to-blue-300 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Wallet className="w-12 h-12 mb-4 text-purple-700" />
          <h2 className="text-xl font-semibold mb-2">My Wallet</h2>
          <p>View your wallet address, balance and currencies.</p>
          <Button variant="secondary" className="mt-4 w-full"
          onClick={() => router.push('/profile')}>Go to Wallet</Button>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-blue-50 via-blue-400 to-blue-100 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Send className="w-12 h-12 mb-4 text-green-900" />
          <h2 className="text-xl font-semibold mb-2">Send Crypto</h2>
          <p>Quickly transfer crypto to other wallet addresses.</p>
          <Button variant="secondary" className="mt-4 w-full" onClick={()=>router.push('/send-receive')}>Send Now</Button>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-blue-400 via-blue-50 to-blue-300 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DownloadCloud className="w-12 h-12 mb-4 text-blue-900" />
          <h2 className="text-xl font-semibold mb-2">Receive Crypto</h2>
          <p>Get your wallet address and receive transactions securely.</p>
          <Button variant="secondary" className="mt-4 w-full">Receive</Button>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
};

export default Dashboard;

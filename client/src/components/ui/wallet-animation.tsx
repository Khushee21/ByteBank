'use client';

import { motion } from 'framer-motion';
import { Icons } from './icons';

export const WalletAnimation = () => {
  return (
    <div className="relative to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-blue-100 via-blue-300 to-blue-50  border rounded-3xl p-6 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:40px_40px] opacity-10" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Icons.wallet className="h-6 w-6 text-primary" />
              <span className="font-medium">Web3 Wallet</span>
            </div>
            <div className="text-sm text-muted-foreground">Connected</div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-200 via-blue-50 to-blue-400 p-4 rounded-xl mb-6 ">
            <div className="text-sm text-muted-foreground mb-1">Total Balance</div>
            <div className="text-3xl font-bold">$4,892.42</div>
            <div className="text-sm text-green-500 mt-1 flex items-center">
              +2.4% <Icons.trendingUp className="ml-1 h-4 w-4" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            <motion.button 
              whileHover={{ y: -2 }}
              className="bg-muted/50 hover:bg-muted transition-colors p-3 rounded-lg flex flex-col items-center"
            >
              <Icons.send className="h-5 w-5 mb-1" />
              <span className="text-xs">Send</span>
            </motion.button>
            <motion.button 
              whileHover={{ y: -2 }}
              className="bg-muted/50 hover:bg-muted transition-colors p-3 rounded-lg flex flex-col items-center"
            >
              <Icons.receive className="h-5 w-5 mb-1" />
              <span className="text-xs">Receive</span>
            </motion.button>
            <motion.button 
              whileHover={{ y: -2 }}
              className="bg-muted/50 hover:bg-muted transition-colors p-3 rounded-lg flex flex-col items-center"
            >
              <Icons.swap className="h-5 w-5 mb-1" />
              <span className="text-xs">Swap</span>
            </motion.button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Icons.bitcoin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Bitcoin</div>
                  <div className="text-xs text-muted-foreground">0.042 BTC</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">$2,842.50</div>
                <div className="text-xs text-green-500">+1.2%</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-600/10 p-2 rounded-full">
                  <Icons.ethereum className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Ethereum</div>
                  <div className="text-xs text-muted-foreground">1.42 ETH</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">$1,923.72</div>
                <div className="text-xs text-green-500">+3.8%</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated transaction notification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center"
        >
          <Icons.notification className="h-4 w-4 mr-2" />
          <span className="text-sm">Received 0.005 BTC</span>
        </motion.div>
      </motion.div>
      
      {/* Floating crypto icons */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-8 -left-8"
      >
        <Icons.bitcoin className="h-16 w-16 text-primary/20" />
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute -bottom-8 -right-8"
      >
        <Icons.ethereum className="h-16 w-16 text-purple-600/20" />
      </motion.div>
    </div>
  );
};
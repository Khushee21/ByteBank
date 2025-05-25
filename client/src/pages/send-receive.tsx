import React, { useState } from 'react';
import axios from 'axios';
import  '@/app/globals.css';
import api from '@/utils/api';
import Header from '@/components/Header';

type TransactionResponse = {
  message: string;
};

export default function SendReceivePage() {
  const [type, setType] = useState<'send' | 'receive'>('send');
  const [currency, setCurrency] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    console.log("Token:", localStorage.getItem('token'));
  try {
    const payload: any = {
      type,
      currency,
      amount: parseFloat(amount),
    };

    if (type === 'send') {
      payload.recipient = recipient;
    }

    const res = await api.post<TransactionResponse>(
      'api/transactions/post',
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      }
    );
    
    setMessage(res.data.message);
    setAmount('');
    setRecipient('');
  } catch (error: any) {
    console.log("Error:", error);
    setMessage(error.response?.data?.error || 'Something went wrong');
  }
  console.log("Sending to backend:", recipient);

};


  return (
    <>
    <Header/>
    <div className="min-h-screen bg-blue-100 p-8 mt-14 ">
      <div className="max-w-xl mx-auto bg-gradient-to-r from-blue-400 via-blue-50 to-blue-300 p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Send / Receive Crypto</h1>

        <div className="flex justify-center mb-4 space-x-4">
          <button
            className={`px-4 py-2 rounded-xl ${type === 'send' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setType('send')}
          >
            Send
          </button>
          <button
            className={`px-4 py-2 rounded-xl ${type === 'receive' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setType('receive')}
          >
            Receive
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Currency</label>
            <select
              className="w-full border rounded-xl px-3 py-2 bg-blue-50"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option>BTC</option>
              <option>ETC</option>
              <option>USDT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              className="w-full border rounded-xl px-3 py-2 bg-blue-50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {type === 'send' && (
            <div>
              <label className="block text-sm font-medium">Recipient Wallet Address</label>
              <input
                type="text"
                className="w-full border rounded-xl px-3 py-2 bg-blue-50"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!amount || (type=='send' && !recipient)}
            className={`w-full py-2 rounded-xl ${(!amount || (type === 'send' && !recipient)) ? 'bg-gray-400 cursor-not-allowed font-bold' : 'bg-black hover:bg-gray-800 text-white '}`}
          >
            {type === 'send' ? 'Send Funds' : 'Simulate Receive'}
          </button>

          {message && <div className="text-center text-sm text-green-600 mt-2">{message}</div>}
        </div>
      </div>
    </div>
    </>
  );
} 

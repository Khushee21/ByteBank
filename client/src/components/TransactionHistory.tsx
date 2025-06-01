import api from "@/utils/api";
import { useEffect, useState } from "react";
import Header from "./Header";

type Transaction = {
  _id: string;
  type: 'send' | 'receive';
  currency: string;
  amount: number;
  to?: string;
  from?: string;
  date: string;
};


const TransactionHistory =() => {
    const [transactions , setTransactions] = useState<Transaction[]>([]);
    const [loading , setLoading]= useState(true);
    const [error , setError] = useState('');

 
    useEffect(()=> {
        const fetchTransactions = async () => {
            try{
                const res = await api.get<Transaction[]>('api/transactions/history',{
                    headers:{
                        Authentication : `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setTransactions(res.data);
                setLoading(false);
            }
            catch(error: any){
                console.log("Error fetching histoy" , error);
                setError('Failed to fetch transaction history');
                setLoading(false);
            }
        };
        fetchTransactions();
    },[]);
    return(
       <>
      <Header />
      <div className="min-h-screen bg-blue-100 p-8 mt-14">
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Transaction History</h1>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : transactions.length === 0 ? (
            <p className="text-center text-gray-500">No transactions found.</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-blue-100">
                <tr>
                  <th scope="col" className="px-4 py-2">Type</th>
                  <th scope="col" className="px-4 py-2">Currency</th>
                  <th scope="col" className="px-4 py-2">Amount</th>
                  <th scope="col" className="px-4 py-2">From</th>
                  <th scope="col" className="px-4 py-2">To</th>
                  <th scope="col" className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id} className="border-b">
                    <td className="px-4 py-2 capitalize font-semibold">{tx.type}</td>
                    <td className="px-4 py-2">{tx.currency}</td>
                    <td className="px-4 py-2">{tx.amount}</td>
                    <td className="px-4 py-2">{tx.from || '-'}</td>
                    <td className="px-4 py-2">{tx.to || '-'}</td>
                    <td className="px-4 py-2">{new Date(tx.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
    )
}

export default TransactionHistory;
import api from "@/utils/api";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Transaction } from "@/types/transaction";
import "@/app/globals.css";
import { QRCodeCanvas } from "qrcode.react"; 

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get<Transaction[]>("api/transactions/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Fetched transactions:", res.data);
        setTransactions(res.data);
        setLoading(false);
      } catch (error: any) {
        console.log("Error fetching history", error);
        setError("Failed to fetch transaction history");
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-blue-100 p-8 mt-14">
        <div className="max-w-6xl mx-auto bg-white rounded-xl p-6 shadow-md overflow-auto">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Transaction History
          </h1>
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
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Currency</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">From</th>
                  <th className="px-4 py-2">To</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">QR Code</th> 
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id} className="border-b">
                    <td className="px-4 py-2 capitalize font-semibold">{tx.type}</td>
                    <td className="px-4 py-2">{tx.currency}</td>
                    <td className="px-4 py-2">{tx.amount}</td>
                    <td className="px-4 py-2">{tx.from || "-"}</td>
                    <td className="px-4 py-2">{tx.to || "-"}</td>
                    <td className="px-4 py-2">{new Date(tx.date).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <QRCodeCanvas
                        value={JSON.stringify({
                          type: tx.type,
                          currency: tx.currency,
                          amount: tx.amount,
                          from: tx.from,
                          to: tx.to,
                          date: tx.date,
                        })}
                        size={64}
                        level="H"
                        includeMargin={true}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;

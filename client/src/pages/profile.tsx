import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/api";
import { toast } from "sonner";
import { User, Transaction } from "@/types";
import ProfileCompletionDialog from "@/components/ProfileCompletion";
import { motion, AnimatePresence } from "framer-motion";
import "@/app/globals.css";
import Header from "@/components/Header";


export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Login required");
        router.push("/auth");
        return;
      }

      const res = await api.get<{ user: User; transactions: Transaction[] }>(
        "api/user/getProfile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data.user ?? null);
     console.log("Email from backend:", res.data.user?.email);
      setTransactions(res.data.transactions ?? []);
    } catch (err: any) {
      console.error("Dashboard error:", err);
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (
      user &&
      (!user.walletAddress ||
        user.balance === undefined ||
        !user.currencies ||
        Object.keys(user.currencies).length === 0)
    ) {
      setIsDialogOpen(true);
    }
  }, [user]);

  const handleSaveProfile = async (data: {
    walletAddress: string;
    balance: string;
    currencies: string;
  }) => {
    const currencyMap = data.currencies
      .split(",")
      .reduce((acc, curr) => {
        const key = curr.trim();
        acc[key] =parseFloat(data.balance);
        return acc;
      }, {} as Record<string, number>);

    setUser((prev) =>{
      if(!prev) return null;
      return {
        ...prev,
        walletAddress: data.walletAddress,
        balance: parseFloat(data.balance),
        currencies: currencyMap,
      };
    });
    setIsDialogOpen(false);
    toast.success("Profile updated successfully!");
  };

  if (!user)
    return <p className="text-center mt-20">Loading dashboard...</p>;

  return (
    <>
    <Header/>
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileCompletionDialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onSave={handleSaveProfile}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-blue-50 p-6"
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60 }}
          className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-md"
        >
          <motion.h1
            className="text-2xl font-bold mb-4 pt-14"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to Your Wallet
          </motion.h1>

          <div className="mb-6">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Wallet Address:</strong> {user.walletAddress}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Balances</h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(user.currencies ?? {}).map(([currency, amount], index) => (
                <motion.div
                  key={currency}
                  className="bg-blue-100 rounded p-4 text-center"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-bold">{currency}</h3>
                  <p>{amount.toFixed(2)}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
            {transactions.length === 0 ? (
              <p>No transactions yet.</p>
            ) : (
              <motion.table
                className="w-full border mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">To</th>
                    <th className="p-2 text-left">Amount</th>
                    <th className="p-2 text-left">Currency</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map((txn, index) => (
                    <motion.tr
                      key={txn._id}
                      className="border-t"
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="p-2">{txn.to}</td>
                      <td className="p-2">{txn.amount}</td>
                      <td className="p-2">{txn.currency}</td>
                      <td
                        className={`p-2 capitalize ${
                          txn.status === "success"
                            ? "text-green-600"
                            : txn.status === "failed"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {txn.status}
                      </td>
                      <td className="p-2">
                        {new Date(txn.date).toLocaleString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

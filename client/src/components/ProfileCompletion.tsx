import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import "@/app/globals.css";

interface ProfileCompletionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { walletAddress: string; balance: string; currencies: string }) => void;
}

export default function ProfileCompletionDialog({
  isOpen,
  onClose,
  onSave,
}: ProfileCompletionDialogProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [currencies, setCurrencies] = useState("");

  // Static list of currency codes and their names
  const currencyOptions: [string, string][] = [
    ["BTC", "Bitcoin"],
    ["ETH", "Ethereum"],
    ["USDT", "Tether"],
    ["USD", "US Dollar"],
    ["EUR", "Euro"],
  ];

  const handleSubmit = () => {
    if (!walletAddress || !balance || !currencies) {
      alert("Please fill all fields.");
      return;
    }
    onSave({ walletAddress, balance, currencies });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Complete Your Profile</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Provide your wallet and balance information to continue.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="wallet" className="text-sm font-medium">
              Wallet Address
            </label>
            <input
              id="wallet"
              type="text"
              placeholder="0xABC..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="balance" className="text-sm font-medium">
              Balance
            </label>
            <input
              id="balance"
              type="number"
              placeholder="1000"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="currencies" className="text-sm font-medium">
              Currency
            </label>
            <select
              id="currencies"
              value={currencies}
              onChange={(e) => setCurrencies(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a currency</option>
              {currencyOptions.map(([code, name]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

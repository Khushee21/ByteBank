// src/components/ui/currency-ticker.tsx
import React from "react";

interface CurrencyTickerProps {
  symbol: string;
  name: string;
  change: number;
}

export const CurrencyTicker: React.FC<CurrencyTickerProps> = ({
  symbol,
  name,
  change,
}) => {
  // Optionally, add styling based on change (green for positive, red for negative)
  const changeColor = change >= 0 ? "text-green-600" : "text-red-600";
  const changeSign = change >= 0 ? "+" : "";

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded  bg-gradient-to-r from-blue-50 via-blue-300 to-blue-50">
      <span className="font-bold">{symbol}</span>
      <span>{name}</span>
      <span className={`${changeColor} font-semibold`}>
        {changeSign}
        {change}%
      </span>
    </div>
  );
};

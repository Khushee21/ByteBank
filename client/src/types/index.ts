export interface User{
    _id: string;   //mongo db i
    email: string;  //user email
    walletAddress: string;  //fake /generated wallet address
    balance: number;  //total balance
    currencies: Record<string, number>; 
} 

export interface Transaction{
    _id: string;
    from: string;
    to: string;
    amount: number;
    currency: string;
    date: string;
    status: "success" | "pending" | "failed";
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    walletAddress: string;
  };
}

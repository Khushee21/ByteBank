export interface User{
    _id: string;   //mongo db i
    email: string;  //user email
    walletAddress: string;  //fake /generated wallet address
    balance: number;  //total balance
    currencies: {
        BTC: number;
        ETH: number;
        USDT: number;
    };
} 

export interface Translarion{
    _id: string;
    from: string;
    to: string;
    amount: number;
    currency: string;
    date: string;
    status: 'sucess' | 'pending' | 'failec';
}
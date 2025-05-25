export interface TransactionBody {
    type: 'send' | 'receive';
    currency: 'BTC' | 'ETH' | 'USDT';
    amount: number;
    recipient?: string;
}

export const users: Record<string , any> = {
    '0xbae8238ce9149' : {
        BTS:10,
        ETC:5,
        USDT:100,
        transactions : []
    },
};
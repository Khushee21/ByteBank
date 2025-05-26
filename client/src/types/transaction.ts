export type Transaction = {
  _id: string;
  type: 'send' | 'receive';
  currency: string;
  amount: number;
  to?: string;
  from?: string;
  date: string;
};

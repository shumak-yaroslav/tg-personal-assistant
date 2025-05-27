export interface Entry {
  id: string;
  amount: number;
  category: string;
  type: EntryType;
}

export type EntryType = 'income' | 'expense';

export interface FinanceTrackerProps {
  userId?: number;
}

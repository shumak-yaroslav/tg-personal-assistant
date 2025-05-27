import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig.ts';
import type { Entry, EntryType } from '../finance-tracker.types.ts';
import type { SelectChangeEvent } from '@mui/material';

interface UseFinancesReturnValues {
  entries: Array<Entry>;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTypeChange: (event: SelectChangeEvent) => void;
  handleRemoveEntry: (id: string) => Promise<void>;
  handleAddEntry: () => Promise<void>;
  amount: string;
  category: string;
  type: EntryType;
  balance: number;
}

interface UseFinancesProps {
  userId?: number;
}

export const useFinances = ({ userId }: UseFinancesProps): UseFinancesReturnValues => {
  const [entries, setEntries] = useState<Array<Entry>>([]);
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [type, setType] = useState<EntryType>('expense');

  const handleAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  }, []);

  const handleCategoryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  }, []);

  const handleTypeChange = useCallback((event: SelectChangeEvent) => {
    setType(event.target.value as EntryType);
  }, []);

  const fetchEntries = useCallback(async () => {
    const snapshot = await getDocs(collection(db, `users/${userId}/finance`));
    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Entry[];
    setEntries(result);
  }, [userId]);

  const handleAddEntry = useCallback(async () => {
    if (!amount || !category) return;

    await addDoc(collection(db, `users/${userId}/finance`), {
      amount: parseFloat(amount),
      category,
      type,
    });

    setAmount('');
    setCategory('');
    fetchEntries();
  }, [amount, category, type, userId, fetchEntries]);

  const handleRemoveEntry = useCallback(
    async (id: string) => {
      await deleteDoc(doc(db, `users/${userId}/finance/${id}`));
      fetchEntries();
    },
    [userId, fetchEntries]
  );

  const balance = useMemo<number>(() => {
    return entries.reduce((acc, entry) => {
      return entry.type === 'income' ? acc + entry.amount : acc - entry.amount;
    }, 0);
  }, [entries]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return {
    amount,
    balance,
    category,
    entries,
    handleAddEntry,
    handleAmountChange,
    handleCategoryChange,
    handleRemoveEntry,
    handleTypeChange,
    type,
  };
};

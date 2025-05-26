import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import {
  Button,
  List,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  type SelectChangeEvent,
} from '@mui/material';
import { FinanceListItem } from './components/finance-list-item.tsx';
import type { Entry, EntryType, FinanceTrackerProps } from './finance-tracker.types.ts';

export const FinanceTracker: React.FC<FinanceTrackerProps> = memo(({ uuid }) => {
  const [entries, setEntries] = useState<Array<Entry>>([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
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
    const snapshot = await getDocs(collection(db, `users/${uuid}/finance`));
    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Entry[];
    setEntries(result);
  }, [uuid]);

  const handleAddEntry = useCallback(async () => {
    if (!amount || !category) return;

    await addDoc(collection(db, `users/${uuid}/finance`), {
      amount: parseFloat(amount),
      category,
      type,
    });

    setAmount('');
    setCategory('');
    fetchEntries();
  }, [amount, category, type, uuid, fetchEntries]);

  const handleRemoveEntry = useCallback(
    async (id: string) => {
      await deleteDoc(doc(db, `users/${uuid}/finance/${id}`));
      fetchEntries();
    },
    [uuid, fetchEntries]
  );

  const balance = useMemo(() => {
    return entries.reduce((acc, entry) => {
      return entry.type === 'income' ? acc + entry.amount : acc - entry.amount;
    }, 0);
  }, [entries]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Finance
      </Typography>
      <Typography variant="body1" mb={2}>
        Balance: {balance.toFixed(2)} ₽
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          size="small"
        />
        <TextField
          label="Category"
          type="text"
          value={category}
          onChange={handleCategoryChange}
          size="small"
        />
        <FormControl size="small">
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={handleTypeChange} label="Type">
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAddEntry} sx={{ minWidth: 120 }}>
          Add
        </Button>
      </Stack>
      <List>
        {entries.map((entry) => (
          <FinanceListItem
            key={entry.id}
            financeEntry={entry}
            handleRemoveEntry={handleRemoveEntry}
          />
        ))}
      </List>
    </Paper>
  );
});

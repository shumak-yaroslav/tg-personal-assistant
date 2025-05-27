import React, { memo } from 'react';
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
} from '@mui/material';
import { FinanceListItem } from './components/finance-list-item.tsx';
import type { FinanceTrackerProps } from './finance-tracker.types.ts';
import { useFinances } from './hooks/use-finances.hook.ts';
import { EXTERNAL_HEADER_HEIGHT } from '../../shared/consts';

export const FinanceTracker: React.FC<FinanceTrackerProps> = memo(({ userId }) => {
  const {
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
  } = useFinances({ userId });

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Finance
      </Typography>
      <Typography variant="body1" mb={2}>
        Balance: {balance.toFixed(2)} BYN
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
      <List sx={{ maxHeight: `calc(100vh - ${EXTERNAL_HEADER_HEIGHT}px)`, overflow: 'auto' }}>
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

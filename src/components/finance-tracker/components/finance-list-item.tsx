import React, { memo, useCallback, useMemo } from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Entry } from '../finance-tracker.types.ts';

export interface ListItemProps {
  handleRemoveEntry: (id: string) => Promise<void>;
  financeEntry: Entry;
}

export const FinanceListItem: React.FC<ListItemProps> = memo(
  ({ handleRemoveEntry, financeEntry }) => {
    const { id, amount, category, type } = financeEntry || {};
    const typeLabel = useMemo(() => (type === 'income' ? 'Income' : 'Expense'), [type]);

    const handleDelete = useCallback(() => {
      handleRemoveEntry(id);
    }, [handleRemoveEntry, id]);

    return (
      <ListItem
        secondaryAction={
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary={`${amount} BYN • ${category}`} secondary={typeLabel} />
      </ListItem>
    );
  }
);

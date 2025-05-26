import React, { useCallback } from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Task } from '../task-list.types.ts';

interface TaskListItemProps {
  handleRemoveTask: (id: string) => Promise<void>;
  task: Task;
}

export const TaskListItem: React.FC<TaskListItemProps> = React.memo(
  ({ handleRemoveTask, task }) => {
    const { id, text } = task || {};

    const handleDelete = useCallback(() => {
      handleRemoveTask(id);
    }, [handleRemoveTask, id]);

    return (
      <ListItem
        secondaryAction={
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary={text} />
      </ListItem>
    );
  }
);

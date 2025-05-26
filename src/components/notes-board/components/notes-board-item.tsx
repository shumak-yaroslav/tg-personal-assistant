import React, { useCallback } from 'react';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Note } from '../notes-board.types.ts';

interface NotesBoardItemProps {
  note: Note;
  handleRemoveNote: (id: string) => Promise<void>;
}

export const NotesBoardItem: React.FC<NotesBoardItemProps> = React.memo(
  ({ handleRemoveNote, note }) => {
    const { id, content, created } = note || {};
    const handleDelete = useCallback(() => {
      handleRemoveNote(id);
    }, [handleRemoveNote, id]);

    return (
      <ListItem
        secondaryAction={
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary={content} secondary={new Date(created).toLocaleString()} />
      </ListItem>
    );
  }
);

import React from 'react';
import { Button, Typography, TextField, List, Paper, Stack } from '@mui/material';
import type { NotesBoardProps } from './notes-board.types';
import { NotesBoardItem } from './components/notes-board-item.tsx';
import { useNotes } from './hooks/use-notes.hook.ts';
import { EXTERNAL_HEADER_HEIGHT } from '../../shared/consts';

export const NotesBoard: React.FC<NotesBoardProps> = React.memo(({ userId }) => {
  const { notes, handleAddNote, handleInputChange, handleRemoveNote, note } = useNotes({ userId });

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Notes
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
        <TextField
          fullWidth
          label="New note"
          value={note}
          onChange={handleInputChange}
          size="small"
        />
        <Button variant="contained" onClick={handleAddNote} sx={{ minWidth: 120 }}>
          Save
        </Button>
      </Stack>
      <List sx={{ maxHeight: `calc(100vh - ${EXTERNAL_HEADER_HEIGHT}px)`, overflow: 'auto' }}>
        {notes.map((note) => (
          <NotesBoardItem key={note.id} handleRemoveNote={handleRemoveNote} note={note} />
        ))}
      </List>
    </Paper>
  );
});

import React, { useEffect, useState, useCallback } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Button, Typography, TextField, List, Paper, Stack } from '@mui/material';
import type { Note, NotesBoardProps } from './notes-board.types';
import { NotesBoardItem } from './components/notes-board-item.tsx';

export const NotesBoard: React.FC<NotesBoardProps> = React.memo(({ uuid }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState('');

  const fetchNotes = useCallback(async () => {
    const snapshot = await getDocs(collection(db, `users/${uuid}/notes`));
    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      content: doc.data().content,
      created: doc.data().created,
    })) as Note[];
    setNotes(result);
  }, [uuid]);

  const handleAddNote = useCallback(async () => {
    if (!note.trim()) return;
    await addDoc(collection(db, `users/${uuid}/notes`), {
      content: note,
      created: new Date().toISOString(),
    });
    setNote('');
    fetchNotes();
  }, [note, uuid, fetchNotes]);

  const handleRemoveNote = useCallback(
    async (id: string) => {
      await deleteDoc(doc(db, `users/${uuid}/notes/${id}`));
      fetchNotes();
    },
    [uuid, fetchNotes]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

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
      <List>
        {notes.map((note) => (
          <NotesBoardItem key={note.id} handleRemoveNote={handleRemoveNote} note={note} />
        ))}
      </List>
    </Paper>
  );
});

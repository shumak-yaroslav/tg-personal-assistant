import React, { useState, useEffect, useCallback } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig.ts';
import type { Note } from '../notes-board.types.ts';

interface UseNotesReturnValues {
  notes: Array<Note>;
  handleAddNote: () => Promise<void>;
  handleRemoveNote: (id: string) => Promise<void>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  note: string;
}

interface UseNotesProps {
  userId?: number;
}

export const useNotes = ({ userId }: UseNotesProps): UseNotesReturnValues => {
  const [notes, setNotes] = useState<Array<Note>>([]);
  const [note, setNote] = useState('');

  const fetchNotes = useCallback(async () => {
    const snapshot = await getDocs(collection(db, `users/${userId}/notes`));
    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      content: doc.data().content,
      created: doc.data().created,
    })) as Note[];
    setNotes(result);
  }, [userId]);

  const handleAddNote = useCallback(async () => {
    if (!note.trim()) return;
    await addDoc(collection(db, `users/${userId}/notes`), {
      content: note,
      created: new Date().toISOString(),
    });
    setNote('');
    fetchNotes();
  }, [note, userId, fetchNotes]);

  const handleRemoveNote = useCallback(
    async (id: string) => {
      await deleteDoc(doc(db, `users/${userId}/notes/${id}`));
      fetchNotes();
    },
    [userId, fetchNotes]
  );

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, handleAddNote, handleInputChange, handleRemoveNote, note };
}

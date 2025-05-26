import React, { useEffect, useState, useCallback } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Button, List, TextField, Typography, Paper, Stack } from '@mui/material';
import type { Task, TaskListProps } from './task-list.types.ts';
import { TaskListItem } from './components/task-list-item.tsx';

export const TaskList: React.FC<TaskListProps> = React.memo(({ uuid }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const fetchTasks = useCallback(async () => {
    const snapshot = await getDocs(collection(db, `users/${uuid}/tasks`));

    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      text: doc.data().text,
    })) as Task[];

    setTasks(result);
  }, [uuid]);

  const handleAddTask = useCallback(async () => {
    if (!input.trim()) {
      return;
    }

    await addDoc(collection(db, `users/${uuid}/tasks`), { text: input });

    setInput('');
    fetchTasks();
  }, [input, uuid, fetchTasks]);

  const handleRemoveTask = useCallback(
    async (id: string) => {
      await deleteDoc(doc(db, `users/${uuid}/tasks/${id}`));
      fetchTasks();
    },
    [uuid, fetchTasks]
  );

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Tasks
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
        <TextField
          fullWidth
          label="New task"
          value={input}
          type="text"
          onChange={handleInputChange}
          size="small"
        />
        <Button variant="contained" onClick={handleAddTask} sx={{ minWidth: 120 }}>
          Add
        </Button>
      </Stack>
      <List>
        {tasks.map((task) => (
          <TaskListItem key={task.id} handleRemoveTask={handleRemoveTask} task={task} />
        ))}
      </List>
    </Paper>
  );
});

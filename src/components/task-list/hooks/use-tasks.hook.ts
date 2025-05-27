import React, { useState, useEffect, useCallback } from 'react';
import type { Task } from '../task-list.types.ts';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig.ts';

interface UseTasksReturnValues {
  tasks: Array<Task>;
  handleAddTask: () => Promise<void>;
  handleRemoveTask: (id: string) => Promise<void>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  task: string;
}

interface UseTasksProps {
  userId?: number;
}

export const useTasks = ({ userId }: UseTasksProps): UseTasksReturnValues => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [task, setTask] = useState('');

  const fetchTasks = useCallback(async () => {
    const snapshot = await getDocs(collection(db, `users/${userId}/tasks`));

    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      text: doc.data().text,
    })) as Task[];

    setTasks(result);
  }, [userId]);

  const handleAddTask = useCallback(async () => {
    if (!task.trim()) {
      return;
    }

    await addDoc(collection(db, `users/${userId}/tasks`), { text: task });

    setTask('');
    fetchTasks();
  }, [task, userId, fetchTasks]);

  const handleRemoveTask = useCallback(
    async (id: string) => {
      await deleteDoc(doc(db, `users/${userId}/tasks/${id}`));
      fetchTasks();
    },
    [userId, fetchTasks]
  );

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, handleAddTask, handleInputChange, handleRemoveTask, task };
}

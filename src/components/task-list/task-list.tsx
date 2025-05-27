import React from 'react';
import { Button, List, TextField, Typography, Paper, Stack } from '@mui/material';
import type { TaskListProps } from './task-list.types.ts';
import { TaskListItem } from './components/task-list-item.tsx';
import { useTasks } from './hooks/use-tasks.hook.ts';
import { EXTERNAL_HEADER_HEIGHT } from '../../shared/consts';

export const TaskList: React.FC<TaskListProps> = React.memo(({ userId }) => {
  const { tasks, handleRemoveTask, handleInputChange, handleAddTask, task } = useTasks({ userId });

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Tasks
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
        <TextField
          fullWidth
          label="New task"
          value={task}
          type="text"
          onChange={handleInputChange}
          size="small"
        />
        <Button variant="contained" onClick={handleAddTask} sx={{ minWidth: 120 }}>
          Add
        </Button>
      </Stack>
      <List sx={{ maxHeight: `calc(100vh - ${EXTERNAL_HEADER_HEIGHT}px)`, overflow: 'auto' }}>
        {tasks.map((task) => (
          <TaskListItem key={task.id} handleRemoveTask={handleRemoveTask} task={task} />
        ))}
      </List>
    </Paper>
  );
});

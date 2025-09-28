import type { Task } from '../task-list.types';

export interface UseTasksReturnValues {
  tasks: Array<Task>;
  handleAddTask: () => Promise<void>;
  handleRemoveTask: (id: string) => Promise<void>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  task: string;
}

export interface UseTasksProps {
  userId?: number;
}

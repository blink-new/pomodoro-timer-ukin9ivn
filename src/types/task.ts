export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  timeSpent: number; // in seconds
  isTimerRunning: boolean;
  createdAt: number;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}
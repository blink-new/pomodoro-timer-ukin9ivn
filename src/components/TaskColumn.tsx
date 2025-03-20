import { Task } from '../types/task';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

export function TaskColumn({ title, tasks }: TaskColumnProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 min-w-[300px]">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
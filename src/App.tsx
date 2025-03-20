import { useTaskStore } from './store/taskStore';
import { TaskColumn } from './components/TaskColumn';
import { AddTaskForm } from './components/AddTaskForm';

export default function App() {
  const tasks = useTaskStore((state) => state.tasks);

  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Task Board</h1>
        
        <AddTaskForm />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn title="Todo" tasks={todoTasks} />
          <TaskColumn title="In Progress" tasks={inProgressTasks} />
          <TaskColumn title="Done" tasks={doneTasks} />
        </div>
      </div>
    </div>
  );
}
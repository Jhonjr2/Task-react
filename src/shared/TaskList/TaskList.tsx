import React from 'react';
import { TaskItem } from '..';
import './taskListStyle.css';

interface Task {
  id: number;
  text: string;
  category: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  removeTask: (id: number) => void;
  toggleComplete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, removeTask, toggleComplete }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} removeTask={removeTask} toggleComplete={toggleComplete} />
      ))}
    </div>
  );
};

export default TaskList;
import React from 'react';
import './taskItemStyle.css';

interface Task {
  id: number;
  text: string;
  category: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  removeTask: (id: number) => void;
  toggleComplete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, removeTask, toggleComplete }) => {
  const categoryColors: Record<string, string> = {
    Personal: 'green',
    Trabajo: 'blue',
    Urgente: 'red'
  };

  return (
    <div className="task-item" style={{ borderLeft: `4px solid ${categoryColors[task.category]}` }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      <span className={task.completed ? 'completed' : ''}>{task.text}</span>
      <button onClick={() => removeTask(task.id)}>Eliminar</button>
    </div>
  );
};

export default TaskItem;
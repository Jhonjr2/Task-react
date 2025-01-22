import { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  category: string;
  completed: boolean;
}

const useTaskStorage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    console.log(localStorage.getItem('tasks') )
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if(tasks.length !== 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return { tasks, addTask, removeTask, toggleComplete };
};

export default useTaskStorage;
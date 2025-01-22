import React, { useState } from 'react';
import './App.css';
import { TaskInput, TaskList, useTaskStorage } from './shared';

const App: React.FC = () => {
  const { tasks, addTask, removeTask, toggleComplete } = useTaskStorage();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para controlar el modo oscuro

  // Función que se llama cuando se hace clic en "Crear Tarea"
  const handleCreateTaskClick = () => {
    setIsModalOpen(true); // Abrir el modal
  };

  // Función para alternar el tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Sidebar siempre visible */}
      <div className="sidebar">
        <div className="menu-item" onClick={handleCreateTaskClick}>
          <button className="create-task-button">
            <span className="icon">+</span>
            <span className="text">Crear Tarea</span>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <h1 className="app-title">Lista de Tareas</h1>

      {/* Botón para alternar entre el modo claro y oscuro */}
      <button className="theme-toggle-button" onClick={toggleTheme}>
        {isDarkMode ? (
          <span role="img" aria-label="Sol" className="theme-icon">🌞<span className='textModeLigth'> Modo Claro</span></span> // Ícono de sol para el modo claro
        ) : (
          <span role="img" aria-label="Luna" className="theme-icon">🌑 <span className='textModeDark'>Modo Oscuro</span></span> // Ícono de luna para el modo oscuro
        )}
      </button>

      {/* Modal para crear tarea */}
      <TaskInput addTask={addTask} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <TaskList tasks={tasks} removeTask={removeTask} toggleComplete={toggleComplete} />
    </div>
  );
};

export default App;

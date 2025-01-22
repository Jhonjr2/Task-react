import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import './taskInputStyle.css';

interface Task {
  id: number;
  text: string;
  category: string;
  completed: boolean;
}

interface TaskInputProps {
  addTask: (task: Task) => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const TaskInput: React.FC<TaskInputProps> = ({ addTask, isModalOpen, setIsModalOpen }) => {
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('Personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask({
        id: Date.now(),
        text: taskText,
        category,
        completed: false,
      });
      setTaskText('');
      setIsModalOpen(false); 
    }
  };

  return (
    <>
      {/* Botón flotante para abrir el modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="floating-btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-105"
      >
        <FaPlus className="icon text-xl" />
      </button>

      {/* Modal para crear tarea */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-content bg-white p-8 rounded-xl shadow-xl max-w-md mx-auto">
          <h2 className="modal-title text-2xl font-semibold text-center text-gray-800 mb-6">Nueva Tarea</h2>
          <form onSubmit={handleSubmit} className="task-form space-y-6">
            <div>
              <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="¿Qué necesitas hacer?"
                className="input-field w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select-field w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Personal">Personal</option>
                <option value="Trabajo">Trabajo</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>
            <div className="action-buttons flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="cancel-btn py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="submit-btn py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white transition"
              >
                Crear Tarea
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default TaskInput;

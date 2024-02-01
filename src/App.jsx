import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Al cambiar las tareas, actualiza el localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleDeleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="AppContainer">
      <div className="App">
        <h1>Lista de Tareas</h1>
        <div>
          <input
            type="text"
            placeholder="Nueva tarea"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddTask}>Agregar</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => handleDeleteTask(index)} className="deleteButton">
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default App;
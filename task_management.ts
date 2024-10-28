import React, { useState } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [editingInput, setEditingInput] = useState('');

    const handleAddTask = () => {
        if (taskInput) {
            setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
            setTaskInput('');
        }
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setEditingInput(task.text);
    };

    const handleUpdateTask = () => {
        setTasks(tasks.map(task =>
            task.id === editingTask.id ? { ...task, text: editingInput } : task
        ));
        setEditingTask(null);
        setEditingInput('');
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="App">
            <h1>Task Manager</h1>
            <input 
                type="text" 
                value={taskInput} 
                onChange={(e) => setTaskInput(e.target.value)} 
                placeholder="Add a new task" 
            />
            <button onClick={handleAddTask}>Add Task</button>

            {editingTask && (
                <div>
                    <input 
                        type="text" 
                        value={editingInput} 
                        onChange={(e) => setEditingInput(e.target.value)} 
                    />
                    <button onClick={handleUpdateTask}>Update Task</button>
                </div>
            )}

            <ul>
                {tasks.map(task => (
                    <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
                        <button onClick={() => handleEditTask(task)}>Edit</button>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

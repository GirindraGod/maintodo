import React, { useState } from 'react';
import './NewTask.css';

function NewTask({ addNewTask }) {
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskName && taskDate) {
      addNewTask(taskName, taskDate, taskTime);
      setTaskName('');
      setTaskDate('');
      setTaskTime('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='new-task-form'>
      <h2 className='form-heading'>New Task</h2>
      <input className="ninfo0"
        type="text" 
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)} 
        placeholder="Task Name" 
        required
      />
      <input className="ninfo1"
        type="date" 
        value={taskDate} 
        onChange={(e) => setTaskDate(e.target.value)} 
        placeholder="Date" 
        required
      />
      <input className="ninfo2"
        type="time" 
        value={taskTime} 
        onChange={(e) => setTaskTime(e.target.value)} 
        placeholder="Time" 
      />
      <button type="submit" className='nsubmit-button'>Add Task</button>
    </form>
  );
}

export default NewTask;

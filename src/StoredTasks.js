import React from 'react';
import './StoredTasks.css';

function StoredTasks({ todos, toggleComplete, removeTodo }) {
  return (
    <div className="stored-tasks">
      <h2 className="stored-heading">Stored Tasks</h2>
      {todos.length === 0 ? (
        <p className="no-stored-tasks">No tasks have been added.</p>
      ) : (
        <ul className="stored-list">
          {todos.map((todo, index) => (
            <li key={index} className="stored-item">
              <span className="task-text">{todo.text}</span>
              <span className="task-date">Due: {todo.date}</span>
              {todo.time && <span className="task-time">Time: {todo.time}</span>}
              <div className="task-buttons">
                <button className="complete-btn" onClick={() => toggleComplete(index)}>Complete</button>
                <button className="delete-btn" onClick={() => removeTodo(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StoredTasks;

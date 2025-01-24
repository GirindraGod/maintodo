import React, { useState, useEffect, useRef } from 'react';
import './CompletedTasks.css';

function CompletedTasks({ completedTodos, restoreTask, deleteTask }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <div className="completed-tasks-container">
      <button className="open-popup-btn" onClick={openPopup}>Show Completed Tasks</button>

      {isPopupOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()} ref={popupRef}>
            <button className="close-popup-btn" onClick={closePopup}>
              <svg className='button5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
              </svg>
            </button>
            <h2 className="completed-heading">Completed Tasks</h2>
            {completedTodos.length === 0 ? (
              <p className="no-completed-tasks">No tasks have been completed.</p>
            ) : (
              <ul className="completed-list">
                {completedTodos.map((todo, index) => (
                  <li key={index} className="completed-item">
                    {todo.text}
                    <div className='buttonadjust'>
                      <button onClick={() => restoreTask(index)} className="restore-btn">Restore</button>
                      <button onClick={() => deleteTask(index)} className="delete-btn">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CompletedTasks;

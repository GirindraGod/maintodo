import React, { useState, useEffect, useRef } from 'react';
import './Mainpage0.css';
import Todo0 from './Todo0';
import TodoList from './TodoList';
import CompletedTasks from './CompletedTasks';
import NewTask from './NewTask';
import StoredTasks from './StoredTasks';


function Mainpage0() {
  const [isOpen1, setIsOpen1] = useState(false);
  const popupRef1 = useRef(null);

  const openModal1 = () => {
    setIsOpen1(true);
  };

  const closeModal1 = () => {
    setIsOpen1(false);
  };

  const handleClickOutside1 = (event) => {
    if (popupRef1.current && !popupRef1.current.contains(event.target)) {
      closeModal1();
    }
  };

  useEffect(() => {
    if (isOpen1) {
      document.addEventListener('mousedown', handleClickOutside1);
    } else {
      document.removeEventListener('mousedown', handleClickOutside1);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside1);
    };
  }, [isOpen1]);

  const [isOpen0, setIsOpen0] = useState(false);
  const popupRef0 = useRef(null);

  const openModal0 = () => {
    setIsOpen0(true);
  };

  const closeModal0 = () => {
    setIsOpen0(false);
  };

  const handleClickOutside0 = (event) => {
    if (popupRef0.current && !popupRef0.current.contains(event.target)) {
      closeModal0();
    }
  };

  useEffect(() => {
    if (isOpen0) {
      document.addEventListener('mousedown', handleClickOutside0);
    } else {
      document.removeEventListener('mousedown', handleClickOutside0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside0);
    };
  }, [isOpen0]);

  const [quickTasks, setQuickTasks] = useState(() => {
    const savedQuickTasks = localStorage.getItem('quickTasks');
    return savedQuickTasks ? JSON.parse(savedQuickTasks) : [];
  });

  const [newTasks, setNewTasks] = useState(() => {
    const savedNewTasks = localStorage.getItem('newTasks');
    return savedNewTasks ? JSON.parse(savedNewTasks) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('quickTasks', JSON.stringify(quickTasks));
  }, [quickTasks]);

  useEffect(() => {
    localStorage.setItem('newTasks', JSON.stringify(newTasks));
  }, [newTasks]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const addQuickTask = (input) => {
    if (input) {
      setQuickTasks([...quickTasks, { text: input, completed: false }]);
    }
  };

  const addNewTask = (taskName, taskDate, taskTime) => {
    const newTask = { text: taskName, date: taskDate, time: taskTime, completed: false };
    setNewTasks([...newTasks, newTask]);
  };

  const toggleCompleteTask = (index, isQuickTask) => {
    if (isQuickTask) {
      if (index < 0 || index >= quickTasks.length) return; // Prevent out-of-bounds access
      const updatedQuickTasks = [...quickTasks];
      updatedQuickTasks[index].completed = !updatedQuickTasks[index].completed;
      setQuickTasks(updatedQuickTasks);
      if (updatedQuickTasks[index].completed) {
        setTimeout(() => moveToCompletedQuickTask(index), 500);
      }
    } else {
      if (index < 0 || index >= newTasks.length) return; // Prevent out-of-bounds access
      const updatedNewTasks = [...newTasks];
      updatedNewTasks[index].completed = !updatedNewTasks[index].completed;
      setNewTasks(updatedNewTasks);
      if (updatedNewTasks[index].completed) {
        setTimeout(() => moveToCompletedNewTask(index), 500);
      }
    }
  };


  const moveToCompletedQuickTask = (index) => {
    const completedTask = quickTasks[index];
    setQuickTasks(quickTasks.filter((_, i) => i !== index));
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const moveToCompletedNewTask = (index) => {
    const completedTask = newTasks[index];
    setNewTasks(newTasks.filter((_, i) => i !== index));
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const restoreTask = (index) => {
    const restoredTask = completedTasks[index];
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    setNewTasks([...newTasks, restoredTask]);
  };

  const deleteTask = (index) => {
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
  };

  const removeQuickTask = (index) => {
    setQuickTasks(quickTasks.filter((_, i) => i !== index));
  };



  const removeTask = (index, isQuickTask) => {
     if (isQuickTask) {
       setQuickTasks(quickTasks.filter((_, i) => i !== index)); 
      } else {
         setNewTasks(newTasks.filter((_, i) => i !== index)); 
      }
    };

  // Combine quickTasks and newTasks into one list
  const allTasks = [
    ...quickTasks.map((task, index) => ({ ...task, isQuickTask: true, originalIndex: index })),
    ...newTasks.map((task, index) => ({ ...task, isQuickTask: false, originalIndex: index })),
  ];
  



  return (
    <div>
      <div className="newtask">
      <h2 className='mainheading0'>Tasks</h2>
      <div className='list0'>
         
      <TodoList todos={allTasks} toggleComplete={(index, isQuickTask) => toggleCompleteTask(index, isQuickTask)} removeTodo={removeTask} />
      
      </div>
      

      <div className='completedfiles0'> <CompletedTasks completedTodos={completedTasks} restoreTask={restoreTask} deleteTask={deleteTask} /></div>
      <h2 className="mainheading1">Quick Task</h2>
      <h2 className="mainheading2">New Task</h2>
      <button id='openpage0' className='openpage0' onClick={openModal1}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
        </svg>
      </button>
      {isOpen1 && (
        <div id='popup0' className='popup0' ref={popupRef1}>
          <div className='info1'>
            <NewTask addNewTask={addNewTask} />
            <button id='popupclose0' className='popupclose0' onClick={closeModal1}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      </div>
      <div>
      <div  className="quick task">
      <button id='openpage1' className='openpage1' onClick={openModal0}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
        </svg>
      </button>
      {isOpen0 && (
        <div id='popup1' className='popup1' ref={popupRef0}>
          <div className='info1'>
             <Todo0 addQuickTask={addQuickTask} />
            <button id='popupclose1' className='popupclose1' onClick={closeModal0}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      </div>
      
    
    </div>
      
    
    </div>
    
  );
}

export default Mainpage0;

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const valRef = useRef([]);
  const indexRef = useRef(null);
  const [inputVal, setVal] = useState('');
  const [todoArr, setTodoArr] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  function updateVal(e) {
    let currentVal = e.target.value;
    setVal(currentVal);
  }

  const saveText = () => {
    setTodoArr([...todoArr, inputVal]);
    setVal("");
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoArr));
  }, [todoArr]);

  function editTxt(index) 
  {
    let allTodos = document.querySelectorAll('.display-space')
    for(let element of allTodos)
    {
      if(element.value===todoArr[index])
      {
        element.focus()
        console.log('its matched')
      }
    }
  }

  function handleSpanClick(event) {
    const index = event.currentTarget.getAttribute('unique-id');
    const currentUpVal = event.target.value;
    const newTodoArr = [...todoArr];
    newTodoArr[index] = currentUpVal;
    setTodoArr(newTodoArr);
    localStorage.setItem('todos', JSON.stringify(newTodoArr));
  }

  function deleteTodo (index) 
  {
    const newTodoArr = [...todoArr];
    newTodoArr.splice(index, 1);
    setTodoArr(newTodoArr);
    localStorage.setItem('todos', JSON.stringify(newTodoArr));
  }

  return (
    <center>
      <div id="container">
        <h2>Enter a To Do</h2>
        <input type="text" value={inputVal} onChange={updateVal} /><br /><br />
        <button id='save-btn' onClick={saveText}>Save</button>
        <div ref={indexRef}>
          {todoArr.map((todo, index) => (
            <div  key={index} id="output">
              <input
                ref={todo => valRef.current.push(todo)}
                className='display-space'
                value={todo}
                unique-id={index}
                onChange={handleSpanClick}
              />
              <span className="material-symbols-outlined" onClick={() => deleteTodo(index)}>delete</span>
              <span onClick={() => editTxt(index)} className="material-symbols-outlined">edit</span>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </center>
  );
}

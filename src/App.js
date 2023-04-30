import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const myRef = useRef(null);

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

  const deleteTodo = (e) => {
    let str = e.target.parentElement.innerText;

    let orgStr = str.slice(0, -11);

    for (let i = 0; i < todoArr.length; i++) {
      if (todoArr[i].trim() === orgStr.trim()) {
        let newTodoArr = [...todoArr];
        newTodoArr.splice(i, 1);
        setTodoArr(newTodoArr);
        localStorage.setItem('todos', JSON.stringify(newTodoArr));
        return;
      }
    }
  }

  function editTxt() {
    myRef.current.focus()
  }

  function handleSpanClick(event) 
  {
    const index = event.currentTarget.getAttribute('unique-id');
    const currentUpVal = event.target.innerHTML;
    const newTodoArr = [...todoArr];
    newTodoArr[index] = currentUpVal;
    setTodoArr(newTodoArr);
    localStorage.setItem('todos', JSON.stringify(newTodoArr));
  }

  return (
    <center>
      <div id="container">
        <h2>Todo Container</h2>
        <input type="text" value={inputVal} onChange={updateVal} /><br /><br />
        <button id='save-btn' onClick={saveText}>Save</button>
        <div>
          {todoArr.map((todo, index) => (
            <div  key={index} id="output">
              <span
              unique-id={index}
                ref={myRef}
                contentEditable
                dangerouslySetInnerHTML={{ __html: todo }}
                onInput={handleSpanClick}
              ></span>
              <span className="material-symbols-outlined" onClick={deleteTodo}>delete</span>
              <span onClick={editTxt} className="material-symbols-outlined">edit</span>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </center>
  );
}

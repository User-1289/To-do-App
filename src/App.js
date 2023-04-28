import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() 
{
  const [inputVal, setVal] = useState('');
  const [todoArr, setTodoArr] = useState(() => 
  {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  function updateVal(e)
  {
    let currentVal = e.target.value;
    setVal(currentVal);
  }

  const saveText = () => 
  {
    setTodoArr([...todoArr, inputVal]);
    setVal("")
  };

  useEffect(() => 
  {
    localStorage.setItem('todos', JSON.stringify(todoArr));
  }, [todoArr]);

const deleteTodo = (e) => {
  let str = e.target.parentElement.innerText;
  let orgStr = str.slice(0, -6);

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

  return (
    <center>
      <div id="container">
        <h2>Todo Container</h2>
        <input type="text" value={inputVal} onChange={updateVal} /><br/><br />
        <button id='save-btn' onClick={saveText}>Save</button>
        <div >
            {todoArr.map((todo, index) => 
            (
              <div key={index} id="output" >
                <span >{todo}</span>
                <button id="delete-btn" onClick={deleteTodo}>Delete</button>
				<hr/>
              </div>
            ))}
        </div>
      </div>
    </center>
  );
}

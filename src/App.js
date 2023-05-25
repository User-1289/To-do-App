import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// ...

export default function App() {
  const valRef = useRef([]);
  const indexRef = useRef(null);
  const [inputVal, setVal] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

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
    setVal('');
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoArr));
  }, [todoArr]);

  function editTxt(index) {
    let allTodos = document.querySelectorAll('.display-space');
    for (let element of allTodos) {
      if (element.value === todoArr[index]) {
        element.focus();
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

  function deleteTodo(index) {
    const newTodoArr = [...todoArr];
    newTodoArr.splice(index, 1);
    setTodoArr(newTodoArr);
    localStorage.setItem('todos', JSON.stringify(newTodoArr));
  }

  function handleDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = Array.from(todoArr);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodoArr(items);
    localStorage.setItem('todos', JSON.stringify(items));
  }

  return (
    <center>
      <div id="container">
        <h2>Enter a To Do</h2>
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              saveText();
            }
          }}
          className="enter-txt"
          type="text"
          value={inputVal}
          onChange={updateVal}
        /><br /><br />
        <button id="save-btn" onClick={saveText}>Save</button>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todoList">
            {(provided) => (
              <div style={{backgroundColor:"skyblue"}} ref={provided.innerRef} {...provided.droppableProps}>
                {todoArr.map((todo, index) => (
                  <Draggable key={index} draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="draggable-item"
                      >
                        <input
                          type="text"
                          className="display-space"
                          value={todo}
                          unique-id={index}
                          onChange={handleSpanClick}
                        />
                        <span className="material-symbols-outlined" onClick={() => deleteTodo(index)}>delete</span>
                        <span onClick={() => editTxt(index)} className="material-symbols-outlined">edit</span>
                        <hr className='hr-cl' />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </center>
  );
}


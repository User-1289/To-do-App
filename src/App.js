import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Login from './Login';
import firebase from 'firebase/app';

import { initializeApp} from "firebase/app";
import { getFirestore, doc, setDoc, addDoc,collection, arrayUnion,where,getDocs, query, updateDoc,arrayRemove } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';



// ...

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyACZG1v02NJ4upuFTCNk0u21OU9V4A8EJk",
    authDomain: "todo-13753.firebaseapp.com",
    projectId: "todo-13753",
    storageBucket: "todo-13753.appspot.com",
    messagingSenderId: "353536102896",
    appId: "1:353536102896:web:e93212889223cf5c790d35"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const valRef = useRef([]);
  const indexRef = useRef(null);
  const [inputVal, setVal] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [user,setUser] = useState('')
  const [todoArr,setTodoArr] = useState([])
  const [dbRef, setDbRef] = useState({})
  //let dbRef ;
  useEffect(()=>
  {
    if(localStorage.getItem("UniqueKey")!=null)
    {
      setDbRef(doc(db, "todos", localStorage.getItem("UniqueKey")))
      //dbRef = doc(db, "todos", localStorage.getItem("UniqueKey"));
      console.log(dbRef)
    }
  }, [])
  //const [todoArr, setTodoArr] = useState(() => {
  //  const savedTodos = localStorage.getItem('todos');
  //  return savedTodos ? JSON.parse(savedTodos) : [];
  //});
 // useEffect(() =>
 // {
 //   if(!localStorage.getItem("key"))
 //   {
 //     alert('Sign in to use')
 //     return
 //   }
 // }, [])
let docRef = {};
let key = '';

 useEffect(()=>
 {
  if(localStorage.getItem("UniqueKey"))
  {
    //console.log('damn it')
    key = localStorage.getItem("UniqueKey")
 // docRef = doc(db, "todos", localStorage.getItem("UniqueKey"));
  }

 }, [])

  async function getData()
  {
    let data;
    const q = query(collection(db, 'todos'), where('UniqueId', '==', key));
    const querySnapshot = await getDocs(q);
    for (const doc of querySnapshot.docs) {
       data = doc.data().TodoArr;
    }
    setTodoArr(data)
  }
  useEffect(()=>
  {
    if(localStorage.getItem("UniqueKey")!=null)
    {
      getData()
    }
  }, [])
  //useEffect(()=>
  //{
  //  let userData = JSON.parse(localStorage.getItem("authState"))
  //  console.log(userData.email)
  //}, [])
  //useEffect(() =>
  //{
  //  async function addTodos()
  //  {
  //    for(let i = 0; i < todoArr.length; i++)
  //    {
  //      await updateDoc(docRef,{
  //        TodoArr:arrayUnion(todoArr[i])
  //      })
  //    }
  //  }
  // // addTodos()
  //}, [])
  function updateVal(e) {
    let currentVal = e.target.value;
    setVal(currentVal);
  }
  const auth = getAuth();

  useEffect(()=>
  {
    async function checkUser()
    {
     // let key = localStorage.getItem("UniqueKey")
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          console.log('User is signed in:', user);
          // Perform actions for signed-in user
          // ...
        } else {
          // User is signed out
          console.log('User is signed out');
          // Perform actions for signed-out user
          // ...
        }
      });

    /*if(localStorage.getItem("UniqueKey")!=null)
    {
      console.log('it sthere')
      const q = query(collection(db, 'todos'), where('UniqueId', '==', key));
      const querySnapshot = await getDocs(q);
      for (const doc of querySnapshot.docs) {
        const data = doc.data().TodoArr;
        console.log(data)
      }

    }*/
    }
    //checkUser()
  }, [])
 const saveText = async() => 
  {
    if(inputVal.length==0)
    {
      alert("Enter something in the input")
      return;
    }
    if(localStorage.getItem("UniqueKey")==null)
    {
      alert("You need to sign in to use this website")
      setVal('')
      return
    }
    //console.log(user)
    if(localStorage.getItem("UniqueKey")!=null)
    {
    //  let nowDoc =  doc(db, "todos", localStorage.getItem("UniqueKey"));
      //console.log(docRef)
    await updateDoc(dbRef,{
      TodoArr:arrayUnion(inputVal)
    })
  }
  //  let arrToSet = [...todoArr]
  //  arrToSet.push(inputVal)
   // await addDoc(collection(db, "todos"), {
   // TodoArr: ["make chai boi", 'go code', 'eat', 'sleep']
   // });
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

 async function handleSpanClick(event) {
    const index = event.currentTarget.getAttribute('unique-id');
    const currentUpVal = event.target.value;
    const newTodoArr = [...todoArr];
    newTodoArr[index] = currentUpVal;
    setTodoArr(newTodoArr);
    localStorage.setItem('todos', JSON.stringify(newTodoArr));
    //let nowDoc =  doc(db, "todos", localStorage.getItem("UniqueKey"));
    
    await updateDoc(dbRef,{
      TodoArr:newTodoArr
    })
  }

 async function deleteTodo(index,valToDel) 
  {
    const newTodoArr = [...todoArr];
    newTodoArr.splice(index, 1);
    setTodoArr(newTodoArr);
   // let nowDoc =  doc(db, "todos", localStorage.getItem("UniqueKey"));
    //console.log(typeof nowDoc)
    await updateDoc(dbRef,{
      TodoArr:arrayRemove(valToDel)
    })
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
    pushDb(items)
    async function pushDb(modArr)
    {
     // let nowDoc =  doc(db, "todos", localStorage.getItem("UniqueKey"));
      await updateDoc(dbRef,{
        TodoArr:modArr
      })
    }

  }

  return (
    <>
    <Login sendArr={obj => setTodoArr(obj)} userId={id=> setUser(id)}/>
    <center>
    <div id="container" >
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
        <hr />
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
                        <span className="material-symbols-outlined" onClick={() => deleteTodo(index,todo)}>delete</span>
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
    </>
  );
}

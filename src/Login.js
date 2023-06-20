<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import './login.css'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,setPersistence,browserLocalPersistence, signInWithRedirect, getRedirectResult,deleteUser } from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc,collection, arrayUnion, where,getDocs, query, deleteDoc} from "firebase/firestore";
=======
import React from 'react'
import './login.css'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,setPersistence,browserLocalPersistence } from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc,collection, arrayUnion, where,getDocs, query} from "firebase/firestore";
>>>>>>> b04fd2d6f55d202e6535b8775639b76b59c4a253

export default function Login(props) {
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

<<<<<<< HEAD
      let userData;
      const [userEmail,setUserEmail] = useState('')
      const [userPhoto,setUserPhoto] = useState('')
      const [showUser,setShowUser] = useState(false)
      const [user,setUser] = useState(true)
      const [userDetails,setUserDetails] = useState(false)
      useEffect(()=>
      {
        if(localStorage.getItem("authState")!=null)
        {
          setShowUser(true)
          setUser(false)
        }
            else if(localStorage.getItem("authState")==null)
            {
            setShowUser(false)
            setUser(true)
            }
            
      }, [])
      const auth = getAuth();
      let delUser = auth.currentUser
      useEffect(()=>
      {
        if(localStorage.getItem("authState")!=null)
        {
          userData = JSON.parse(localStorage.getItem("authState"))
          setUserEmail(userData.email)
          setUserPhoto(userData.photoURL)
        // console.log(userData.email)
        }
      }, [localStorage.getItem("authState")])

      async function signToGoogle() {

=======
      async function signToGoogle() {
>>>>>>> b04fd2d6f55d202e6535b8775639b76b59c4a253
        const auth = getAuth();
        const provider = new GoogleAuthProvider(); // Create an instance of GoogleAuthProvider
        
        // Check if the user's authentication state is stored in persistent storage
        const storedAuthState = localStorage.getItem('authState'); // You can use localStorage instead if desired
      
        if (storedAuthState) {
          const user = JSON.parse(storedAuthState);
<<<<<<< HEAD
         // console.log('User is already signed in:', user);
=======
          console.log('User is already signed in:', user);
>>>>>>> b04fd2d6f55d202e6535b8775639b76b59c4a253
          makeArr(user.uid);
          return; // Exit the function since the user is already signed in
        }
        
        await setPersistence(auth, browserLocalPersistence); // Set the persistence to local
        
        try {
<<<<<<< HEAD
        //  signInWithRedirect(auth, provider);
=======
>>>>>>> b04fd2d6f55d202e6535b8775639b76b59c4a253
          const result = await signInWithPopup(auth, provider);
        
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          
          // The signed-in user info.
          const user = result.user;
<<<<<<< HEAD
         // console.log(user);
          localStorage.setItem("UniqueKey",user.uid)
          makeArr(user.uid);
          setUser(false)
          setShowUser(true)
=======
          console.log(user);
          makeArr(user.uid);
        
>>>>>>> b04fd2d6f55d202e6535b8775639b76b59c4a253
          // Store the user's authentication state in persistent storage
          localStorage.setItem('authState', JSON.stringify(user)); // You can use localStorage instead if desired
        
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        } catch (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        }
      }
      
      
    
      async function makeArr(unique) 
      {
        let arr = [];
        const q = query(collection(db, 'todos'), where('UniqueId', '==', unique));
        const querySnapshot = await getDocs(q);
        for (const doc of querySnapshot.docs)
        {
          const data = doc.data();
          arr.push(data);
          if (arr.length > 0) 
          {
<<<<<<< HEAD
            if(localStorage.getItem("UniqueKey")!=null)
            {
             // console.log(localStorage.getItem("UniqueKey"))
              getData()
            }
            //console.log('I am triggered');
=======
            console.log('I am triggered');
>>>>>>> b04fd2d6f55d202e6535b8775639b76b59c4a253
            return; // Exit the makeArr function if condition is met
          }
        }
      
<<<<<<< HEAD
       // const docRef = await addDoc(collection(db, 'todos'), 
       // {
       //   TodoArr: [],
       //   UniqueId: unique
       // });
        const docRef = await setDoc(doc(db, "todos", unique), {
          UniqueId:unique,
          TodoArr:[]
        })
=======
        const docRef = await addDoc(collection(db, 'todos'), 
        {
          TodoArr: [],
          UniqueId: unique
        });
        //const docRef = doc(collection(db, "todos", unique)); // Get the document reference
>>>>>>> b04fd2d6f55d202e6535b8775639b76b59c4a253
        //await setDoc(docRef, {
        //  TodoArr: [],
        //  UniqueId: unique
        //});
        
<<<<<<< HEAD
       // const docId = docRef.id;
      //localStorage.setItem("UniqueKey",unique)
        props.userId(unique);
      }
      
      function showDetails()
      {
        if(userDetails===false)
        {
          setUserDetails(true)
        }
          else if(userDetails===true)
          {
            setUserDetails(false)
          }
      }

      function logUserOut()
      {
        setUserDetails(false)
        setShowUser(false)
        setUser(true)
        localStorage.removeItem("authState")
        localStorage.removeItem("UniqueKey")
        localStorage.removeItem("todos")
        props.sendArr([])
      }

      async function getData()
      {
        let data;
        const q = query(collection(db, 'todos'), where('UniqueId', '==', localStorage.getItem("UniqueKey")));
        const querySnapshot = await getDocs(q);
        for (const doc of querySnapshot.docs) {
           data = doc.data().TodoArr;
        }
        props.sendArr(data)
        //localStorage.setItem("todos", JSON.stringify(data))
      }

      async function delUserOut()
      {
       let docRef = doc(db, "todos", localStorage.getItem("UniqueKey"));
        await deleteDoc(docRef)
        deleteUser(delUser).then(() => {
          // User deleted.
        }).catch((error) => {
          // An error ocurred
          // ...
        });
        setUserDetails(false)
        setShowUser(false)
        setUser(true)
        localStorage.removeItem("authState")
        localStorage.removeItem("UniqueKey")
        localStorage.removeItem("todos")
        props.sendArr([])
      }
      return (
        <div className='login-container'>
          {showUser && 
          <div className='user-container'>
            <span onClick={showDetails} style={{float:'right'}} class="material-symbols-outlined">expand_more</span>
            <span className='user-email'>{userEmail}</span>
          </div>}<br/>
          {user && <div>
          <span onClick={() => {signToGoogle()}} className='sign-txt'>Sign up</span>
          <span onClick={() => {signToGoogle()}} className='log-txt'>Login</span>
          </div>
          }
                      {userDetails && 
            <div className='options-container'><br/>
              <div onClick={logUserOut} className='text-user'>Log out</div><br/>
              <div onClick={delUserOut} className='text-user'>Delete account</div>
            </div>
            }
=======
        const docId = docRef.id;
      localStorage.setItem("UniqueKey",unique)
        props.userId(unique);
      }
      
      return (
        <div className='login-container'>
          <span onClick={() => {signToGoogle()}} className='sign-txt'>Sign up</span>
          <span onClick={() => {signToGoogle()}} className='log-txt'>Login</span>
>>>>>>> b04fd2d6f55d202e6535b8775639b76b59c4a253
        </div>
      );
    }
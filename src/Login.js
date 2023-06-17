import React from 'react'
import './login.css'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,setPersistence,browserLocalPersistence } from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc,collection, arrayUnion, where,getDocs, query} from "firebase/firestore";

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

      async function signToGoogle() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider(); // Create an instance of GoogleAuthProvider
        
        // Check if the user's authentication state is stored in persistent storage
        const storedAuthState = localStorage.getItem('authState'); // You can use localStorage instead if desired
      
        if (storedAuthState) {
          const user = JSON.parse(storedAuthState);
          console.log('User is already signed in:', user);
          makeArr(user.uid);
          return; // Exit the function since the user is already signed in
        }
        
        await setPersistence(auth, browserLocalPersistence); // Set the persistence to local
        
        try {
          const result = await signInWithPopup(auth, provider);
        
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          makeArr(user.uid);
        
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
            console.log('I am triggered');
            return; // Exit the makeArr function if condition is met
          }
        }
      
        const docRef = await addDoc(collection(db, 'todos'), 
        {
          TodoArr: [],
          UniqueId: unique
        });
        //const docRef = doc(collection(db, "todos", unique)); // Get the document reference
        //await setDoc(docRef, {
        //  TodoArr: [],
        //  UniqueId: unique
        //});
        
        const docId = docRef.id;
      localStorage.setItem("UniqueKey",unique)
        props.userId(unique);
      }
      
      return (
        <div className='login-container'>
          <span onClick={() => {signToGoogle()}} className='sign-txt'>Sign up</span>
          <span onClick={() => {signToGoogle()}} className='log-txt'>Login</span>
        </div>
      );
    }
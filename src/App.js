import './App.css';
import Contactus from './components/Contactus';
import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from 'firebase'
import Analytics from './components/Analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA5qnXqgUdXYSh89X0aBlQJo96cx5590ms",
  authDomain: "algoscale-contactus.firebaseapp.com",
  projectId: "algoscale-contactus",
  storageBucket: "algoscale-contactus.appspot.com",
  messagingSenderId: "32713025719",
  appId: "1:32713025719:web:d1691feaa5a50df85e0532"
};
// Initialize Firebase

const fireDb = firebase.initializeApp(firebaseConfig);

export const firedata = fireDb.database().ref()

export const analytics = firebase.analytics()




function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [content, setContent] = useState("Contactus")

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user )
      console.log("user", user)
    })
  },[])


  return (
    <div className="App">
      {isSignedIn ? (
          <>
            <div className="navbar">
              <div className="navitem" onClick={()=>setContent("Contactus")} >Contactus</div>
              <div className="navitem" onClick={()=>setContent("Analytics")} >Analytics</div>
              <div className="navitem" onClick={() => firebase.auth().signOut()}>Sign out!</div>
            </div>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            {(content==="Contactus") ? (
              <Contactus/>
            ):(<Analytics/>)}
            
          </>
        ) : (
          <div className="Login">
            <h2>Login</h2>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
    </div>
  );
}

export default App;

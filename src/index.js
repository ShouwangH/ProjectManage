import React from 'react';
import {render} from 'react-dom';


import {BrowserRouter as Router} from 'react-router-dom'


import ProviderLayer from './ProviderLayer';
import { FirebaseAppProvider } from 'reactfire';


// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF5OsSLs3Vk-LsyKFsEMaaoc4BXXMIHGE",
  authDomain: "api-project-354946788980.firebaseapp.com",
  databaseURL: "https://api-project-354946788980.firebaseio.com",
  projectId: "api-project-354946788980",
  storageBucket: "api-project-354946788980.appspot.com",
  messagingSenderId: "354946788980",
  appId: "1:354946788980:web:dd9498c06c752b8d83eb21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()


render(
  <React.StrictMode>
    <Router>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ProviderLayer/>
      </FirebaseAppProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


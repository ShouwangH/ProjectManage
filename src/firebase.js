import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = firebase.initializeApp({

    apiKey: "AIzaSyAF5OsSLs3Vk-LsyKFsEMaaoc4BXXMIHGE",
  
    authDomain: "api-project-354946788980.firebaseapp.com",
  
    databaseURL: "https://api-project-354946788980-default-rtdb.firebaseio.com",
  
    projectId: "api-project-354946788980",
  
    storageBucket: "api-project-354946788980.appspot.com",
  
    messagingSenderId: "354946788980",
  
    appId: "1:354946788980:web:dd9498c06c752b8d83eb21"
  
  });

export {firebaseConfig as firebase}
  
import firebase from 'firebase/app'
require('firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyBsx-emSC-A5AwGLFIENRhv9TJEm-Lzp1U",
    authDomain: "crud-eea49.firebaseapp.com",
    projectId: "crud-eea49",
    storageBucket: "crud-eea49.appspot.com",
    messagingSenderId: "317502607810",
    appId: "1:317502607810:web:ea15ff9291375fc234865b"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)
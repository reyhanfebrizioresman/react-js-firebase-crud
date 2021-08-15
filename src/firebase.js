import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA8lf_EoziWlmiUADE0i-vTuoJTMYNw7OE",
    authDomain: "crud-firebase-af4b6.firebaseapp.com",
    projectId: "crud-firebase-af4b6",
    storageBucket: "crud-firebase-af4b6.appspot.com",
    messagingSenderId: "414147577491",
    appId: "1:414147577491:web:d145fd7c93ac78cf796f66"
  };
  // Initialize Firebase
  const fireDb = firebase.initializeApp(firebaseConfig);


  export default fireDb.database().ref();
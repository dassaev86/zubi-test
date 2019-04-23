import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAzIdPhULS2CsXoUaufnkSq5mEJFfhm9bk",
    authDomain: "insta-zubi.firebaseapp.com",
    databaseURL: "https://insta-zubi.firebaseio.com",
    projectId: "insta-zubi",
    storageBucket: "insta-zubi.appspot.com",
    messagingSenderId: "723949346003"
  };

  export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
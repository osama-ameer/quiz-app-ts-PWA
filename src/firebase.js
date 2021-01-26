import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAKVVY5K7D1-nFTUK8t1tqRQr32CKn5LXM",
    authDomain: "push-notification-3a5cc.firebaseapp.com",
    projectId: "push-notification-3a5cc",
    storageBucket: "push-notification-3a5cc.appspot.com",
    messagingSenderId: "126903010005",
    appId: "1:126903010005:web:5c7af9704554d29805585c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
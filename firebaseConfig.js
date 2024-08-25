const firebaseConfig = {
    apiKey: "AIzaSyC93CW-Ezwy49f6zULCmOf9JFwJuQWd5ds",
    authDomain: "lebriise1.firebaseapp.com",
    databaseURL: "https://lebriise1-default-rtdb.firebaseio.com",
    projectId: "lebriise1",
    storageBucket: "lebriise1.appspot.com",
    messagingSenderId: "266935706953",
    appId: "1:266935706953:web:d8b44538359f5d2d9c6698",
    measurementId: "G-S5MB5D8HBB"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
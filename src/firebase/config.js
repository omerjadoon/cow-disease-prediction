import  firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDmffcQ1NkDEy22HJju0agEAcmp7_dNPkQ',
  authDomain: 'cow-project-5b53a.firebaseapp.com',
  databaseURL: 'https://cow-project-5b53a-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'cow-project-5b53a',
  storageBucket: 'cow-project-5b53a.appspot.com',
  messagingSenderId: '469848852055',
  appId: '1:469848852055:android:1b63175b722d75413c4512',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
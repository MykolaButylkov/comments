
const firebaseConfig = {
  apiKey: "AIzaSyDJxnsZkgszG0HzPSTpcWlpSSq4e7ehC8k",
  authDomain: "moving-website-mykola-butylkov.firebaseapp.com",
  databaseURL: "https://moving-website-mykola-butylkov-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "moving-website-mykola-butylkov",
  storageBucket: "moving-website-mykola-butylkov.appspot.com",
  messagingSenderId: "531117268055",
  appId: "1:531117268055:web:c90d63d9c53c51b8a7d712",
  measurementId: "G-J9LNN0Q3SJ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const storage = firebase.storage();

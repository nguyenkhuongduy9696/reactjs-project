import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyD36N8EcC1_blilVL3yKaV2Rzg7IoRpp2o",
    authDomain: "ph07116-reactjs.firebaseapp.com",
    databaseURL: "https://ph07116-reactjs.firebaseio.com",
    projectId: "ph07116-reactjs",
    storageBucket: "ph07116-reactjs.appspot.com",
    messagingSenderId: "833904680957",
    appId: "1:833904680957:web:aab18a9be82bde826b4394"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export {
    storage, firebase as default
}
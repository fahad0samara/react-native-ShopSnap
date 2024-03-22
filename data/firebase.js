import firebase from 'firebase/app';
import 'firebase/auth'; // Add other Firebase services you're using

const firebaseConfig = {
    apiKey: "AIzaSyAWZYGQiC_VtxYAel8f9jxLSU7fZcnTx_U",
    authDomain: "react-native-fierbase.firebaseapp.com",
    projectId: "react-native-fierbase",
    storageBucket: "react-native-fierbase.appspot.com",
    messagingSenderId: "1059821659401",
    appId: "1:1059821659401:web:0f8e96eb2893ee42f51fd8",
    measurementId: "G-V2RLPDHF3L"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCxudZyLmisaETpTO61dd8r5duCuB2FlGM",
  authDomain: "proyect-matching.firebaseapp.com",
  databaseURL: "https://proyect-matching-default-rtdb.firebaseio.com",
  projectId: "proyect-matching",
  storageBucket: "proyect-matching.appspot.com",
  messagingSenderId: "1061662234396",
  appId: "1:1061662234396:web:c4a547d563ab8100c90cd9",
  measurementId: "G-108DY321KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export { app };
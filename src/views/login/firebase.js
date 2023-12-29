import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
 
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const endpoint = "/verifyUser";
      const result = await axios.post(endpoint, { uid: user.uid });

      if (result && result.data.isNewUser) {
        // Aquí podrías actualizar el estado de tu aplicación para indicar que el usuario es nuevo
      }
    } catch (error) {
      console.error("Error al verificar usuario:", error);
      console.log("Respuesta de Axios:", error.response);
    }
  }
});


export { app, auth };

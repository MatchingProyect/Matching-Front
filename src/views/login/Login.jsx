import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import axios from "axios";
import { app } from './../../FireBase/fireBase.config';
import { getFirestore, doc, getDoc, setDoc  } from 'firebase/firestore';
import {gapi} from 'gapi-script';
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { fetchUsers } from "../../redux/reducer";
import {useDispatch} from "react-redux";

const Login = () => {
  const [emailValue, setEmailValue] = useState(""); 
  const [password, setPassword] = useState(""); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() =>{
    initializeGoogleAuth();

  }, [])

  const initializeGoogleAuth = () => {
    const start = () => {
      gapi.auth2.init({
        clientId: "1061662234396-o558vqrpml1bpo2rut38qufj859kgtpg.apps.googleusercontent.com",
      });
    };

    gapi.load("client:auth2", start);
  };


  const handleGoogleLoginClick = () => {
    // Crear un objeto de autenticación de Google
    const auth2 = gapi.auth2.getAuthInstance();
  
    // Iniciar el proceso de inicio de sesión de Google
    auth2.signIn().then(async (googleUser) => {
      console.log('googleUser', googleUser);
      console.log('isSignedIn', auth2.isSignedIn.get());

      const profile = googleUser.getBasicProfile();
  
      const user = {
        displayName: profile.getName(),
        email: profile.getEmail(),
        photoURL: profile.getImageUrl(),
        uid: profile.getId(),
      };

      console.log(user)
      // También puedes obtener el token de acceso de Google
      const googleAccessToken = googleUser.xc.access_token;
      console.log("googleAccessToken",googleAccessToken)

      const result = await authenticateWithFirebase(googleAccessToken);


    }).catch((error) => {
      console.error('Error en el inicio de sesión de Google:', error);
    });
  };

  const authenticateWithFirebase = async (googleAccessToken) => {
    try {

      const auth = getAuth(app);
      const credential = GoogleAuthProvider.credential(null, googleAccessToken);
      const authResult = await signInWithCredential(auth, credential);

      // El usuario ha sido autenticado correctamente en Firebase
      console.log("Usuario autenticado en Firebase:");
      await saveUserToFirestore(authResult.user);

      return true
    } catch (error) {
      console.error("Error al autenticar con Firebase:", error);
    }
  };
  

  const saveUserToFirestore = async (user) => {
    const { uid, email, displayName } = user;
  
    const db = getFirestore(app);
    const userRef = doc(db, 'users', uid);
  
    try {
      // Verificar si el usuario ya existe en Firestore
      const userSnapshot = await getDoc(userRef);
  
      if (userSnapshot.exists()) {
        console.log('Usuario ya existe en Firestore');
        navigate("/home");

      } else {
        // El usuario no existe, así que procedemos a guardarlo
        await setDoc(userRef, {
          email: email,
          displayName: displayName,
        });

        onRegister ({
          email: email,
          displayName: displayName,
        })

        console.log('Usuario guardado en Firestore con éxito');
      }
    } catch (error) {
      console.error('Error al guardar/verificar usuario en Firestore:', error);
    }
  };
  
  
  const onRegister = async ( data ) => {
    try {
      const endpoint = "/users"
      const result = await axios.post(endpoint, data) 
      if (result) {
        console.log("register success")
        navigate("/questions")
      }
    } catch (error) {
      throw error.message;
    }

  } 


  const onSubmit = async (data) => {
    console.log(data)

    try {
      const endpoint = "/login";
      const response = await axios.post(endpoint, data);
      console.log("response", response)

      if (response.data) {

        const isNewUser = response.data.isNewUser;

        const id = response.data.userLogeado.id
        if(id) dispatch(fetchUser(id))

        navigate("/home")
        
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className={styles.allContainer}>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.logoContainer}>
          <img
            src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702491179/Matching_rlj4xk.svg"
            alt="Logo"
            className={styles.logo}
          />
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.containerTitleLogin}>
            <h2 className={styles.titleLogin} >INICIO DE SESION</h2>
          </div>
          <div className={styles.contentController}>
            <label className={`${styles.labels} ${styles.emailLabel}`}>
              Email
            </label>
            <Controller
              name="emailValue"
              control={control}
              rules={{
                required: "Este campo es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Dirección de correo electrónico no válida",
                },
              }}
              render={({ field }) => (
                <>
                  <input
                    className={styles.inputEmail}
                    type="email"
                    inputMode="email"
                    {...field}
                  />
                  {errors.emailValue && <p>{errors.emailValue.message}</p>}
                </>
              )}
            />
          </div>

          <div className={styles.contentController}>
            <label className={styles.labelsPass}>Contraseña:</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Este campo es requerido",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                maxLength: {
                  value: 15,
                  message: "La contraseña no debe exceder los 15 caracteres",
                },
              }}
              render={({ field }) => (
                <>
                  <input
                    className={styles.inputPass}
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                </>
              )}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={togglePasswordVisibility}
            >
              <img
                src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702489357/eye.slash_vthsb6.svg"
                alt="Mostrar/Ocultar contraseña"
                className={styles.eyeIcon}
              />
            </button>
            {errors.password && <p className={styles.pPass}>{errors.password.message}</p>}
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          INICIAR SESION
        </button>


        <button
          type="button"
          onClick={handleGoogleLoginClick}
          className={styles.googleLoginButton}
        >
          INICIAR SESION CON GOOGLE
        </button>


        <div className={styles.container}>
          <p className={styles.registerText}>
            ¿No tienes cuenta? <br />
            <Link to="/registro" className={styles.registerLink}>
              Regístrate
            </Link>
          </p>

          <Link to='/restaurar-contrasenia' className={styles.forgotPasswordText}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

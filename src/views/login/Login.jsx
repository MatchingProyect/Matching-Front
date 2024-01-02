import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // Actualiza la importación aquí
import styles from "./login.module.css";
import axios from "axios";
import { app } from './../../FireBase/fireBase.config';
import { getFirestore, doc, getDoc, setDoc  } from 'firebase/firestore';
import {gapi} from 'gapi-script';
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";

const Login = () => {
  const [emailValue, setEmailValue] = useState(""); 
  const navigate = useNavigate();
  const [googleLoginSuccess, setGoogleLoginSuccess] = useState(false);


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
      console.log("result",result)


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

      return authResult
    } catch (error) {
      // Manejar errores de autenticación en Firebase
      console.error("Error al autenticar con Firebase:", error);
    }
  };
  

const saveUserToFirestore = async (uid, email, displayName, photoURL) => {
  console.log(uid, email, displayName, photoURL);
  const db = getFirestore(app);
  const userRef = doc(db, 'users', uid);
  console.log(userRef, "userRef")

  try {
    await setDoc(userRef, {
      email: email,
      displayName: displayName,

    });

    console.log('Usuario guardado en Firestore con éxito');
  } catch (error) {
    console.error('Error al guardar usuario en Firestore:', error);
  }
};


  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setGoogleLoginSuccess(true);
    console.log(credentialResponse);
  };
  
  const handleGoogleLoginError = () => {
    console.log('Login Failed');
    // Manejar errores si es necesario
  };

  const onSubmit = async (data) => {
    try {
      const endpoint = "/login";
      const result = await axios.post(endpoint, data);

      if (result) {
        const isNewUser = result.data.isNewUser;

        if (isNewUser || googleLoginSuccess) {
          navigate("/questions");
        } else {
          navigate("/home");
        }
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
              name="email"
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
                    {...field}
                    inputMode="email"
                    value={emailValue} // Asigna el valor del estado aquí
                    onChange={(e) => setEmailValue(e.target.value)} // Actualiza el estado en el cambio
                  />
                  {errors.email && <p>{errors.email.message}</p>}
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

        <button
          type="button"
          nClick={handleGoogleLogin}
          className={styles.googleLoginButton}
        >
          INICIAR SESION CON GOOGLE
        </button>

        {/* <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        /> */}

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
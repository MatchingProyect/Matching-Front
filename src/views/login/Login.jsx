import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import axios from "axios";
import { app } from './../../FireBase/fireBase.config';
import { getFirestore, doc, getDoc, setDoc  } from 'firebase/firestore';
import {gapi} from 'gapi-script';
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { fetchUser } from "../../redux/reducer";
import {useDispatch} from "react-redux";
import GoogleIcon from '@mui/icons-material/Google';
import { setDataUser } from '../../redux/reducer'; 
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorEmail, seterrorEmail] = useState()
  const [errorPassword, seterrorPassword] = useState()
  const [errorBan, seterrorBan] = useState()

  useEffect(() =>{
    initializeGoogleAuth();
    localStorage.removeItem('userData');

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

      console.log("authenticateWithFirebase", result)

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
        console.log(email)
        try {
          const response = await axios(`/userByEmail?email=${email}`);
          console.log("response", response.data.userByEmailFound)
          const id = response.data.userByEmailFound.id
          if (id) dispatch(fetchUser(id))
          localStorage.setItem('currentPath', "/home");
          navigate("/home");

        } catch (error) {
                console.error('Error al guardar/verificar usuario en Firestore:', error);
        }
    
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

  const onRegister = async (data) => {
    try {
      const endpoint = "/users";
      const result = await axios.post(endpoint, data);
      console.log("onRegister",result.data.userCreated)
      if (result) {

        dispatch(setDataUser({
          user:result.data.userCreated
        }));

        console.log("register success")
        navigate("/questions");
      }
    } catch (error) {
      throw error.message;
    }
  };

  const onSubmit = async (data) => {
    try {
      seterrorBan("")
      const endpoint = "/login";
      const response = await axios.post(endpoint, data);
      console.log("onSubmit",response)
      if (response.data.estado) {
        const id = response.data.id
        if (id) dispatch(fetchUser(id))
        localStorage.setItem('currentPath', "/home");
        navigate("/home");
      }

      seterrorBan("El usuario se encuentra baneado, ponte en contacto con el administrador")

    } catch (error) {
      seterrorEmail(error.response.data.email)
      seterrorPassword(error.response.data.pass)

      console.error("Error al iniciar sesión:", error.response.data);
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
                  {errors.emailValue && <p className={styles.pPass}>{errors.emailValue.message}</p>}

                  <div>
                    {errorEmail?<p className={styles.pPass}>{errorEmail}</p> :null}
                  </div>

                </>
              )}
            />
          </div>

          <div className={styles.contentController}>
            <label className={styles.labelsPass}>Contraseña</label>
          <div className = {styles.arregloBtn}>

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Este campo es requerido",

              }}
              render={({ field }) => (
                  <input
                    className={styles.inputPass}
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
              )}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={togglePasswordVisibility}>
                {
                showPassword? <VisibilityIcon/> : <VisibilityOffIcon/>
               }
            </button>
      
            
            </div>
            {errors.password && <p className={styles.pPass}>{errors.password.message}</p>}
            <div>
                    {errorPassword?<p className={styles.pPass}>{errorPassword}</p> :null}
            </div>
          </div>
        </div>

        <div>
                    {errorBan?<p className={styles.pPass}>{errorBan}</p> :null}
          </div>


        <button type="submit" className={styles.submitButtonLogin}>
          INICIAR SESION
        </button>

        <div className={styles.containerGoogle }>
          <button
            type="button"
            onClick={handleGoogleLoginClick}
            className={styles.submitButton }
          >
          <div className={styles.textGoogle }>
              <div className={styles.iconGoogle }><GoogleIcon></GoogleIcon></div>
              Iniciar sesión con Google
              </div>
          </button>
        </div>

        <div className={styles.container}>
          <p className={styles.registerText}>
            ¿No tienes cuenta? <br />
            <Link to="/registro" className={styles.registerLink }>
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

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // Actualiza la importación aquí
import styles from "./login.module.css";
import { Button } from "@mui/material";
import axios from "axios";
import { app } from './../../FireBase/fireBase.config';
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/reducer";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate(); // Actualiza el uso aquí
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegularLogin = async () => {
    try {
      // Lógica para manejar el inicio de sesión regular con email y contraseña
      // Puedes utilizar auth.signInWithEmailAndPassword u otra lógica según tu configuración

      // Después de iniciar sesión correctamente, redirige al usuario
      navigate('/home');
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const auth2 = gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      const googleProfile = googleUser.getBasicProfile();

      // Aquí debes llamar a tu función para crear el usuario en Firebase
      await createUserInFirebase(googleProfile.getEmail(), googleProfile.getName());

      // Redirige al usuario después de iniciar sesión correctamente
      navigate('/questions');
    } catch (error) {
      console.error('Error en el inicio de sesión con Google:', error);
    }
  };

  // Función para crear usuario en Firebase
  const createUserInFirebase = async (email, name) => {
    try {
      // Lógica para crear el usuario en Firebase usando el email y nombre
      // Puedes utilizar auth.createUserWithEmailAndPassword u otra lógica según tu configuración
    } catch (error) {
      console.error('Error al crear usuario en Firebase:', error);
    }
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

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />

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

const _styled = {
  signWithGoogle: {
    marginTop: '15px',
  }
}

export default Login;
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { Button } from "@mui/material";
import axios from "axios";
import { app } from './../../FireBase/fireBase.config';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [emailValue, setEmailValue] = useState(""); 
  const navigate = useNavigate();
  const [googleLoginSuccess, setGoogleLoginSuccess] = useState(false);

  const handleGoogleLoginClick = () => {
    // Crear un objeto de autenticación de Google
    const auth2 = gapi.auth2.getAuthInstance();
  
    // Iniciar el proceso de inicio de sesión de Google
    auth2.signIn().then((googleUser) => {
      // Obtener la información del usuario
      const profile = googleUser.getBasicProfile();
  
      // Aquí puedes realizar acciones con la información del usuario
      console.log('ID: ' + profile.getId()); // ID único del usuario
      console.log('Nombre: ' + profile.getName()); // Nombre del usuario
      console.log('Imagen URL: ' + profile.getImageUrl()); // URL de la imagen de perfil
      console.log('Email: ' + profile.getEmail()); // Email del usuario
  
      // También puedes obtener el token de acceso de Google
      const googleAccessToken = googleUser.getAuthResponse().access_token;
  
      // Ahora puedes enviar el token de acceso de Google a tu servidor para la autenticación del usuario
      // Ejemplo de cómo enviarlo usando axios (puedes ajustarlo según tu stack)
      // axios.post('/auth/google', { token: googleAccessToken }).then(response => {
      //   console.log(response.data);
      // });
  
      // Aquí puedes implementar cualquier lógica adicional que necesites después del inicio de sesión con Google
    }).catch((error) => {
      console.error('Error en el inicio de sesión de Google:', error);
    });
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    setGoogleLoginSuccess(true);
    // Puedes realizar acciones adicionales después de un inicio de sesión exitoso
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
          onClick={handleGoogleLoginClick}
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
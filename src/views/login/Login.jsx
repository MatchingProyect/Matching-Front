import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { Button } from "@mui/material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/reducer";


const Login = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onSubmit = async (data) => {
    try {
      const endpoint = "/login";
      const result = await axios.post(endpoint, data);

      if (result) {
        const isNewUser = result.data.isNewUser;

        if (isNewUser) {
          navigate("/questions");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  // Esta es la funcion para iniciar con google, aca se hace la logica
  // Para verificar si el user es nuevo o no y de ahi te manda a questions 
  // o al home :D Esta logica es la que deberia conectarse con el back,
  // auntentificar si el usuario existe o es nuevo, si existe va al home,
  // si es nuevo va a questions (CON GOOGLE RECORDAR) ya que el login normal
  // manda a /home directo porque ya estaria registrado el user
  // y en caso de que el user no este registrado directamente lo manda a register
  // O deberia al menos (tengo la cabeza quemada x samir xd)
  // Que hay que hacer? la firebase primero, para verificar los inicios con google
  // luego que esos usuarios se creen en la base de datos, luego
  // el firebase.js para autentificar esos usuarios
  // fin
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // aca verifica si es nuevo o no
      const isNewUser = result?.additionalUserInfo?.isNewUser;
  
      if (isNewUser) {
        navigate("/questions");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };
  // Esto es la config del form y los campos, no habria que tocar nada de aca
  // para abajo
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
        onSubmit={handleSubmit((data) => console.log(data))}
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

        <button type="submit" onClick={onSubmit} className={styles.submitButton}>
          INICIAR SESION
        </button>

        <Button onClick ={loginWithGoogle} sx={{ ..._styled.signWithGoogle }}>INICIAR SESION CON GOOGLE</Button>

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
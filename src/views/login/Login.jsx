import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

const Login = () => {
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
    <>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <img
          src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702491179/Matching_rlj4xk.svg"
          alt="Logo"
          className={styles.logo}
        />

        <div className={styles.inputContainer}>
          <h2 className={styles.h2Title}>INICIO DE SESION</h2>
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
            <div className={styles.passwordContainer}>
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
            </div>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          INICIAR SESION
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
    </>
  );
};

export default Login;
// RestaurarContrasenia.jsx

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

const RestaurarContrasenia = ({ onSubmit }) => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <img
          src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702491179/Matching_rlj4xk.svg"
          alt="Logo"
          className={styles.logo}
        />

        <div className={styles.inputContainer}>
          <h2 className={styles.h2Title}>Restaurar Contraseña</h2>
          <div className={styles.contentController}>
            <label className={`${styles.labels} ${styles.emailLabel}`}>Email</label>
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
                  <input className={styles.inputEmail} type="email" {...field} inputMode="email" />
                  {errors.email && <p>{errors.email.message}</p>}
                </>
              )}
            />
          </div>

          {/* Utiliza Link en lugar del botón submit */}
          <Link to="/restaurar-contrasenia-codigo">
            <button type="submit" className={styles.submitButton}>
              Enviar Código
            </button>
          </Link>
        </div>

        <div className={styles.container}>
          <p className={styles.registerText}>
            ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default RestaurarContrasenia;

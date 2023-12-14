import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

const RestaurarContraseniaCodigo = ({ onSubmit }) => {
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
          <p>Introduce el código que enviamos a tu email y elige una nueva contraseña.</p>
          <div className={styles.contentController}>
            <label className={styles.labels}>Código de Verificación</label>
            <Controller
              name="codigo"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <>
                  <input className={styles.inputField} type="text" {...field} />
                  {errors.codigo && <p>{errors.codigo.message}</p>}
                </>
              )}
            />
          </div>
          <div className={styles.contentController}>
            <label className={styles.labels}>Nueva Contraseña</label>
            <Controller
              name="nuevaContrasenia"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <>
                  <input className={styles.inputPass} type="password" {...field} />
                  {errors.nuevaContrasenia && <p>{errors.nuevaContrasenia.message}</p>}
                </>
              )}
            />
          </div>
          <div className={styles.contentController}>
            <label className={styles.labels}>Repetir Nueva Contraseña</label>
            <Controller
              name="repetirContrasenia"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <>
                  <input className={styles.inputPass} type="password" {...field} />
                  {errors.repetirContrasenia && <p>{errors.repetirContrasenia.message}</p>}
                </>
              )}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Restaurar Contraseña</button>
          <button type="button" className={styles.submitButton}>Reenviar Código</button>
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

export default RestaurarContraseniaCodigo;

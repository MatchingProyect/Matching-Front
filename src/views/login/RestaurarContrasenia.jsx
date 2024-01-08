// RestaurarContrasenia.jsx

import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./RestaurarContrasenia.module.css";
// import crypto from 'crypto-js'
import emailjs from '@emailjs/browser';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const RestaurarContrasenia =  () => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [codigo, setCodigo ] = useState()
  const navigate = useNavigate()

  const generarCodigoAleatorio = async () => {
    const array = new Uint8Array(4);
    window.crypto.getRandomValues(array);
    const codigoAleatorio = Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
    setCodigo(codigoAleatorio)
    return codigoAleatorio;
  };



  const onSubmit = async (data)=>{
    console.log("data", data)
    try {
      const rptacodigo = await generarCodigoAleatorio()

      const defaultValues = {
        user_email: `${data.email}`,
        message:
            `ESTE ES TU CODIGO: ${rptacodigo}`,
        };
      emailjs
          .send('service_dfonkqh', 'template_j9l4qgp', defaultValues, 'AOct4aYGtYkYpPDCn')
          .then(
              (result) => {
                  console.log(result.text);
              },
              (error) => {
                  console.log(error.text);
              }
          );

          console.log(rptacodigo)
          navigate( "/restaurar-contrasenia-codigo", { state: { codigo: rptacodigo, email: data.email } });

      } catch (error) {
        console.error('Error al hacer el POST:', error );
      }
  }

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
          <div className={ styles.contentInfoRestPass }>
            <p className={ styles.infoRestPass } >Introduce tu email para recibir un codigo y restablecer tu contraseña.</p>
          </div>
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

          
            <button type="submit" className={styles.submitButton}>
              Enviar Código
            </button>
          <div className={styles.containerSendCode }>
          <p className={styles.registerText}>
            ¿Ya tienes cuenta? <Link className={ styles.loginSendCode } to="/login">Iniciar sesión</Link>
          </p>
        </div>
        </div>        
      </form>
    </>
  );
};

export default RestaurarContrasenia;

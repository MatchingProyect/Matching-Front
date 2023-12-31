import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./RestaurarContraseniaConCodigo.module.css";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RestaurarContraseniaCodigo = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const location = useLocation();
  const codigo = location.state?.codigo || "";
  const email = location.state?.email || "";
  const navigate = useNavigate()

  const onSubmit = async (data)=>{
    console.log(data)
    if (codigo == data.codigo){
      if (data.nuevaContrasenia == data.repetirContrasenia){
        console.log("EL CODIGO ES CORRECTO")
        await putPassword(data.nuevaContrasenia)
        navigate( "/login");

      }
      else{
        console.log("LAS CONTRASEÑAS NO COINCIDEN")

      }

    }
    else {
      console.log("EL CODIGO ES INCORRECTO")
    }
  }

  const putPassword = async (password) => {
    try {
        const userSend = {
          email: email,
          password: password
        }
        console.log("userSend",userSend)
        const response = await axios.put(`/restartPassword`,userSend);      
        console.log('Respuesta del servidor:', response.data );

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
          <h2 className={styles.h2Title}>RESTAURAR CONTRASEÑA</h2>
          <p className={ styles.pharapRestPass } >Introduce el código que enviamos a tu email y elige una nueva contraseña.</p>
          <div className={styles.contentController}>
            <label className={styles.labels}>Código de Verificación</label>
            <Controller
              name="codigo"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <>
                  <input className={styles.inputField} type="text" {...field} />
                  {errors.codigo && <p className = {styles.errorss}>{errors.codigo.message}</p>}
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
                  {errors.nuevaContrasenia && <p className = {styles.errorss}>{errors.nuevaContrasenia.message}</p>}
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
                  {errors.repetirContrasenia && <p className = {styles.errorss}>{errors.repetirContrasenia.message}</p>}
                </>
              )}
            />
          </div>
          <button type="submit" className={styles.submitButton}>RESTAURAR CONTRASEÑA</button>
          <button type="button" className={styles.submitButton}>REENVIAR CODIGO</button>
        </div>

        <div className={styles.container}>
          <p className={styles.registerText}>
            ¿Ya tienes cuenta? <Link className={ styles.linkSesion } to="/login">Inicia sesión</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default RestaurarContraseniaCodigo;

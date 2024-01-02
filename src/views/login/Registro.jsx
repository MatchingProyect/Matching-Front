import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useUserContext } from "../../context/UserProvider";
import styles from './Registro.module.css';
import axios from "axios";

// El register ya crea los usuarios en la base de datos 
// Y tambien te manda a questions si es que se hace exitosamente
const Registro = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { setDatosUser,datosUser } = useUserContext(); // Estado global aca :)
  const navigate = useNavigate()
  // esto es para ver o no la pass
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const onSubmit = async ( data ) => {
    // setDatosUser({
    //   ...datosUser,
    //   nombreApellido: data.nombreApellido,
    //   email: data.email,
    //   pass: data.contrasenia
    // });
    // alert('Datos guardados');

    // Si el registro funciona aca te manda a questions
    try {
      const endpoint = "/register"
      console.log("user", data)
      const result = await axios.post(endpoint, data) 
      if (result) {
        navigate("/questions")
      }
      // console.log(data)
    } catch (error) {
      throw error.message;
    }

  } 
  // Aca esta el formulario del registro, no se deberia tocar nada

  return (
    <form className={ styles.formContainer } onSubmit={ handleSubmit( onSubmit )}>

      <div className={ styles.contentLogo }>
        <img
          src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702491179/Matching_rlj4xk.svg"
          alt="Logo"
          className={styles.logo}
        />
      </div>

      <div className={ styles.contentDatas } >
        <label className={ styles.labelsDatas } >Nombre y apellido:</label>
        <input className={ styles.inputsDatas } type="text" {...register('nombreApellido', { required: true, maxLength: 40 })}/>
        {errors.nombreApellido?.type === "required" && <p>Este campo es requerido</p>}
        {errors.nombreApellido?.type === "maxLength" && <p>El máximo en el campo es 40 caracteres</p>}
      </div>

      <div className={ styles.contentDatas } >
        <label className={ styles.labelsDatas } >Correo electrónico:</label>
        <input className={ styles.inputsDatas } type="email" {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}/>
        {errors.email?.type === "required" && <p>Este campo es requerido</p>}
        {errors.email?.type === "pattern" && <p>Dirección de correo electrónico no válida</p>}
      </div>

      <div className={ styles.contentDatas }>
        <label className={ styles.labelsDatas } >Contraseña:</label>
        <input className={ styles.inputsDatas } type={showPassword ? "text" : "password"} {...register('password', { required: true, minLength: 8, maxLength: 15 })}/>
        {errors.password?.type === "required" && <p>Este campo es requerido</p>}
        {errors.password?.type === "minLength" && <p>La contraseña debe tener al menos 8 caracteres</p>}
        {errors.password?.type === "maxLength" && <p>La contraseña no debe exceder los 15 caracteres</p>}
        <span onClick={togglePasswordVisibility}>
          {showPassword ? "Ocultar" : "Mostrar"} contraseña
        </span>
      </div>

      {/* {
        datosUser.nombreApellido && datosUser.email && datosUser.pass 
        ? (
        <Link to={'/questions'}>
          <Button variant="contained" sx={ { ..._styled.btnRegister } } type="submit">COMPLETAR PERFIL</Button>
        </Link>
        ) :
        <Button variant="contained" sx={ { ..._styled.btnRegister } } type="submit">REGISTRARME</Button>
      } */}
       
        <Button variant="contained" sx={{ ..._styled.btnRegister }} type="submit">REGISTRARME</Button>
      <div className={ styles.containerPs }>
        <p className={ styles.pRegister } >¿Ya tienes cuenta? <Link className={ styles.pLogin } to="/login">Inicia sesión</Link></p>
      </div>

    </form>
  );
};

const _styled = {
  btnRegister: {
    height: '50px',
    width: '388px',
    borderRadius: '10px',
    fontSize: '20px',
    fontWeight: '600',
    backgroundColor: '#0075F8',
    marginTop: '24px'
  }
}

export default Registro;

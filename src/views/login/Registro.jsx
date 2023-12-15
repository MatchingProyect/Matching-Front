import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; 


const Registro = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div>
        <label>Nombre y apellido:</label>
        <input type="text" {...register('nombreApellido', { required: true, maxLength: 40 })}/>
        {errors.nombreApellido?.type === "required" && <p>Este campo es requerido</p>}
        {errors.nombreApellido?.type === "maxLength" && <p>El máximo en el campo es 40 caracteres</p>}
      </div>

      <div>
        <label>Correo electrónico:</label>
        <input type="email" {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}/>
        {errors.email?.type === "required" && <p>Este campo es requerido</p>}
        {errors.email?.type === "pattern" && <p>Dirección de correo electrónico no válida</p>}
      </div>

      <div>
        <label>Contraseña:</label>
        <input type={showPassword ? "text" : "password"} {...register('contrasenia', { required: true, minLength: 8, maxLength: 15 })}/>
        {errors.contrasenia?.type === "required" && <p>Este campo es requerido</p>}
        {errors.contrasenia?.type === "minLength" && <p>La contraseña debe tener al menos 8 caracteres</p>}
        {errors.contrasenia?.type === "maxLength" && <p>La contraseña no debe exceder los 15 caracteres</p>}
        <span onClick={togglePasswordVisibility}>
          {showPassword ? "Ocultar" : "Mostrar"} contraseña
        </span>
      </div>

      <button type="submit">REGISTRARME</button>

      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </form>
  );
};

export default Registro;

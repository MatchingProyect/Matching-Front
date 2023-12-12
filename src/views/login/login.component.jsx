import React, { useState } from 'react';
import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Iniciar sesión con:', email, password);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mobile-first-container">
      <h2>Iniciar Sesión</h2>
      <form>
        <label>
          Correo Electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Contraseña:
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={toggleShowPassword}>
          {showPassword ? 'Ocultar Contraseña' : 'Mostrar Contraseña'}
        </button>

        <button type="button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </form>

      <div className="links-container">
        <p>No tienes cuenta? <a href="/registro">Registrarse</a></p>
        <p>¿Olvidaste tu contraseña? <a href="/recuperar-contrasenia">Recuperar Contraseña</a></p>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import './Login.css'; 
import logo from '../assets/image 1.png'; 
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login:', username);
    console.log('Senha:', password);
    // falta a conectar com a API do DJANGO
    
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Polícia Científica" className="login-logo" />
        <h2 className="login-title">LOGIN</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Login</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Cadastrar
          </button>
        </form>
        <a href="#" className="forgot-password-link">Esqueceu a senha?</a>
      </div>
    </div>
  );
}

export default Login;
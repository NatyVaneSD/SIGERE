import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/image 1.png';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    setErrorMessage('');

    fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.detail || 'Falha no login. Verifique suas credenciais.');
        });
      }
      return response.json();
    })
    .then(data => {
      // Armazena o token de acesso no localStorage após o login ser bem-sucedido
      localStorage.setItem('accessToken', data.access);
      onLoginSuccess();
    })
    .catch(error => {
      console.error('Erro de login:', error);
      setErrorMessage(error.message);
    });
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
        <a href="#" className="forgot-password-link">Esqueceu a senha?</a>
      </div>
    </div>
  );
}

export default Login;
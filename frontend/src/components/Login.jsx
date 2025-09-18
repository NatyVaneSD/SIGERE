import React, { useState } from 'react';
import './Login.css';  
import logo from '../assets/image 1.png';  

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login:', username);
    console.log('Senha:', password);
    
    // Simulação de login bem-sucedido
    if (username === 'teste' && password === '123') { 
      // Se o login for bem-sucedido, limpa a mensagem de erro e passa a categoria
      setErrorMessage('');
      const categoriaSimulada = 'administrativo';
      onLoginSuccess(categoriaSimulada); 
    } else {
      setErrorMessage('Login e/ou senha inválidos.');
      console.log('Credenciais inválidas. Por favor, tente novamente.');
    }
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
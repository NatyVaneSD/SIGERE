import React from "react";
import "./Header.css";
// Se você tiver a imagem do logo, coloque-a na pasta 'src' ou 'public'
// import logo from './path-to-your-logo.png';

const Header = () => {
  return (
    <header className="app-header">
      <h1>SISTEMA DE CADASTRO</h1>
      <div className="logo-container">
        {/* <img src={logo} alt="Logo" className="logo" /> */}
        <div className="logo-placeholder"></div>{" "}
        {/* Usando um placeholder por enquanto */}
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import OffcanvasNavbar from "./components/OffcanvasNavbar";
import Forms from "./components/Forms";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // O estado agora armazena a categoria do utilizador
  const [userCategory, setUserCategory] = useState(null);

  // A função agora aceita um argumento 'categoria'
  const handleLoginSuccess = (categoria) => {
    setIsLoggedIn(true);
    // Armazena a categoria no estado
    setUserCategory(categoria);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <OffcanvasNavbar />
          <main className="mt-4">
            {/* Passa a categoria como uma prop para o componente Forms */}
            <Forms userCategory={userCategory} />
          </main>
        </>
      ) : (
        // Passa a função para o componente Login
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
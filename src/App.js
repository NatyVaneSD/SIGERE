import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import CadastroRequisicao from "./components/CadastroRequisicao/CadastroRequisicao";
import CadastroMaterial from "./components/CadastroMaterial/CadastroMaterial";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="content">
          <CadastroRequisicao />
          <CadastroMaterial />
        </main>
      </div>
    </div>
  );
}

export default App;

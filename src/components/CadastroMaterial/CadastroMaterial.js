import React from "react";
import "./CadastroMaterial.css";

const CadastroMaterial = () => {
  return (
    <div className="form-container material-container">
      <h2>CADASTRAR MATERIAL</h2>
      <form className="material-form">
        <div className="form-grid-material">
          <div className="form-group">
            <label>Tipo de Equipamento:</label>
            <select>
              <option>opções</option>
            </select>
          </div>
          <div className="form-group">
            <label>Outros:</label>
            <input type="text" placeholder="inserir" />
          </div>
          <div className="form-group">
            <label>Quantidade (UNID):</label>
            <input type="text" placeholder="inserir" />
          </div>
          <div className="form-group">{/* Espaço em branco no layout */}</div>
          <div className="form-group">
            <label>Local de Armazenamento:</label>
            <select>
              <option>opções</option>
            </select>
          </div>
          <div className="form-group">
            <label>Prateleira:</label>
            <select>
              <option>opções</option>
            </select>
          </div>
        </div>
        <div className="buttons-container">
          <button type="button" className="action-button cadastrar">
            Cadastrar
          </button>
          <button type="button" className="action-button add-material">
            + MATERIAL
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroMaterial;

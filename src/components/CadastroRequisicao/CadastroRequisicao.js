import React from "react";
import "./CadastroRequisicao.css";

const CadastroRequisicao = () => {
  return (
    <div className="form-container requisicao-container">
      <h2>CADASTRAR REQUISIÇÃO</h2>
      <form className="requisicao-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Tipo de documento:</label>
            <select>
              <option>opções</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nº do documento:</label>
            <input type="text" placeholder="inserir" />
          </div>
          <div className="form-group">
            <label>Nº da requisição</label>
            <input type="text" placeholder="inserir" />
          </div>
          <div className="form-group">
            <label>Data da requisição:</label>
            <input type="text" placeholder="dd/mm/aaaa" />
          </div>
          <div className="form-group">
            <label>Unidade Solicitante:</label>
            <input type="text" placeholder="inserir" />
          </div>
          <div className="form-group">
            <label>Solicitante:</label>
            <input type="text" placeholder="inserir" />
          </div>
          <div className="form-group">
            <label>Tipo de exame:</label>
            <select>
              <option>opções</option>
            </select>
          </div>
          <div className="form-group">
            <label>Data de recebimento:</label>
            <input type="text" placeholder="dd/mm/aaaa" />
          </div>
          <div className="form-group">
            <label>Nº do protocolo:</label>
            <input type="text" placeholder="inserir" />
          </div>
          <div className="form-group">
            <label>Nº do caso:</label>
            <input type="text" placeholder="inserir" />
          </div>
          <div className="form-group full-width">
            <label>Objetivo da perícia:</label>
            <input type="text" placeholder="inserir" />
          </div>
          <div className="form-group">
            <label>Nível de Prioridade:</label>
            <select>
              <option>opções</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select>
              <option>opções</option>
            </select>
          </div>
        </div>
        <button type="submit" className="submit-button">
          Cadastrar Material
        </button>
      </form>
    </div>
  );
};

export default CadastroRequisicao;

// frontend/src/components/Forms.jsx

import { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "../App.css";
import MaterialForm from "./MaterialForm";

export default function Forms() {
  // 1. ADICIONADO: Estado para guardar os dados do formulário de Requisição
  const [requisicaoData, setRequisicaoData] = useState({
    tipo_documento: "",
    numero_documento: "",
    numero_requisicao: "",
    data_requisicao: "",
    solicitante: "",
    unidade_solicitante: "",
    tipo_exame: "",
    data_recebimento: "",
    numero_protocolo: "",
    numero_caso: "",
    nivel_prioridade: "",
    status: "Pendente",
  });

  // 2. ADICIONADO: Handler para atualizar o estado da requisição
  const handleRequisicaoChange = (e) => {
    const { name, value } = e.target;
    setRequisicaoData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Funções e estado para os múltiplos formulários de material (SEU CÓDIGO ORIGINAL) ---
  const initialMaterial = {
    tipoEquipamento: "",
    outrosTipoEquipamento: "",
    quantidade: 1,
    localArmazenamento: "",
    prateleira: "",
  };

  const [materiais, setMateriais] = useState([initialMaterial]);

  const handleAddMaterial = () => {
    setMateriais([...materiais, { ...initialMaterial }]);
  };

  const handleMaterialChange = (index, updatedValues) => {
    const newMateriais = [...materiais];
    newMateriais[index] = { ...newMateriais[index], ...updatedValues };
    setMateriais(newMateriais);
  };

  const handleRemoveMaterial = (indexToRemove) => {
    const newMateriais = materiais.filter(
      (_, index) => index !== indexToRemove
    );
    setMateriais(newMateriais);
  };

  // 3. ADICIONADO: Lógica de envio para o backend
  const handleSubmit = (event) => {
    event.preventDefault();

    // Converte as chaves de camelCase (JavaScript) para snake_case (Python/Django)
    const materiaisParaEnviar = materiais.map(mat => ({
        tipo_equipamento: mat.tipoEquipamento,
        outros_tipo_equipamento: mat.outrosTipoEquipamento,
        quantidade: mat.quantidade,
        local_armazenamento: mat.localArmazenamento,
        prateleira: mat.prateleira
    }));

    const finalPayload = {
      ...requisicaoData,
      materiais: materiaisParaEnviar,
    };

    console.log("Enviando para o backend:", finalPayload);

    fetch("http://localhost:8000/api/requisicoes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalPayload),
    })
      .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
      .then(data => {
        console.log("Sucesso:", data);
        alert("Requisição cadastrada com sucesso!");
        // Limpa formulários
        setRequisicaoData({ tipo_documento: "", numero_documento: "", numero_requisicao: "", data_requisicao: "", solicitante: "", unidade_solicitante: "", tipo_exame: "", data_recebimento: "", numero_protocolo: "", numero_caso: "", nivel_prioridade: "", status: "Pendente" });
        setMateriais([initialMaterial]);
      })
      .catch(error => {
        console.error("Erro ao cadastrar:", error);
        const errorMessages = Object.entries(error).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`).join("\n");
        alert(`Erro ao cadastrar:\n${errorMessages}`);
      });
  };

  return (
    <Container>
      <Row className="mb-3">
        <h4>Cadastrar Requisição</h4>
      </Row>
      {/* 4. ADICIONADO: onSubmit no <Form> para ativar a função handleSubmit */}
      <Form onSubmit={handleSubmit}>
        {/* 5. ADICIONADO: name, value e onChange em todos os campos */}
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group>
              <Form.Label>Tipo de documento:</Form.Label>
              <Form.Select name="tipo_documento" value={requisicaoData.tipo_documento} onChange={handleRequisicaoChange} required>
                <option value="">Opções</option>
                <option value="Ofício">Ofício</option>
                <option value="BO">BO</option>
                <option value="IPL">IPL</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Nº do documento:</Form.Label>
              <Form.Control name="numero_documento" value={requisicaoData.numero_documento} onChange={handleRequisicaoChange} type="text" placeholder="Inserir" required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group>
              <Form.Label>Nº da Requisição:</Form.Label>
              <Form.Control name="numero_requisicao" value={requisicaoData.numero_requisicao} onChange={handleRequisicaoChange} type="text" placeholder="Inserir" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Data da requisição:</Form.Label>
              <Form.Control name="data_requisicao" value={requisicaoData.data_requisicao} onChange={handleRequisicaoChange} type="date" required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group>
              <Form.Label>Solicitante:</Form.Label>
              <Form.Control name="solicitante" value={requisicaoData.solicitante} onChange={handleRequisicaoChange} type="text" placeholder="Inserir" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Unidade Solicitante:</Form.Label>
              <Form.Control name="unidade_solicitante" value={requisicaoData.unidade_solicitante} onChange={handleRequisicaoChange} type="text" placeholder="Inserir" required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group>
              <Form.Label>Tipo de exame:</Form.Label>
              <Form.Select name="tipo_exame" value={requisicaoData.tipo_exame} onChange={handleRequisicaoChange} required>
                <option value="">Opções</option>
                <option value="Análise de conteúdo">Análise de conteúdo</option>
                <option value="Extração de conteúdo">Extração de conteúdo</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Data do recebimento:</Form.Label>
              <Form.Control name="data_recebimento" value={requisicaoData.data_recebimento} onChange={handleRequisicaoChange} type="date" />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group>
              <Form.Label>Nº do protocolo:</Form.Label>
              <Form.Control name="numero_protocolo" value={requisicaoData.numero_protocolo} onChange={handleRequisicaoChange} type="text" placeholder="Inserir" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Nº do caso:</Form.Label>
              <Form.Control name="numero_caso" value={requisicaoData.numero_caso} onChange={handleRequisicaoChange} type="text" placeholder="Inserir" />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-4">
          <Col className="me-4">
            <Form.Group>
              <Form.Label>Nível de prioridade:</Form.Label>
              <Form.Select name="nivel_prioridade" value={requisicaoData.nivel_prioridade} onChange={handleRequisicaoChange} required>
                <option value="">Opções</option>
                <option value="Prioridade 1">Prioridade 1</option>
                <option value="Prioridade 2">Prioridade 2</option>
                <option value="Prioridade 3">Prioridade 3</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Status:</Form.Label>
              <Form.Select name="status" value={requisicaoData.status} onChange={handleRequisicaoChange}>
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Cancelado">Cancelado</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <hr className="my-4"/>

        {materiais.map((material, index) => (
          <MaterialForm
            key={index}
            material={material}
            index={index}
            handleMaterialChange={handleMaterialChange}
            handleRemoveMaterial={handleRemoveMaterial}
          />
        ))}
        
        <Container className="p-0">
          <Row>
            <div className="d-flex justify-content-start mb-3 gap-2">
              <Button variant="outline-success" onClick={handleAddMaterial}>
                Adicionar Material
              </Button>
            </div>
          </Row>
        </Container>
        <div className="d-flex justify-content-end mb-3">
          {/* 6. ADICIONADO: type="submit" para acionar o onSubmit do formulário */}
          <Button type="submit" className="mb-3 w-25" variant="primary">
            Cadastrar Requisição
          </Button>
        </div>
      </Form>
    </Container>
  );
}
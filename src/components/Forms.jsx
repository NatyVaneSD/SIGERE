import { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "../App.css";
import MaterialForm from "./MaterialForm";

export default function Forms() {
  // Funções e estado para os múltiplos formulários de material
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

  const handleCadastrarMaterial = () => {
    console.log("Dados a serem enviados:", materiais);
    // Sua lógica de envio de dados para o backend
  };

  return (
    <Container fluid>
      <Row className="mb-3">
        <h4>Cadastrar Requisição</h4>
      </Row>
      {/* Começo do Formulário de Requisição */}
      <Form>
        {/* ... Seu código original do formulário de requisição ... */}
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group>
              <Form.Label>Tipo de documento:</Form.Label>
              <Form.Select aria-label="Tipo de documento">
                <option>Opções</option>
                <option value="1">Ofício</option>
                <option value="2">BO</option>
                <option value="3">IPL</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Numero do documento">
              <Form.Label>Nº do documento:</Form.Label>
              <Form.Control type="number" placeholder="Inserir" />
            </Form.Group>
          </Col>
        </Row>
        {/* ... outros campos do formulário de requisição ... */}
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group controlId="Numero da requisicao">
              <Form.Label>Nº da Requisição:</Form.Label>
              <Form.Control type="number" placeholder="Inserir" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Data da requisicao">
              <Form.Label>Data da requisição:</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/aaa" />
            </Form.Group>
          </Col>
        </Row>
        {/* ... outros campos ... */}
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group controlId="Solicitante">
              <Form.Label>Solicitante:</Form.Label>
              <Form.Control type="text" placeholder="Inserir" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Undade Solicitante">
              <Form.Label>Unidade Solicitante:</Form.Label>
              <Form.Control type="text" placeholder="Inserir" />
            </Form.Group>
          </Col>
        </Row>
        {/* ... outros campos ... */}
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group>
              <Form.Label>Tipo de exame:</Form.Label>
              <Form.Select aria-label="Tipo de exame">
                <option>Opções</option>
                <option value="1">Análise de conteúdo</option>
                <option value="2">Extração de conteúdo</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Data do recebimento">
              <Form.Label>Data do recebimento:</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/aaa" />
            </Form.Group>
          </Col>
        </Row>
        {/* ... outros campos ... */}
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group controlId="Numero do protocolo">
              <Form.Label>Nº do protocolo:</Form.Label>
              <Form.Control type="number" placeholder="Inserir" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Numero do caso">
              <Form.Label>Nº do caso:</Form.Label>
              <Form.Control type="number" placeholder="Inserir" />
            </Form.Group>
          </Col>
        </Row>
        {/* ... outros campos ... */}
        <Row className="mb-4">
          <Col className="me-4">
            <Form.Group>
              <Form.Label>Nível de prioridade:</Form.Label>
              <Form.Select aria-label="Nível de prioridade">
                <option>Opções</option>
                <option value="1">Prioridade 1</option>
                <option value="2">Prioridade 2</option>
                <option value="3">Prioridade 3</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Status:</Form.Label>
              <Form.Select aria-label="Status" defaultValue="pendente">
                <option value="pendente">Pendente</option>
                <option value="1">Em andamento</option>
                <option value="2">Finalizado</option>
                <option value="3">Cancelado</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* AQUI COMEÇA A PARTE DO FORMULÁRIO DE MATERIAL */}
        {materiais.map((material, index) => (
          <MaterialForm
            key={index}
            material={material}
            index={index}
            handleMaterialChange={handleMaterialChange}
            handleRemoveMaterial={handleRemoveMaterial}
          />
        ))}
        {/* Botões para adicionar e cadastrar */}
        <Container className="p-0">
          {" "}
          {/* Adicionei p-0 aqui para remover padding */}
          <Row>
            <div className="d-flex justify-content-start mb-3 gap-2">
              <Button
                variant="outline-primary"
                onClick={handleCadastrarMaterial}
              >
                Cadastrar Material
              </Button>
              <Button variant="outline-success" onClick={handleAddMaterial}>
                Adicionar Material
              </Button>
            </div>
          </Row>
        </Container>

        {/* FIM DA PARTE DO FORMULÁRIO DE MATERIAL */}

        {/* Este botão deve estar fora do formulário se ele enviar algo diferente */}
        {/* Se "Cadastrar Requisição" envia todos os dados, ele pode ficar aqui */}
        {/* Se ele envia apenas os dados de requisição, você pode mantê-lo fora */}
        <div className="d-flex justify-content-end mb-3">
          <Button className="mb-3 w-25" variant="primary">
            Cadastrar Requisição
          </Button>
        </div>
      </Form>
    </Container>
  );
}

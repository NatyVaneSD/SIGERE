import { useState } from "react";
import { Form, Row, Col, Button, Container, Modal } from "react-bootstrap";
import "../App.css";

export default function Forms() {
  const [tipoEquipamento, setTipoEquipamento] = useState("");

  // Função para lidar com a mudança na seleção
  const handleSelectChange = (event) => {
    setTipoEquipamento(event.target.value);
  };
  return (
    <Container Fluid>
      <Row className="mb-3">
        <h4>Cadastrar Requisição</h4>
      </Row>
      <Form>
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
        <div className="d-flex justify-content-center mb-3">
          <Button className="mb-3 w-50" variant="outline-primary">
            Cadastrar
          </Button>
        </div>
      </Form>

      {/* Formulário de Cadastro de Material */}
      <Container className="p-0 mb-4">
        <Row className="mb-4">
          <h4>Cadastrar Material</h4>
        </Row>
        <Form>
          <Row className="mb-3">
            <Col className="me-4">
              <Form.Group>
                <Form.Label>Tipo de equipamento:</Form.Label>
                <Form.Select
                  aria-label="Tipo de documento"
                  onChange={handleSelectChange}
                  value={tipoEquipamento}
                >
                  <option>Opções</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="notebook">Notebook</option>
                  <option value="pendrive">Pendrive</option>
                  <option value="cpu">CPU</option>
                  <option value="cartao de memoria">Cartão de memória</option>
                  <option value="outros">Outros</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Renderização Condicional do campo "Outros" */}
            {tipoEquipamento === "outros" && (
              <Col className="me-3 p">
                <Form.Group controlId="outrosTipoEquipamento">
                  <Form.Label>Nome do equipamento:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: Tablet, SSD, etc."
                  />
                </Form.Group>
              </Col>
            )}

            <Col>
              <Form.Group controlId="Numero do documento">
                <Form.Label>Quantidade: </Form.Label>
                <Form.Control
                  defaultValue="1"
                  type="number"
                  placeholder="UNID"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col className="me-4">
              <Form.Group>
                <Form.Label>Local de armazenamento:</Form.Label>
                <Form.Select aria-label="Tipo de documento">
                  <option>Opções</option>
                  <option value="deposito1">Deposito 1</option>
                  <option value="deposito2">Deposito 2</option>
                  <option value="deposito3">Deposito 3</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="Numero do documento">
                <Form.Label>Quantidade:</Form.Label>
                <Form.Control type="number" placeholder="UNID" />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-left mb-2">
            <Button className="mb-3 w-25" variant="outline-primary">
              Cadastrar
            </Button>
          </div>
        </Form>
      </Container>
    </Container>
  );
}

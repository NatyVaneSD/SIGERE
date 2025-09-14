import { Form, Row, Col, Button, Card, Container } from "react-bootstrap";

export default function Forms() {
  return (
    <Container Fluid>
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

        <Row className="mb-6">
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

        <Row className="mb-3">
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

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="Objetivo da pericia">
              <Form.Label>Objetivo da perícia:</Form.Label>
              <Form.Control type="text" placeholder="Descreva" />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

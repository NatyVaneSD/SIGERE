import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const MaterialForm = ({
  material,
  index,
  handleMaterialChange,
  handleRemoveMaterial,
}) => {
  return (
    <Container className="p-0 mb-4">
      {}
      <Row className="mb-4 align-items-center">
        <Col>
          <h4>Cadastrar Material {index + 1}</h4>
        </Col>
        {index > 0 && (
          <Col xs="auto" className="ms-auto">
            <Button
              variant="danger"
              onClick={() => handleRemoveMaterial(index)}
            >
              Remover
            </Button>
          </Col>
        )}
      </Row>
      {}
      <>
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group>
              <Form.Label>Tipo de equipamento:</Form.Label>
              <Form.Select
                name="tipoEquipamento"
                aria-label="Tipo de documento"
                onChange={(e) =>
                  handleMaterialChange(index, {
                    tipoEquipamento: e.target.value,
                  })
                }
                value={material.tipoEquipamento}
              >
                <option value="">Opções</option>
                <option value="smartphone">Smartphone</option>
                <option value="notebook">Notebook</option>
                <option value="pendrive">Pendrive</option>
                <option value="cpu">CPU</option>
                <option value="cartao de memoria">Cartão de memória</option>
                <option value="outros">Outros</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {material.tipoEquipamento === "outros" && (
            <Col className="me-3 p">
              <Form.Group controlId={`outrosTipoEquipamento-${index}`}>
                <Form.Label>Nome do equipamento:</Form.Label>
                <Form.Control
                  name="outrosTipoEquipamento"
                  type="text"
                  placeholder="Ex: Tablet, SSD, etc."
                  value={material.outrosTipoEquipamento}
                  onChange={(e) =>
                    handleMaterialChange(index, {
                      outrosTipoEquipamento: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          )}
          <Col>
            <Form.Group controlId={`quantidade-${index}`}>
              <Form.Label>Quantidade: </Form.Label>
              <Form.Control
                name="quantidade"
                defaultValue="1"
                type="number"
                placeholder="UNID"
                value={material.quantidade}
                onChange={(e) =>
                  handleMaterialChange(index, { quantidade: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group>
              <Form.Label>Local de armazenamento:</Form.Label>
              <Form.Select
                name="localArmazenamento"
                aria-label="Tipo de documento"
                value={material.localArmazenamento}
                onChange={(e) =>
                  handleMaterialChange(index, {
                    localArmazenamento: e.target.value,
                  })
                }
              >
                <option value="">Opções</option>
                <option value="deposito1">Deposito 1</option>
                <option value="deposito2">Deposito 2</option>
                <option value="deposito3">Deposito 3</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId={`prateleira-${index}`}>
              <Form.Label>Prateleira:</Form.Label>
              <Form.Control
                name="prateleira"
                type="text"
                placeholder="Inserir"
                value={material.prateleira}
                onChange={(e) =>
                  handleMaterialChange(index, { prateleira: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
      </>
    </Container>
  );
};

export default MaterialForm;

import { useState } from "react";
import { Navbar, Container, Button, Offcanvas, Nav } from "react-bootstrap";
import { FaAlignJustify } from "react-icons/fa";

function OffcanvasNavbar() {
  // Estado para controlar a visibilidade do Offcanvas
  const [show, setShow] = useState(false);

  // Funções para manipular o estado
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* 1. O Navbar com o botão de acionamento */}
      <Navbar bg="primary" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          {/* O botão que aciona o Offcanvas */}
          <Button variant="dark" onClick={handleShow} size="lg">
            <FaAlignJustify />
          </Button>

          <Navbar.Brand href="#home" className="d-flex align-items-center">
            {/* O texto vem primeiro, com uma margem à direita */}
            <span className="me-4">
              <h4>Sistema de Cadastro de Requisições</h4>
            </span>

            {/* A logo vem depois */}
            <img
              alt=""
              src="./src/img/logo.png"
              width="70"
              height="70"
              className="d-inline-block"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* 2. O Offcanvas propriamente dito */}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-gray-700">
            <h2>Menu de Navegação</h2>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <hr style={{ color: "#ccc", margin: "1rem 0" }} />
            <Nav.Link
              className="text-gray-700"
              href="#buscarRequisicao"
              onClick={handleClose}
            >
              <h5 className="mb-3">Buscar Requisição</h5>
            </Nav.Link>
            <hr style={{ color: "#ccc", margin: "1rem 0" }} />
            <Nav.Link href="#gerencia" onClick={handleClose}>
              <h5 className="mb-3">Gerência</h5>
            </Nav.Link>
            <hr style={{ color: "#ccc", margin: "1rem 0" }} />
            <Nav.Link href="#separarMateriais" onClick={handleClose}>
              <h5 className="mb-3">Separar materiais</h5>
            </Nav.Link>
            <hr style={{ color: "#ccc", margin: "1rem 0" }} />
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffcanvasNavbar;

import { useState } from "react";
import {
  Navbar,
  Container,
  Button,
  Offcanvas,
  Nav,
  DropdownDivider,
} from "react-bootstrap";
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
          <Button variant="outline-primary" onClick={handleShow} size="lg">
            <FaAlignJustify />
          </Button>

          <Navbar.Brand href="#home">
            {/* O logo e o texto da marca */}
            Sistema de Cadastro
            <img
              alt=""
              src="./src/img/logo.png"
              width="70"
              height="70"
              className="d-inline-block align-top me-auto"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* 2. O Offcanvas propriamente dito */}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h2>Menu de Navegação</h2>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <hr style={{ color: "#ccc", margin: "1rem 0" }} />
            <Nav.Link href="#buscarRequisicao" onClick={handleClose}>
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

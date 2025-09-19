import { useState, useCallback } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import axios from "axios";
import MaterialForm from "./MaterialForm"; // Importando o componente separado
import "../App.css";

// Função para aplicar a máscara, mantida a original do usuário
const applyMask = (value, maskType) => {
  const digits = value.replace(/\D/g, "");

  switch (maskType) {
    case "requisicao":
      return digits
        .slice(0, 10)
        .replace(/(\d{4})(\d)/, "$1.$2")
        .replace(/(\d{4}\.\d{4})(\d)/, "$1-$2");

    case "protocolo":
      return digits
        .slice(0, 12)
        .replace(/(\d{4})(\d)/, "$1.$2")
        .replace(/(\d{4}\.\d{2})(\d)/, "$1.$2");

    case "caso":
      return digits
        .slice(0, 10)
        .replace(/(\d{4})(\d)/, "$1.$2");

    case "oficio":
      return digits
        .slice(0, 9)
        .replace(/(\d{5})(\d)/, "$1/$2");

    case "bo":
      return digits
        .slice(0, 12)
        .replace(/(\d{5})(\d)/, "$1.$2")
        .replace(/(\d{5}\.\d{5})(\d)/, "$1-$2");

    case "ipl":
      return digits
        .slice(0, 11)
        .replace(/(\d{4})(\d)/, "$1.$2")
        .replace(/(\d{4}\.\d{3})(\d)/, "$1.$2");

    default:
      return value;
  }
};

export default function Forms({ userCategory }) {
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

  const [protocoloError, setProtocoloError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    }
  };

  const checkNumeroProtocolo = useCallback(
    debounce(async (numero) => {
      if (!numero || numero.length < 15) {
        setProtocoloError('');
        return;
      }
      setIsVerifying(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/requisicoes/verificar-protocolo/?numero=${numero}`);
        if (response.data.existe) {
          setProtocoloError('Este número de protocolo já está em uso.');
        } else {
          setProtocoloError('');
        }
      } catch (error) {
        console.error("Erro ao verificar protocolo:", error);
      } finally {
        setIsVerifying(false);
      }
    }, 500),
    []
  );

  const handleRequisicaoChange = (e) => {
    let { name, value } = e.target;
    switch (name) {
      case "numero_requisicao":
        value = applyMask(value, "requisicao");
        break;
      case "numero_protocolo":
        value = applyMask(value, "protocolo");
        checkNumeroProtocolo(value);
        break;
      case "numero_caso":
        value = applyMask(value, "caso");
        break;
      case "numero_documento": {
        const docType = requisicaoData.tipo_documento;
        if (docType === "Ofício") value = applyMask(value, "oficio");
        else if (docType === "BO") value = applyMask(value, "bo");
        else if (docType === "IPL") value = applyMask(value, "ipl");
        break;
      }
    }
    if (name === "tipo_documento") {
      setRequisicaoData((prev) => ({ ...prev, numero_documento: "", [name]: value }));
    } else {
      setRequisicaoData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const initialMaterial = {
    tipoEquipamento: "",
    outrosTipoEquipamento: "",
    quantidade: 1,
    localArmazenamento: "",
    prateleira: "", // Campo prateleira adicionado novamente
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error("Erro: Token de acesso não encontrado. Você não está logado.");
      return;
    }
    const cleanRequisicaoData = {
      ...requisicaoData,
      numero_requisicao: requisicaoData.numero_requisicao.replace(/\D/g, ''),
      numero_protocolo: requisicaoData.numero_protocolo.replace(/\D/g, ''),
      numero_documento: requisicaoData.numero_documento.replace(/\D/g, ''),
      numero_caso: requisicaoData.numero_caso.replace(/\D/g, ''),
    };
    const materiaisParaEnviar = materiais.map(mat => ({
      tipo_equipamento: mat.tipoEquipamento,
      outros_tipo_equipamento: mat.outrosTipoEquipamento,
      quantidade: mat.quantidade,
      local_armazenamento: mat.localArmazenamento,
      prateleira: mat.prateleira, // Campo prateleira enviado novamente
    }));
    const finalPayload = {
      ...cleanRequisicaoData,
      materiais: materiaisParaEnviar,
    };
    console.log("Enviando para o backend:", finalPayload);
    fetch("http://localhost:8000/api/requisicoes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(finalPayload),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => Promise.reject(err));
        }
        return response.json();
      })
      .then(data => {
        console.log("Sucesso:", data);
        window.alert("Requisição cadastrada com sucesso!");
        setRequisicaoData({
          tipo_documento: "", numero_documento: "", numero_requisicao: "", data_requisicao: "", solicitante: "", unidade_solicitante: "", tipo_exame: "", data_recebimento: "", numero_protocolo: "", numero_caso: "", nivel_prioridade: "", status: "Pendente",
        });
        setMateriais([initialMaterial]);
      })
      .catch(error => {
        console.error("Erro ao cadastrar:", error);
        if (typeof error === 'object' && error !== null) {
          const errorMessages = Object.entries(error).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`).join("\n");
          window.alert(`Erro ao cadastrar:\n${errorMessages}`);
        } else {
          window.alert("Ocorreu um erro desconhecido ao cadastrar a requisição.");
        }
      });
  };

  return (
    <Container>
      <Row className="mb-3">
        <h4>Cadastrar Requisição</h4>
      </Row>
      <Form onSubmit={handleSubmit}>
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
              <Form.Control name="numero_documento" value={requisicaoData.numero_documento} onChange={handleRequisicaoChange} type="text" placeholder="Selecione o tipo primeiro" required />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="me-4">
            <Form.Group>
              <Form.Label>Nº da Requisição:</Form.Label>
              <Form.Control name="numero_requisicao" value={requisicaoData.numero_requisicao} onChange={handleRequisicaoChange} type="text" placeholder="NNNN.NNNN-NN" maxLength="12" required />
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
              <Form.Control
                name="numero_protocolo"
                value={requisicaoData.numero_protocolo}
                onChange={handleRequisicaoChange}
                type="text"
                placeholder="NNNN.NN.NNNNNN"
                maxLength="15"
                isInvalid={!!protocoloError}
              />
              {isVerifying && <Form.Text className="text-muted">Verificando...</Form.Text>}
              <Form.Control.Feedback type="invalid">
                {protocoloError}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Nº do caso:</Form.Label>
              <Form.Control name="numero_caso" value={requisicaoData.numero_caso} onChange={handleRequisicaoChange} type="text" placeholder="NNNN.NNNNNN" maxLength="11" />
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
        <hr className="my-4" />
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
          <Button type="submit" className="mb-3 w-25" variant="primary">
            Cadastrar Requisição
          </Button>
        </div>
      </Form>
    </Container>
  );
}
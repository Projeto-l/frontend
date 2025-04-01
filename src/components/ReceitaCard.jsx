import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MedicamentoDetalhado from "./MedicamentoDetalhado";
import {
  AlertTriangle,
  ChevronDown,
  Plus,
  Printer,
  Save,
  Trash2,
} from "lucide-react";
import "../styles/ReceitaCard.css";

export function ReceitaCard() {
  const location = useLocation();
  const prescriptionData = location.state?.prescriptionData;

  const [prescriptions, setPrescriptions] = useState();

  const [medicamentoExpandido, setMedicamentoExpandido] = useState(null);
  const [medicamentos, setMedicamentos] = useState([]);

  /*useEffect(() => {
    const fetchDados = async () => {
      try {
        const resposta = await fetch("http://localhost:8080/api/prescriptions");
        if (!resposta.ok) throw new Error("Erro ao buscar os dados");
        const json = await resposta.json();
        setPrescriptions(json);
      } catch (erro) {
        console.log(erro);
      }
    };
    fetchDados();
  }, []);
  */

  useEffect(() => {
    if (prescriptionData) {
      const medicamentosFormatados =
        prescriptionData.prescription.prescriptionMedications.map((med) => ({
          id: med.medication.medicationId,
          nome: med.medication.name,
          dosagem: med.dosage,
          frequencia: med.frequency,
          duracao: med.duration,
          observacoes: med.notes,
        }));

      setMedicamentos(medicamentosFormatados);
    } else {
      // Dados padrão caso não haja prescrição
      setMedicamentos([
        { id: 1, nome: "Amoxicilina" },
        { id: 2, nome: "Azitromicina" },
      ]);
    }
  }, [prescriptionData]);

  const body = {
    prescription: {
      prescriptionId: "cbb954a5-23f5-4fc7-b0df-1871fc3c5a02",
      user: {
        userId: "b00047d8-dbb5-439f-82e5-ce08b29735a2",
        name: "Dr. Alice",
        email: "alice@example.com",
        password: "hashed_password_1",
        role: "PEDIATRICIAN",
      },
      patientName: "John Doe",
      creationDate: "2025-03-12T19:17:02.7037629",
      prescriptionMedications: [
        {
          id: {
            prescriptionId: "cbb954a5-23f5-4fc7-b0df-1871fc3c5a02",
            medicationId: "ad9f9ed4-e5ee-49e1-8749-61bd4ce445c6",
          },
          medication: {
            medicationId: "ad9f9ed4-e5ee-49e1-8749-61bd4ce445c6",
            name: "Paracetamol",
            presentations: [],
          },
          notes: "Take after meal",
          dosage: 250.0,
          frequency: "every 8 hours",
          duration: 7,
        },
        {
          id: {
            prescriptionId: "cbb954a5-23f5-4fc7-b0df-1871fc3c5a02",
            medicationId: "1bfbebdd-1586-41b5-ae56-f6590c85c8b2",
          },
          medication: {
            medicationId: "1bfbebdd-1586-41b5-ae56-f6590c85c8b2",
            name: "Ibuprofeno",
            presentations: [],
          },
          notes: "Take before bedtime",
          dosage: 100.0,
          frequency: "once a day",
          duration: 5,
        },
      ],
    },
    interactions: [
      {
        medication1Id: "ad9f9ed4-e5ee-49e1-8749-61bd4ce445c6",
        medication1Name: "Paracetamol",
        medication2Id: "1bfbebdd-1586-41b5-ae56-f6590c85c8b2",
        medication2Name: "Ibuprofeno",
        description:
          "Paracetamol e Ibuprofeno não devem ser administrados juntos devido ao risco aumentado de efeitos adversos.",
      },
    ],
  };

  const [prescriptionMedications, setPrescriptionMedications] = useState(
    body.prescription.prescriptionMedications
  );

  const toggleMedicamento = (id) => {
    if (medicamentoExpandido === id) {
      setMedicamentoExpandido(null);
    } else {
      setMedicamentoExpandido(id);
    }
  };

  const adicionarMedicamento = () => {
    const novoId =
      medicamentos.length > 0
        ? Math.max(...medicamentos.map((m) => m.id)) + 1
        : 1;
    setMedicamentos([...medicamentos, { id: novoId, nome: "Paracetamol" }]);
  };

  const removerMedicamento = (id) => {
    setPrescriptionMedications(
      prescriptionMedications.filter((m) => m.medication.medicationId !== id)
    );
    if (medicamentoExpandido === id) {
      setMedicamentoExpandido(null);
    }
  };

  /*
  const medicamentoAtual = prescriptionMedications.find(
    (m) => m.medication.medicationId === medicamentoExpandido
  );
  */

  const medicamentoAtual = medicamentos.find(
    (m) => m.id === medicamentoExpandido
  );

  return (
    <main className="main-container">
      <div className="receita-container">
        <h1 className="receita-titulo">Receita</h1>

        {medicamentoExpandido !== null ? (
          <MedicamentoDetalhado
            medicamento={medicamentoAtual}
            onVoltar={() => setMedicamentoExpandido(null)}
            onRemover={() => removerMedicamento(medicamentoExpandido)}
          />
        ) : (
          <>
            {medicamentos.map((medicamento) => (
              <div key={medicamento.id} className="medicamento-item-container">
                <div className="medicamento-item">
                  <button
                    className="medicamento-botao"
                    onClick={() => toggleMedicamento(medicamento.id)}
                  >
                    <span className="medicamento-nome">{medicamento.nome}</span>
                    <ChevronDown className="icon" />
                  </button>
                </div>
                <button
                  className="medicamento-remover"
                  onClick={() => removerMedicamento(medicamento.id)}
                >
                  <Trash2 className="icon" />
                </button>
              </div>
            ))}

            <div className="alerta-container">
              <button className="alerta-botao">
                <AlertTriangle className="icon-alerta" />
              </button>
            </div>

            <button className="adicionar-botao" onClick={adicionarMedicamento}>
              <Plus className="icon-plus" />
            </button>

            <div className="acoes-container">
              <button className="acao-botao">
                <Printer className="icon-acao" />
                Imprimir
              </button>
              <button className="acao-botao">
                <Save className="icon-acao" />
                Salvar
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

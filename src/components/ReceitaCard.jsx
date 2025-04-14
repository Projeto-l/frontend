import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import MedicamentoDetalhado from "./MedicamentoDetalhado";
import {
  AlertTriangle,
  ChevronDown,
  Plus,
  Printer,
  Save,
  Trash2,
  User,
  FileText,
  ExternalLink,
} from "lucide-react";
import "../styles/ReceitaCard.css";

export function ReceitaCard() {
  const navigate = useNavigate();
  const { prescriptionId } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [interactions, setInteractions] = useState([]);

  const [medicamentoExpandido, setMedicamentoExpandido] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);

  const fetchPrescription = async () => {
    setIsLoading(true);
    try {
      const resposta = await fetch(
        `http://3.142.149.185:8080/api/prescriptions/${prescriptionId}`
      );
      if (!resposta.ok) throw new Error("Erro ao buscar os dados");
      const data = await resposta.json();
      console.log("Dados recebidos:", data);

      if (data.prescription) {
        setPrescription(data.prescription);
        setInteractions(data.interactions || []);
      }

      setError(null);
    } catch (erro) {
      console.error(erro);
      setError("Falha ao carregar os dados da receita");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (chrome) {
      chrome.storage.local.get(["isEditing"]).then((result) => {
        if (result.isEditing === true) {
          chrome.storage.local.set({ isEditing: false }).then(() => {
            navigate("/editor", { state: { prescription } });
          });
        }
      });
    }
  }, [prescription, navigate]);

  useEffect(() => {
    if (prescriptionId) {
      fetchPrescription();
    }
  }, [prescriptionId]);

  const toggleMedicamento = (id) => {
    if (medicamentoExpandido === id) {
      setMedicamentoExpandido(null);
    } else {
      setMedicamentoExpandido(id);
    }
  };

  const removerMedicamento = async (id) => {
    if (!prescription || !prescription.prescriptionMedications) return;

    try {
      setIsRemoving(true);

      const updatedPrescription = {
        ...prescription,
        prescriptionMedications: prescription.prescriptionMedications.filter(
          (m) => m.medication.medicationId !== id
        ),
      };

      setPrescription(updatedPrescription);

      if (medicamentoExpandido === id) {
        setMedicamentoExpandido(null);
      }

      await salvarReceita(updatedPrescription);

      console.log("Medicamento removido com sucesso");
    } catch (error) {
      console.error("Erro ao remover medicamento:", error);
      alert(`Erro ao remover medicamento: ${error.message}`);

      await fetchPrescription();
    } finally {
      setIsRemoving(false);
    }
  };

  const medicamentoAtual = prescription?.prescriptionMedications?.find(
    (m) => m.medication.medicationId === medicamentoExpandido
  );

  const getBulaUrl = (medicationName) => {
    const normalizedName = medicationName.toLowerCase().replace(/\s+/g, "-");
    return `https://consultas.anvisa.gov.br/#/bulario/q/?nomeProduto=${normalizedName}`;
  };

  const salvarMedicamento = async (medicamentoAtualizado) => {
    if (!prescription) return;

    try {
      setIsSaving(true);

      console.log("Medicamento a ser atualizado:", medicamentoAtualizado);

      if (!prescription.prescriptionMedications) {
        console.error("prescriptionMedications não está definido");
        return;
      }

      const updatedMedications = prescription.prescriptionMedications.map(
        (m) => {
          if (m.medication.medicationId === medicamentoAtualizado.id) {
            return {
              ...m,
              notes: medicamentoAtualizado.observacoes || "",
              dosage: Number.parseFloat(medicamentoAtualizado.dosagem) || 0,
              frequency: medicamentoAtualizado.frequencia || "",
              duration: Number.parseInt(medicamentoAtualizado.duracao) || 0,
              totalDose: medicamentoAtualizado.totalDose || 0,
              medication: {
                ...m.medication,
                name: medicamentoAtualizado.nome,
              },
            };
          }
          return m;
        }
      );

      const updatedPrescription = {
        ...prescription,
        prescriptionMedications: updatedMedications,
      };

      setPrescription(updatedPrescription);

      await salvarReceita(updatedPrescription);

      setMedicamentoExpandido(null);
    } catch (error) {
      console.error("Erro ao salvar medicamento:", error);
      alert(`Erro ao salvar medicamento: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const salvarReceita = async (prescriptionToSave = prescription) => {
    if (!prescriptionToSave) return;

    try {
      setIsSaving(true);

      const dataToSave = {
        userId: prescriptionToSave.user.userId,
        patientName: prescriptionToSave.patientName,
        items: prescriptionToSave.prescriptionMedications.map((med) => ({
          medicationId: med.medication.medicationId,
          notes: med.notes || "",
          dosage: med.dosage || 0,
          frequency: med.frequency || "",
          duration: med.duration || 0,
          totalDose: med.totalDose || 0,
        })),
      };

      const response = await fetch(
        `http://3.142.149.185:8080/api/prescriptions/${prescriptionToSave.prescriptionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSave),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao salvar: ${response.status}`);
      }

      const updatedData = await response.json();

      await fetchPrescription();
    } catch (error) {
      console.error("Erro ao salvar a receita:", error);
      alert(`Erro ao salvar a receita: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">Erro: {error}</div>;
  }

  if (!prescription) {
    return <div className="error">Nenhuma receita encontrada</div>;
  }

  return (
    <main className="card main-container">
      <div className="receita-container">
        <h1 className="receita-titulo">Receita</h1>

        <div className="patient-info">
          <User className="patient-icon" />
          <span className="patient-name">
            Paciente:{" "}
            <strong>{prescription.patientName || "Não especificado"}</strong>
          </span>
        </div>

        {medicamentoExpandido !== null && medicamentoAtual ? (
          <MedicamentoDetalhado
            medicamento={{
              id: medicamentoAtual.medication.medicationId || "",
              nome: medicamentoAtual.medication.name || "",
              observacoes: medicamentoAtual.notes || "",
              dosagem: medicamentoAtual.dosage?.toString() || "",
              frequencia: medicamentoAtual.frequency || "",
              duracao: medicamentoAtual.duration?.toString() || "",
              totalDose: medicamentoAtual.totalDose || 0,
            }}
            onVoltar={() => setMedicamentoExpandido(null)}
            onRemover={() => removerMedicamento(medicamentoExpandido)}
            onSave={salvarMedicamento}
          />
        ) : (
          <>
            {prescription.prescriptionMedications &&
            prescription.prescriptionMedications.length > 0 ? (
              prescription.prescriptionMedications.map((medicamento) => (
                <div
                  key={medicamento.medication.medicationId}
                  className="medicamento-item-container"
                >
                  <div className="medicamento-item">
                    <button
                      className="medicamento-botao"
                      onClick={() =>
                        toggleMedicamento(medicamento.medication.medicationId)
                      }
                    >
                      <span className="medicamento-nome">
                        {medicamento.medication.name || "Medicamento sem nome"}
                      </span>
                      <ChevronDown className="icon" />
                    </button>
                  </div>
                  <button
                    className="medicamento-remover"
                    onClick={() =>
                      removerMedicamento(medicamento.medication.medicationId)
                    }
                  >
                    <Trash2 className="icon" />
                  </button>
                </div>
              ))
            ) : (
              <div className="sem-medicamentos">
                Nenhum medicamento na receita
              </div>
            )}

            {interactions.length > 0 && (
              <div className="alerta-container">
                {interactions.map((interaction, index) => (
                  <div key={index} className="alerta-item">
                    <div className="alerta-icone">
                      <AlertTriangle className="icon-alerta" />
                    </div>
                    <div className="alerta-mensagem">
                      {interaction.description}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {prescription.prescriptionMedications &&
              prescription.prescriptionMedications.length > 0 && (
                <div className="bulas-container">
                  <h2 className="bulas-titulo">Bulas dos Medicamentos</h2>
                  <div className="bulas-grid">
                    {prescription.prescriptionMedications.map((medicamento) => {
                      const bulaUrl = getBulaUrl(medicamento.medication.name);

                      return (
                        <a
                          key={medicamento.medication.medicationId}
                          href={bulaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bula-card"
                        >
                          <div className="bula-icon">
                            <FileText className="icon-bula" />
                          </div>
                          <div className="bula-info">
                            <span className="bula-nome">
                              {medicamento.medication.name}
                            </span>
                            <span className="bula-link">
                              Ver bula <ExternalLink size={14} />
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

            <div className="acoes-container">
              <button 
                className="acao-botao"
                onClick={() => {
                  chrome.storage.local.set({ prescription: prescription }).then(() => {
                    chrome.runtime.sendMessage({ action: "openEditTab" });
                  });
                }}
              >
                <Printer className="icon-acao" />
                Imprimir
              </button>
              <button
                className="acao-botao"
                onClick={() => salvarReceita()}
                disabled={isSaving}
              >
                <Save className="icon-acao" />
                {isSaving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

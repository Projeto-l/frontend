"use client";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ClipboardPlus,
  ClipboardList,
  User,
  Calendar,
  Pill,
} from "lucide-react";
import AuthContext from "../context/AuthContext.jsx";

import "../styles/AdicionarReceitaCard.css";

export function AdicionarReceitaModal({
  onClose,
  medicamentoSelecionado,
  calculo,
  formEntries,
}) {
  const navigate = useNavigate();
  const [modalMode, setModalMode] = useState("options");
  const [existingPrescriptions, setExistingPrescriptions] = useState([]);
  const [isLoadingPrescriptions, setIsLoadingPrescriptions] = useState(false);

  const { user } = useContext(AuthContext);
  const user_obj = JSON.parse(user);
  const userId = user_obj.userId;

  async function fetchExistingPrescriptions() {
    setIsLoadingPrescriptions(true);
    try {
      const resposta = await fetch(
        "http://3.142.149.185:8080/api/prescriptions"
      );
      if (!resposta.ok) throw new Error("Erro ao buscar os dados");
      const prescriptions = await resposta.json();

      const userPrescriptions = prescriptions.filter(
        (prescription) => prescription.user.userId === userId
      );

      setExistingPrescriptions(userPrescriptions);
    } catch (error) {
      console.error("Erro ao buscar receitas existentes:", error);
    } finally {
      setIsLoadingPrescriptions(false);
    }
  }

  async function addToPrescriptions() {
    const { intervalo, dias, nome } = formEntries.values;
    if (!calculo) return;
    const numericDose = Number.parseFloat(calculo.replace(/[^\d.]/g, "")) || 0;
    const freqNumber = Number.parseFloat(intervalo) || 0;
    const totalDays = Number.parseInt(dias, 10) || 0;
    const totalDose = numericDose * (24 / freqNumber) * totalDays;

    const body = {
      userId: userId,
      patientName: nome,
      items: [
        {
          medicationId: medicamentoSelecionado?.medicationId || "",
          notes: "",
          dosage: numericDose,
          frequency: freqNumber,
          duration: totalDays,
          totalDose: totalDose,
        },
      ],
    };

    try {
      const response = await fetch(
        "http://3.142.149.185:8080/api/prescriptions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) throw new Error("Erro ao cadastrar receita");
      console.log("Prescrição cadastrada com sucesso!");
      onClose();
      navigate("/receitas");
    } catch (error) {
      console.error(error);
      console.log("Erro ao cadastrar a prescrição.");
    }
  }

  async function addToExistingPrescription(prescriptionId) {
    const { intervalo, dias } = formEntries.values;
    if (!calculo) return;
    const numericDose = Number.parseFloat(calculo.replace(/[^\d.]/g, "")) || 0;
    const freqNumber = Number.parseFloat(intervalo) || 0;
    const totalDays = Number.parseInt(dias, 10) || 0;
    const totalDose = numericDose * (24 / freqNumber) * totalDays;

    try {
      const medicationData = {
        medicationId: medicamentoSelecionado?.medicationId || "",
        notes: "",
        dosage: numericDose,
        frequency: freqNumber,
        duration: totalDays,
        totalDose: totalDose,
      };

      const response = await fetch(
        `http://3.142.149.185:8080/api/prescriptions/${prescriptionId}/medications`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(medicationData),
        }
      );

      if (!response.ok)
        throw new Error("Erro ao adicionar medicamento à receita");

      console.log("Medicamento adicionado à receita com sucesso!");
      onClose();
      navigate(`/receitas`);
    } catch (error) {
      console.error("Erro ao adicionar medicamento à receita:", error);
    }
  }

  // Format date from ISO string to DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const renderModalContent = () => {
    switch (modalMode) {
      case "options":
        return (
          <div className="card dias_tramento_modal">
            <h1>Adicionar à Receita</h1>
            <p className="modal-description">
              O que você deseja fazer com o medicamento calculado?
            </p>

            <div className="modal-options">
              <button
                className="modal-option-button"
                onClick={() => {
                  setModalMode("new");
                }}
              >
                <div className="modal-option-icon">
                  <ClipboardPlus size={24} className="text-primary" />
                </div>
                <div className="modal-option-text">
                  <h3>Nova receita</h3>
                  <p>Criar uma nova receita com este medicamento</p>
                </div>
                <ChevronRight className="modal-option-arrow" />
              </button>

              <button
                className="modal-option-button"
                onClick={() => {
                  setModalMode("existing");
                  fetchExistingPrescriptions();
                }}
              >
                <div className="modal-option-icon">
                  <ClipboardList size={24} className="text-primary" />
                </div>
                <div className="modal-option-text">
                  <h3>Receita existente</h3>
                  <p>Adicionar à uma receita já existente</p>
                </div>
                <ChevronRight className="modal-option-arrow" />
              </button>
            </div>

            <div className="buttons">
              <button className="cancelar" type="button" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </div>
        );

      case "new":
        return (
          <div className="card dias_tramento_modal">
            <h1>Nova Receita</h1>
            <label htmlFor="nome">Nome do Paciente</label>
            <div className="field">
              <input
                placeholder="Nome do Paciente"
                name="nome"
                id="nome"
                onChange={formEntries.handleChange}
                value={formEntries.values.nome}
              />
            </div>
            <h1>Duração</h1>
            <label htmlFor="dias">Dias de Tratamento</label>
            <div className="field">
              <input
                placeholder="Dias"
                name="dias"
                id="dias"
                onChange={formEntries.handleChange}
                value={formEntries.values.dias}
              />
            </div>
            <div className="buttons">
              <button
                className="cancelar"
                type="button"
                onClick={() => {
                  setModalMode("options");
                }}
              >
                Voltar
              </button>
              <button
                className="cancelar"
                type="button"
                onClick={addToPrescriptions}
                disabled={!formEntries.values.nome || !formEntries.values.dias}
              >
                Criar Receita
              </button>
            </div>
          </div>
        );

      case "existing":
        return (
          <div className="card dias_tramento_modal">
            <h1>Selecionar Receita</h1>
            <p className="modal-description">
              Selecione uma receita para adicionar o medicamento:
            </p>

            <div className="field">
              <label htmlFor="dias">Dias de Tratamento</label>
              <input
                placeholder="Quantidade de dias"
                name="dias"
                id="dias"
                onChange={formEntries.handleChange}
                value={formEntries.values.dias}
              />
            </div>

            <div className="existing-prescriptions">
              {isLoadingPrescriptions ? (
                <p className="loading-text">Carregando receitas...</p>
              ) : existingPrescriptions.length > 0 ? (
                <div className="prescriptions-list">
                  {existingPrescriptions.map((prescription) => (
                    <button
                      key={prescription.prescriptionId}
                      className="prescription-item"
                      onClick={() =>
                        addToExistingPrescription(prescription.prescriptionId)
                      }
                      disabled={!formEntries.values.dias}
                    >
                      <div className="prescription-icon">
                        <ClipboardList size={24} />
                      </div>
                      <div className="prescription-info">
                        <h3>
                          <span className="patient-icon">
                            <User size={16} />
                          </span>{" "}
                          {prescription.patientName}
                        </h3>
                        <div className="prescription-details">
                          <div className="medication-count">
                            <Pill size={12} className="pill-icon" />{" "}
                            {prescription.prescriptionMedications.length}{" "}
                            medicamento(s)
                          </div>
                          <div className="prescription-date">
                            <Calendar size={12} className="date-icon" />{" "}
                            {formatDate(prescription.creationDate)}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="prescription-arrow" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="no-prescriptions">Nenhuma receita encontrada</p>
              )}
            </div>

            <div className="buttons">
              <button
                className="cancelar"
                type="button"
                onClick={() => {
                  setModalMode("options");
                }}
              >
                Voltar
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="modal">{renderModalContent()}</div>;
}

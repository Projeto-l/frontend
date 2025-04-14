"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  ChevronUp,
  Check,
  Clock,
  Copy,
  Pill,
  Save,
  Trash2,
  Edit2,
} from "lucide-react";
import "../styles/MedicamentoDetalhado.css";

export default function MedicamentoDetalhado({
  medicamento,
  onVoltar,
  onRemover,
  onSave,
}) {
  const [copiedStates, setCopiedStates] = useState({
    dosagem: false,
    frequencia: false,
    duracao: false,
    instrucoes: false,
  });

  const [editingStates, setEditingStates] = useState({
    dosagem: false,
    frequencia: false,
    duracao: false,
    instrucoes: false,
  });

  const [editedValues, setEditedValues] = useState({
    dosagem: medicamento?.dosagem || "Não especificado",
    frequencia: medicamento?.frequencia || "Não especificado",
    duracao: medicamento?.duracao || "Não especificado",
    observacoes: medicamento?.observacoes || "",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (medicamento) {
      setEditedValues({
        dosagem: medicamento.dosagem || "Não especificado",
        frequencia: medicamento.frequencia || "Não especificado",
        duracao: medicamento.duracao || "Não especificado",
        observacoes: medicamento.observacoes || "",
      });
    }
  }, [medicamento]);

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedStates((prev) => ({
        ...prev,
        [field]: true,
      }));

      setTimeout(() => {
        setCopiedStates((prev) => ({
          ...prev,
          [field]: false,
        }));
      }, 2000);
    } catch (err) {
      console.error("Falha ao copiar texto:", err);
    }
  };

  const toggleEditing = (field) => {
    setEditingStates((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (field, value) => {
    setEditedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!medicamento) {
      console.error("Medicamento não definido");
      return;
    }

    try {
      setIsSaving(true);

      const updatedMedicamento = {
        ...medicamento,
        dosagem: editedValues.dosagem,
        frequencia: editedValues.frequencia,
        duracao: editedValues.duracao,
        observacoes: editedValues.observacoes,
        nome: medicamento.nome,
      };

      if (onSave) {
        await onSave(updatedMedicamento);
      }
    } catch (error) {
      console.error("Erro ao salvar o medicamento:", error);
      alert(`Erro ao salvar o medicamento: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const getUnitLabel = (field, value) => {
    if (field === "dosagem") {
      const numericPart = Number.parseFloat(value);
      if (isNaN(numericPart)) return "mg";
      return numericPart === 1 ? "mg" : "mg";
    } else if (field === "frequencia") {
      return "por dia";
    } else if (field === "duracao") {
      const numericPart = Number.parseFloat(value);
      if (isNaN(numericPart)) return "dias";
      return numericPart === 1 ? "dia" : "dias";
    }
    return "";
  };

  const renderValueWithUnit = (field, value) => {
    if (value === "Não especificado") return value;

    const unitLabel = getUnitLabel(field, value);
    return (
      <span className="value-container">
        <span className="value-text">{value}</span>{" "}
        <span className="unit-label">{unitLabel}</span>
      </span>
    );
  };

  if (!medicamento) {
    return <div className="erro">Medicamento não encontrado</div>;
  }

  return (
    <div className="medicamento-detalhado">
      <div className="medicamento-item-container">
        <div className="medicamento-item">
          <button className="medicamento-botao" onClick={onVoltar}>
            <span className="medicamento-nome">
              {medicamento.nome || "Medicamento"}
            </span>
            <ChevronUp className="icon" />
          </button>
        </div>
        <button className="medicamento-remover" onClick={onRemover}>
          <Trash2 className="icon" />
        </button>
      </div>

      <div className="detalhe-item">
        <div className="detalhe-icone">
          <Pill className="icon" />
        </div>
        <div className="detalhe-conteudo">
          <div className="detalhe-titulo">Dosagem</div>
          {editingStates.dosagem ? (
            <div className="input-with-unit">
              <input
                type="text"
                className="detalhe-input"
                value={editedValues.dosagem}
                onChange={(e) => handleInputChange("dosagem", e.target.value)}
                autoFocus
              />
              <span className="input-unit">mg</span>
            </div>
          ) : (
            <div className="detalhe-subtitulo">
              {renderValueWithUnit("dosagem", editedValues.dosagem)}
            </div>
          )}
        </div>

        <div className="detalhe-acoes">
          <button
            className="detalhe-editar"
            onClick={() => toggleEditing("dosagem")}
          >
            {editingStates.dosagem ? (
              <Check className="icon icon-success" />
            ) : (
              <Edit2 className="icon" />
            )}
          </button>
          <button
            className="detalhe-copiar"
            onClick={() => copyToClipboard(editedValues.dosagem, "dosagem")}
          >
            {copiedStates.dosagem ? (
              <Check className="icon icon-success" />
            ) : (
              <Copy className="icon" />
            )}
          </button>
        </div>
      </div>

      <div className="detalhe-item">
        <div className="detalhe-icone">
          <Clock className="icon" />
        </div>
        <div className="detalhe-conteudo">
          <div className="detalhe-titulo">Frequência</div>
          {editingStates.frequencia ? (
            <div className="input-with-unit">
              <input
                type="text"
                className="detalhe-input"
                value={editedValues.frequencia}
                onChange={(e) =>
                  handleInputChange("frequencia", e.target.value)
                }
                autoFocus
              />
              <span className="input-unit">por dia</span>
            </div>
          ) : (
            <div className="detalhe-subtitulo">
              {renderValueWithUnit("frequencia", editedValues.frequencia)}
            </div>
          )}
        </div>
        <div className="detalhe-acoes">
          <button
            className="detalhe-editar"
            onClick={() => toggleEditing("frequencia")}
          >
            {editingStates.frequencia ? (
              <Check className="icon icon-success" />
            ) : (
              <Edit2 className="icon" />
            )}
          </button>
          <button
            className="detalhe-copiar"
            onClick={() =>
              copyToClipboard(editedValues.frequencia, "frequencia")
            }
          >
            {copiedStates.frequencia ? (
              <Check className="icon icon-success" />
            ) : (
              <Copy className="icon" />
            )}
          </button>
        </div>
      </div>

      <div className="detalhe-item">
        <div className="detalhe-icone">
          <Calendar className="icon" />
        </div>
        <div className="detalhe-conteudo">
          <div className="detalhe-titulo">Duração</div>
          {editingStates.duracao ? (
            <div className="input-with-unit">
              <input
                type="text"
                className="detalhe-input"
                value={editedValues.duracao}
                onChange={(e) => handleInputChange("duracao", e.target.value)}
                autoFocus
              />
              <span className="input-unit">dias</span>
            </div>
          ) : (
            <div className="detalhe-subtitulo">
              {renderValueWithUnit("duracao", editedValues.duracao)}
            </div>
          )}
        </div>
        <div className="detalhe-acoes">
          <button
            className="detalhe-editar"
            onClick={() => toggleEditing("duracao")}
          >
            {editingStates.duracao ? (
              <Check className="icon icon-success" />
            ) : (
              <Edit2 className="icon" />
            )}
          </button>
          <button
            className="detalhe-copiar"
            onClick={() => copyToClipboard(editedValues.duracao, "duracao")}
          >
            {copiedStates.duracao ? (
              <Check className="icon icon-success" />
            ) : (
              <Copy className="icon" />
            )}
          </button>
        </div>
      </div>

      <div className="notas-container">
        <div className="notas-titulo">Notas</div>
        <div className="notas-conteudo">
          <div className="notas-label">Instruções</div>
          {editingStates.instrucoes ? (
            <textarea
              className="notas-textarea"
              rows={3}
              value={editedValues.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              autoFocus
            ></textarea>
          ) : (
            <div className="notas-texto">
              {editedValues.observacoes || "Não especificado"}
            </div>
          )}
          <div className="notas-acoes">
            <button
              className="notas-editar"
              onClick={() => toggleEditing("instrucoes")}
            >
              {editingStates.instrucoes ? (
                <Check className="icon icon-success" />
              ) : (
                <Edit2 className="icon" />
              )}
            </button>
            <button
              className="notas-copiar"
              onClick={() =>
                copyToClipboard(editedValues.observacoes, "instrucoes")
              }
            >
              {copiedStates.instrucoes ? (
                <Check className="icon icon-success" />
              ) : (
                <Copy className="icon" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="acoes-container">
        <button className="acao-botao" onClick={onVoltar}>
          <ArrowLeft className="icon-acao" />
          Voltar para receita
        </button>
        <button className="acao-botao" onClick={handleSave} disabled={isSaving}>
          <Save className="icon-acao" />
          {isSaving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}

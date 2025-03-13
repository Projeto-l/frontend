import React, { useState } from "react";
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
} from "lucide-react";
import "../styles/MedicamentoDetalhado.css";

export default function MedicamentoDetalhado({
  medicamento,
  onVoltar,
  onRemover,
}) {
  const [copiedStates, setCopiedStates] = useState({
    dosagem: false,
    frequencia: false,
    duracao: false,
    instrucoes: false,
  });

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

  const detalhes = {
    dosagem: "4 gotas (100mg)",
    frequencia: "Uma vez por dia",
    duracao: "30 dias",
  };

  return (
    <div className="medicamento-detalhado">
      <div className="medicamento-item-container">
        <div className="medicamento-item">
          <button className="medicamento-botao" onClick={onVoltar}>
            <span className="medicamento-nome">
              {medicamento ? medicamento.nome : "Paracetamol"}
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
          <div className="detalhe-subtitulo">{detalhes.dosagem}</div>
        </div>
        <button
          className="detalhe-copiar"
          onClick={() => copyToClipboard(detalhes.dosagem, "dosagem")}
        >
          {copiedStates.dosagem ? (
            <Check className="icon icon-success" />
          ) : (
            <Copy className="icon" />
          )}
        </button>
      </div>

      <div className="detalhe-item">
        <div className="detalhe-icone">
          <Clock className="icon" />
        </div>
        <div className="detalhe-conteudo">
          <div className="detalhe-titulo">Frequência</div>
          <div className="detalhe-subtitulo">{detalhes.frequencia}</div>
        </div>
        <button
          className="detalhe-copiar"
          onClick={() => copyToClipboard(detalhes.frequencia, "frequencia")}
        >
          {copiedStates.frequencia ? (
            <Check className="icon icon-success" />
          ) : (
            <Copy className="icon" />
          )}
        </button>
      </div>

      <div className="detalhe-item">
        <div className="detalhe-icone">
          <Calendar className="icon" />
        </div>
        <div className="detalhe-conteudo">
          <div className="detalhe-titulo">Duração</div>
          <div className="detalhe-subtitulo">{detalhes.duracao}</div>
        </div>
        <button
          className="detalhe-copiar"
          onClick={() => copyToClipboard(detalhes.duracao, "duracao")}
        >
          {copiedStates.duracao ? (
            <Check className="icon icon-success" />
          ) : (
            <Copy className="icon" />
          )}
        </button>
      </div>

      <div className="notas-container">
        <div className="notas-titulo">Notas</div>
        <div className="notas-conteudo">
          <div className="notas-label">Instruções</div>
          <textarea
            className="notas-textarea"
            rows={3}
            id="instrucoes"
          ></textarea>
          <div className="notas-acoes">
            <button
              className="notas-copiar"
              onClick={() => {
                const texto = document.getElementById("instrucoes").value;
                copyToClipboard(texto, "instrucoes");
              }}
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
        <button className="acao-botao">
          <Save className="icon-acao" />
          Salvar
        </button>
      </div>
    </div>
  );
}

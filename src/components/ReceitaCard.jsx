import { useState } from "react";
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
  const [medicamentos, setMedicamentos] = useState([
    { id: 1, nome: "Amoxicilina" },
    { id: 2, nome: "Azitromicina" },
  ]);

  const [medicamentoExpandido, setMedicamentoExpandido] = useState(null);

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
    setMedicamentos(medicamentos.filter((m) => m.id !== id));
    if (medicamentoExpandido === id) {
      setMedicamentoExpandido(null);
    }
  };

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

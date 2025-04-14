import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./Icons"; // Ajustar se necessário
import AuthContext from "../context/AuthContext.jsx";
import "../styles/CadastroCard.css";
import "../styles/Geral.css";
import "../styles/CadastroReceita.css"; // CSS adicional

export function CadastroReceitaCard() {
  const { user } = useContext(AuthContext);
  const user_obj = JSON.parse(user);
  const userId = user_obj.userId;

  const navigate = useNavigate();

  // Lista de medicamentos retornados pela API
  const [medications, setMedications] = useState([]);

  // Campo para o nome do paciente
  const [patientName, setPatientName] = useState("");

  // Array de itens (cada item = um medicamento na receita)
  const [items, setItems] = useState([
    {
      medicationId: "",
      dosage: "",
      frequency: "",
      duration: "",
      notes: "",
    },
  ]);

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // Busca lista de medicamentos
  useEffect(() => {
    async function fetchMedications() {
      try {
        const response = await fetch("http://3.142.149.185:8080/api/medications");
        const data = await response.json();
        console.log("Medicamentos retornados:", data);
        setMedications(data);
      } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
      }
    }
    fetchMedications();
  }, []);

  // Atualiza o nome do paciente
  function handlePatientNameChange(e) {
    setPatientName(e.target.value);
  }

  // Atualiza um item específico
  function handleItemChange(index, event) {
    const { name, value } = event.target;
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = {
        ...newItems[index],
        [name]: value,
      };
      return newItems;
    });
  }

  // Adiciona novo item ao array
  function handleAddItem() {
    setItems((prevItems) => [
      ...prevItems,
      {
        medicationId: "",
        dosage: "",
        frequency: "",
        duration: "",
        notes: "",
      },
    ]);
  }

  // Remove item do array
  function handleRemoveItem(index) {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }

  // Validação simples
  function validate() {
    const newErrors = {};

    if (!patientName.trim()) {
      newErrors.patientName = "Informe o nome do paciente";
    }
    items.forEach((item, idx) => {
      if (!item.medicationId) {
        newErrors[`med-${idx}-medicationId`] = "Selecione um medicamento";
      }
      if (!item.dosage) {
        newErrors[`med-${idx}-dosage`] = "Informe a dosagem";
      }
      if (!item.frequency) {
        newErrors[`med-${idx}-frequency`] = "Informe a frequência em horas";
      }
      if (!item.duration) {
        newErrors[`med-${idx}-duration`] = "Informe a duração em dias";
      }
    });
    return newErrors;
  }

  // Submete formulário
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Calcula totalDose para cada item
    const finalItems = items.map((item) => {
      const dosageNum = parseFloat(item.dosage) || 0;
      const frequencyNum = parseFloat(item.frequency) || 0;
      const durationNum = parseFloat(item.duration) || 0;

      // totalDose = dosage * (frequency / 24) * duration
      const totalDoseCalc = dosageNum * (frequencyNum / 24) * durationNum;

      return {
        medicationId: item.medicationId,
        dosage: dosageNum,
        frequency: item.frequency,
        duration: durationNum,
        notes: item.notes,
        totalDose: totalDoseCalc,
      };
    });

    const payload = {
      userId: userId,
      patientName,
      items: finalItems,
    };

    console.log("Enviando payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch("http://3.142.149.185:8080/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("Status da resposta:", response.status);

      let data;
      try {
        data = await response.json();
      } catch {
        data = { error: "Não foi possível transformar a resposta em JSON" };
      }
      console.log("Resposta da API:", data);

      if (!response.ok) {
        setSubmitError(
          `Erro ao cadastrar a receita: ${response.status} - ${data?.message || response.statusText
          }`
        );
        return;
      }

      console.log("Receita cadastrada com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro de conexão ao cadastrar a receita:", error);
      setSubmitError("Erro de conexão. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="cadastro-page">
      <form
        className="card form_card prescription-container"
        onSubmit={handleSubmit}
      >
        <div className="content">
          <h1>Cadastro de Receita</h1>

          {submitError && (
            <div className="error">
              <Icon name="error" />
              <p>{submitError}</p>
            </div>
          )}

          {errors.patientName && (
            <div className="error">
              <Icon name="error" />
              <p>{errors.patientName}</p>
            </div>
          )}
          {patientName && <label>Nome do Paciente</label>}
          <div className="field">
            <input
              type="text"
              placeholder="Nome do Paciente"
              name="patientName"
              value={patientName}
              onChange={handlePatientNameChange}
            />
          </div>

          {/* Lista de itens (medicamentos) */}
          <div className="items-list">
            {items.map((item, index) => (
              <div className="item-card" key={index}>
                <h2>Medicamento {index + 1}</h2>

                {/* Botão de remover item (ícone X) */}
                {items.length > 1 && (
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <Icon name="close" />
                  </button>
                )}

                {/* Erros específicos desse item */}
                {errors[`med-${index}-medicationId`] && (
                  <div className="error">
                    <Icon name="error" />
                    <p>{errors[`med-${index}-medicationId`]}</p>
                  </div>
                )}
                <label>Nome do Medicamento</label>
                <div className="field">
                  <select
                    name="medicationId"
                    value={item.medicationId}
                    onChange={(e) => handleItemChange(index, e)}
                  >
                    <option value="">Selecione um medicamento</option>
                    {medications.map((med) => (
                      <option key={med.medicationId} value={med.medicationId}>
                        {med.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dosagem */}
                {errors[`med-${index}-dosage`] && (
                  <div className="error">
                    <Icon name="error" />
                    <p>{errors[`med-${index}-dosage`]}</p>
                  </div>
                )}
                <label>Dosagem (mg, ml...)</label>
                <div className="field">
                  <input
                    type="number"
                    placeholder="Dosagem"
                    name="dosage"
                    value={item.dosage}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>

                {/* Frequência */}
                {errors[`med-${index}-frequency`] && (
                  <div className="error">
                    <Icon name="error" />
                    <p>{errors[`med-${index}-frequency`]}</p>
                  </div>
                )}
                <label>Frequência (horas)</label>
                <div className="field">
                  <input
                    type="number"
                    placeholder="Ex: 8 (a cada 8 horas)"
                    name="frequency"
                    value={item.frequency}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>

                {/* Duração */}
                {errors[`med-${index}-duration`] && (
                  <div className="error">
                    <Icon name="error" />
                    <p>{errors[`med-${index}-duration`]}</p>
                  </div>
                )}
                <label>Duração (dias)</label>
                <div className="field">
                  <input
                    type="number"
                    placeholder="Quantidade de dias"
                    name="duration"
                    value={item.duration}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>

                {/* Observações */}
                <label>Observações</label>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Ex: Tomar após as refeições"
                    name="notes"
                    value={item.notes}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Botão de adicionar mais um item (ícone "+") */}
          <div className="add-item" onClick={handleAddItem}>
            <Icon name="add" />
          </div>

          {/* Botões finais */}
          <div className="buttons">
            <button
              className="cancelar"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button className="cadastrar" type="submit">
              Cadastrar Receita
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

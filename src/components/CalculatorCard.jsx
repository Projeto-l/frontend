import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';
import { Copy } from "lucide-react"; // Import extra se necessário
import '../styles/Calculator.css';

export function CalculatorCard(props) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [medicamentos, setMedicamentos] = useState([]);
    const [medicamentoSelecionado, setMedicamentoSelecionado] = useState(null);
    const [apresentacoes, setApresentacoes] = useState([]);
    const [apresentacaoSelecionada, setApresentacaoSelecionada] = useState(null);
    const [calculo, setCalculo] = useState("");
    const [showDuracao, setShowDuracao] = useState(false);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const resposta = await fetch("http://3.142.149.185:8080/api/medications");
                if (!resposta.ok) throw new Error("Erro ao buscar os dados");
                const json = await resposta.json();
                setMedicamentos(json);
            } catch (erro) {
                console.log(erro);
            }
        };
        fetchDados();
    }, []);

    useEffect(() => {
        formEntries.setValues({
            medicamento: props.data?.medicamento || '',
            apresentacao: props.data?.apresentacao || '',
            tipoDose: props.data?.tipoDose || '',
            dose: props.data?.dose || '',
            peso: props.data?.peso || '',
            intervalo: props.data?.intervalo || '',
            dias: props.data?.dias || '',
            nome: props.data?.nome || '',
        });
    }, [props.data]);

    function useFormEntries({ initialValues }) {
        const [values, setValues] = useState(initialValues);
        function handleChange(event) {
            const fieldName = event.target.getAttribute('name');
            const value = event.target.value;
            setValues({
                ...values,
                [fieldName]: value,
            });
        }
        return { values, handleChange, setValues };
    }

    const formEntries = useFormEntries({
        initialValues: {
            medicamento: '',
            apresentacao: '',
            tipoDose: '',
            dose: '',
            peso: '',
            intervalo: '',
            dias: '',
            nome: '',
        }
    });

    function formatPresentationLabel(ap) {
        if (ap.mgPerTablet) {
            return `Comprimido - ${ap.mgPerTablet} mg`;
        } else if (ap.mgPerMl && ap.mlPerDrop) {
            return `Gotas - ${ap.mgPerMl} mg/mL, ${ap.mlPerDrop} mL/gota`;
        } else if (ap.mgPerMl) {
            return `Suspensão oral - ${ap.mgPerMl} mg/mL`;
        }
        return 'Apresentação desconhecida';
    }

    function handleMedicamentoChange(e) {
        const selectedId = e.target.value;
        const medicamento = medicamentos.find((m) => m.medicationId === selectedId);
        if (!medicamento) {
            console.error("Nenhum medicamento encontrado para o ID:", selectedId);
            return;
        }
        setMedicamentoSelecionado(medicamento);
        setApresentacoes(medicamento.presentations || []);
        if (medicamento.defaultDosePerAdministration != null) {
            formEntries.setValues(prev => ({
                ...prev,
                medicamento: 'mgKgDose',
                dose: medicamento.defaultDosePerAdministration
            }));
        } else if (medicamento.defaultDosePerDay != null) {
            formEntries.setValues(prev => ({
                ...prev,
                medicamento: 'mgKgDia',
                dose: medicamento.defaultDosePerDay
            }));
        } else {
            formEntries.setValues(prev => ({
                ...prev,
                medicamento: '',
                dose: ''
            }));
        }
    }

    function handleApresentacaoChange(e) {
        const apresentacao = apresentacoes.find((a) => a.idPresentation === e.target.value);
        setApresentacaoSelecionada(apresentacao);
    }

    function handleTipoDoseChange(e) {
        formEntries.handleChange(e);
        const novoValor = e.target.value;
        if (!medicamentoSelecionado) return;
        if (novoValor === 'mgKgDose') {
            if (medicamentoSelecionado.defaultDosePerAdministration != null) {
                formEntries.setValues(prev => ({
                    ...prev,
                    dose: medicamentoSelecionado.defaultDosePerAdministration
                }));
            } else {
                formEntries.setValues(prev => ({
                    ...prev,
                    dose: ''
                }));
            }
        } else if (novoValor === 'mgKgDia') {
            if (medicamentoSelecionado.defaultDosePerDay != null) {
                formEntries.setValues(prev => ({
                    ...prev,
                    dose: medicamentoSelecionado.defaultDosePerDay
                }));
            } else {
                formEntries.setValues(prev => ({
                    ...prev,
                    dose: ''
                }));
            }
        }
    }

    function toggleFavorito() {
        if (!apresentacaoSelecionada) return;
        setApresentacaoSelecionada((prev) => ({
            ...prev,
            ehFavorito: prev.ehFavorito === "false" ? "true" : "false"
        }));
    }

    async function calculate() {
        const values = formEntries.values;
        if (!medicamentoSelecionado || !apresentacaoSelecionada || !values.dose) {
            setCalculo("Erro: Medicamento, apresentação ou dose não selecionados.");
            return;
        }
        let calculationType = '';
        if (values.medicamento === 'mgKgDose') {
            calculationType = 'mg/kg/dose';
        } else if (values.medicamento === 'mgKgDia') {
            calculationType = 'mg/kg/day';
        }
        const payload = {
            medicationId: medicamentoSelecionado.medicationId,
            presentationId: apresentacaoSelecionada.idPresentation,
            calculationType,
            standardDose: Number(values.dose),
            weight: values.peso ? Number(values.peso) : null,
            interval: values.intervalo ? Number(values.intervalo) : null
        };
        try {
            const response = await fetch("http://3.142.149.185:8080/api/dose-calculation", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error("Erro na API de cálculo");
            }
            const json = await response.json();
            const mgTotal = json.calculatedDose;
            let textoFinal = '';
            if (apresentacaoSelecionada.mgPerTablet) {
                const comprimidos = mgTotal / apresentacaoSelecionada.mgPerTablet;
                textoFinal = `Dose: ${comprimidos.toFixed(2)} comprimidos`;
            } else if (apresentacaoSelecionada.mgPerMl && apresentacaoSelecionada.mlPerDrop) {
                const volume = mgTotal / apresentacaoSelecionada.mgPerMl;
                const gotas = volume / apresentacaoSelecionada.mlPerDrop;
                textoFinal = `Dose: ${gotas.toFixed(2)} gotas`;
            } else if (apresentacaoSelecionada.mgPerMl) {
                const volume = mgTotal / apresentacaoSelecionada.mgPerMl;
                textoFinal = `Dose: ${volume.toFixed(2)} mL`;
            } else {
                textoFinal = `Dose: ${mgTotal.toFixed(2)} mg`;
            }
            setCalculo(textoFinal);

            saveCalculation(medicamentoSelecionado, apresentacaoSelecionada, values, textoFinal);

        } catch (error) {
            console.error("Erro ao calcular a dose:", error);
            setCalculo("Erro ao calcular a dose");
        }
    }

    function isCalculateDisabled() {
        const { medicamento, dose, peso, intervalo } = formEntries.values;
        if (!medicamentoSelecionado || !apresentacaoSelecionada || !medicamento) {
            return true;
        }
        if (!dose) return true;
        if (medicamento === 'mgKgDia' && (!peso || !intervalo)) {
            return true;
        }
        return false;
    }

    const buttonCalcularClass = `calcular${!isCalculateDisabled() ? ' ativo' : ''}`;

    function handleSubmit(event) {
        event.preventDefault();
        formEntries.handleChange(event);
        const errorsList = {};
        setErrors(errorsList);
        if (Object.keys(errorsList).length !== 0) {
            return null;
        }
    }

    function addDuracao() {
        setShowDuracao(true);
    }

    // [NOVO] Faz o POST para /api/prescriptions com o medicamento calculado
    async function addToPrescriptions() {
        const { intervalo, dias, nome } = formEntries.values;
        if (!calculo) return;
        const numericDose = parseFloat(calculo.replace(/[^\d.]/g, '')) || 0;
        const freqNumber = parseFloat(intervalo) || 0;
        const totalDays = parseInt(dias, 10) || 0;
        const totalDose = numericDose * (24 / freqNumber) * totalDays;

        const body = {
            userId: "1b9d1712-48a6-4a18-80fa-096d5fd2aaff",
            patientName: nome,
            items: [
                {
                    medicationId: medicamentoSelecionado?.medicationId || "",
                    notes: "",
                    dosage: numericDose,
                    frequency: `a cada ${freqNumber} horas`,
                    duration: totalDays,
                    totalDose: totalDose
                }
            ]
        };

        try {
            const response = await fetch("http://3.142.149.185:8080/api/prescriptions", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error("Erro ao cadastrar a prescrição");
            }
            console.log("Prescrição cadastrada com sucesso!", response);
            setShowDuracao(false);
            navigate('/receitas');
        } catch (error) {
            console.error(error);
            console.log("Erro ao cadastrar a prescrição.");
        }
    }

    function copyToClipBoard() {
        navigator.clipboard.writeText(calculo);
        alert('Resultado copiado para a área de transferência!');
    }

    function saveCalculation(medicamentoSelecionado, apresentacaoSelecionada, values, textoFinal) {
        const calculoData = {
            type: "calculo",
            date: new Date().toLocaleDateString("pt-BR"),
            time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
            medications: [{
                medication: {
                    name: medicamentoSelecionado.name
                },
                details: formatPresentationLabel(apresentacaoSelecionada),
                dosage: textoFinal,
                schedule: values.intervalo ? `a cada ${values.intervalo} horas` : null
            }]
        };

        const calculosExistentes = JSON.parse(localStorage.getItem('calculos') || '[]');
        
        calculosExistentes.unshift(calculoData);

        const calculosLimitados = calculosExistentes.slice(0, 5);

        localStorage.setItem('calculos', JSON.stringify(calculosLimitados));
    }

    return (
        <div className="cadastro-page">
            <form method="post" className="card form_card" onSubmit={handleSubmit}>
                <div className="content">
                    <h1>Calculadora</h1>
                    {medicamentos.length > 0 ? (
                        <select onChange={handleMedicamentoChange} defaultValue="">
                            <option value="" disabled>Escolha um medicamento</option>
                            {medicamentos.map((med) => (
                                <option key={med.medicationId} value={med.medicationId}>
                                    {med.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>Carregando medicamentos...</p>
                    )}
                    {medicamentoSelecionado && (
                        <>
                            <label htmlFor="">apresentacao</label>
                            <div className="select-apresentacao-fav">
                                <select onChange={handleApresentacaoChange} defaultValue="">
                                    <option value="" disabled>Escolha uma apresentação</option>
                                    {apresentacoes.map((ap, index) => (
                                        <option key={ap.idPresentation || index} value={ap.idPresentation}>
                                            {formatPresentationLabel(ap)}
                                        </option>
                                    ))}
                                </select>
                                {apresentacaoSelecionada && (
                                    <button
                                        style={{
                                            marginLeft: "10px",
                                            fontSize: "20px",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                        onClick={toggleFavorito}
                                        type="button"
                                    >
                                        {apresentacaoSelecionada.ehFavorito === "true" ? (
                                            <Icon name="heart_filled" />
                                        ) : (
                                            <Icon name="heart" />
                                        )}
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                    <fieldset>
                        <label htmlFor="">Tipo de dose</label>
                        {errors.tipoDose && (
                            <div className="error">
                                <Icon name="error" />
                                <p>{errors.tipoDose}</p>
                            </div>
                        )}
                        <div className="radio-container">
                            <input
                                type="radio"
                                id="mgKgDose"
                                name="medicamento"
                                value="mgKgDose"
                                onClick={handleTipoDoseChange}
                                checked={formEntries.values.medicamento === "mgKgDose"}
                            />
                            <label htmlFor="mgKgDose">mg/kg/dose</label>
                            <span className="radio"></span>
                            <Icon name="check" />
                        </div>
                        <div className="radio-container">
                            <input
                                type="radio"
                                id="mgKgDia"
                                name="medicamento"
                                value="mgKgDia"
                                onClick={handleTipoDoseChange}
                                checked={formEntries.values.medicamento === "mgKgDia"}
                            />
                            <label htmlFor="mgKgDia">mg/kg/dia</label>
                            <span className="radio"></span>
                            <Icon name="check" />
                        </div>
                    </fieldset>
                    {errors.dose && (
                        <div className="error">
                            <Icon name="error" />
                            <p>{errors.dose}</p>
                        </div>
                    )}
                    <label htmlFor="">Dose</label>
                    <div className="field">
                        <input
                            placeholder="Dose"
                            name="dose"
                            id="dose"
                            onChange={formEntries.handleChange}
                            value={formEntries.values.dose}
                        />
                    </div>
                    {errors.peso && (
                        <div className="error">
                            <Icon name="error" />
                            <p>{errors.peso}</p>
                        </div>
                    )}
                    <label htmlFor="">Peso</label>
                    <div className="field">
                        <input
                            placeholder="Peso"
                            name="peso"
                            id="peso"
                            onChange={formEntries.handleChange}
                            value={formEntries.values.peso}
                        />
                    </div>
                    {errors.intervalo && (
                        <div className="error">
                            <Icon name="error" />
                            <p>{errors.intervalo}</p>
                        </div>
                    )}
                    <label htmlFor="">Intervalo</label>
                    <div className="field">
                        <input
                            placeholder="Intervalo"
                            name="intervalo"
                            id="intervalo"
                            onChange={formEntries.handleChange}
                            value={formEntries.values.intervalo}
                        />
                    </div>
                    {calculo && (
                        <div className="result_calculate">
                            <div className="result">
                                <p>{calculo}</p>
                                <button onClick={copyToClipBoard}>
                                    <Icon name="copy"></Icon>
                                </button>
                            </div>
                            <button
                                className="cancelar"
                                type="button"
                                onClick={calculate}
                            >
                                Calcular
                            </button>
                        </div>
                    )}
                    {errors.calculo && (
                        <div className="error">
                            <Icon name="error" />
                            <p>{errors.calculo}</p>
                        </div>
                    )}
                    <div className="buttons">
                        <button
                            className="cancelar"
                            type="button"
                            onClick={() => navigate('/')}
                        >
                            Cancelar
                        </button>
                        {(!calculo &&
                            <button
                                className={buttonCalcularClass}
                                type="button"
                                onClick={calculate}
                                disabled={isCalculateDisabled()}
                            >
                                Calcular
                            </button>
                        )}
                        {calculo && (
                            <button
                                className="cancelar"
                                type="button"
                                onClick={addDuracao}
                            >
                                Adicionar à receita
                            </button>
                        )}
                    </div>
                    {showDuracao && (
                        <div className="modal">
                            <div className="card dias_tramento_modal">
                                <h1>Paciente</h1>
                                <label htmlFor="dias">Nome</label>
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
                                        onClick={() => { setShowDuracao(false) }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="cancelar"
                                        type="button"
                                        onClick={addToPrescriptions}
                                        disabled={isCalculateDisabled()}
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

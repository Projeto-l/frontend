
import { useEffect, useState } from 'react';
import { Icon } from '../components/Icons';
import '../styles/Calculator.css'

export function CalculatorCard(props) {

    const [errors, setErrors] = useState({});
    const [medicamentos, setMedicamentos] = useState([]);
    const [medicamentoSelecionado, setMedicamentoSelecionado] = useState(null);
    const [apresentacaoSelecionada, setApresentacaoSelecionada] = useState(null);
    const [calculo, setCalculo] = useState(null);

    
    useEffect(() => {
        console.log(medicamentoSelecionado);
    }, [medicamentoSelecionado]);

    useEffect(() => {
        const fetchDados = async () => {
          try {
            const resposta = await fetch("http://localhost:5000/medicamentos");
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
            apresetacao: props.data?.apresentacao || '',
            tipoDose: props.data?.tipoDose || '',
            dose: props.data?.dose || '',
            peso: props.data?.peso || '',
            intervalo: props.data?.intervalo || '',
        });
    }, [props.data]);

    const useFormEntries = ({ initialValues }) => {
        const [values, setValues] = useState(initialValues);

        function handleChange(event) {
            const fieldName = event.target.getAttribute('name');
            const value = event.target.value;
            setValues({
                ...values,
                [fieldName]: value,
            });
        };

        // usado para verificar os valores
        // useEffect(() => {
        //     console.log(values);
        // }, [values]);

        return { values, handleChange, setValues };
    };

    const formEntries = useFormEntries({
        initialValues: {
            medicamento: props.data?.medicamento || '',
            apresetacao: props.data?.apresentacao || '',
            tipoDose: props.data?.tipoDose || '',
            dose: props.data?.dose || '',
            peso: props.data?.peso || '',
            intervalo: props.data?.intervalo || '',
        }
    });
    
    const handleSubmit = (event) => {
        event.preventDefault();
        formEntries.handleChange(event);
        const errorsList = {}//validate(formEntries.values);
        setErrors(errorsList);

        if (Object.keys(errorsList).length !== 0) { //se houverem erros nos campos
            return null;
        } else {
            submitToApi(event);
        }
    }

    const submitToApi = async (event) => {
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const url = `${import.meta.env.VITE_API_URL}/auth/register`;
            const response = await fetch(url, {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const json = await response.json();
            console.log(json);

            if (response.ok) {
                console.log('Post enviado com sucesso!');
                window.location.href = "/login";
            } else {
                console.error('Email ou telefone já cadastrados', response.statusText);
                setErrors({ registro: 'Email ou telefone já cadastrados' });
            }
        } catch (error) {
            console.error('Erro ao enviar o post:', error);
        }
        // enviar para o back
    };

    const handleMedicamentoChange = (e) => {
        console.log("Lista de medicamentos:", medicamentos);
        console.log("Valor selecionado:", e.target.value);
      
        const medicamento = medicamentos.find((m) => m.id === String(e.target.value));
      
        if (!medicamento) {
          console.error("Nenhum medicamento encontrado para o ID:", e.target.value);
          return;
        }
      
        setMedicamentoSelecionado(medicamento);
        setApresentacoes(medicamento.apresentacoes || []);
    };

    const handleApresentacaoChange = (e) => {
      const apresentacao = medicamentoSelecionado.apresentacoes.find((a) => a.dosagem === e.target.value);
      setApresentacaoSelecionada(apresentacao);
    };

    const toggleFavorito = () => {
        if (!apresentacaoSelecionada) return;
        setApresentacaoSelecionada((prev) => ({
          ...prev,
          ehFavorito: prev.ehFavorito === "false" ? "true" : "false"
        }));
      };

    const calculate = () => {
        console.log(formEntries.values);
        const values = formEntries.values;
        // if (!values.peso || !values.dosePorKg || !values.tipoDose ) return null;
      
        const doseTotal = Number(values.peso) * Number(values.dose); // Cálculo base da dose em mg

        // console.log(doseTotal);

        let retorno = `${doseTotal} mg (unidade desconhecida)`;
      
        if (apresentacaoSelecionada.forma_farmaceutica.includes("Suspensão oral")) {
          // Suspensão: precisa dividir pela concentração (mg/mL)
          const concentracao = Number(apresentacaoSelecionada.dosagem.split("mg/")[0]); // Exemplo: "200mg/5mL" → 200
          const volume = Number(apresentacaoSelecionada.dosagem.split("/")[1].replace("mL", "")); // Exemplo: "200mg/5mL" → 5
          const doseEmMl = (doseTotal * volume) / concentracao;
          retorno = `${doseEmMl.toFixed(2)} mL`;
        } 
        
        if (apresentacaoSelecionada.forma_farmaceutica.includes("Comprimido")) {
          // Comprimidos: divide pela dosagem do comprimido (mg/unidade)
          const dosagemComprimido = Number(apresentacaoSelecionada.dosagem.replace("mg", ""));
          const quantidadeComprimidos = doseTotal / dosagemComprimido;
          retorno = `${quantidadeComprimidos.toFixed(2)} comprimidos`;
        }

        setCalculo(retorno);
      };
      
      

    return (
        <div className="cadastro-page">
            <form method="post" className="card cadastro-card" onSubmit={handleSubmit}>
                <div className="content">
                    <h1>Calculadora</h1>
                    {medicamentos.length > 0 ? (
                    <select onChange={handleMedicamentoChange} defaultValue="">
                        <option value="" disabled>Escolha um medicamento</option>
                        {medicamentos.map((med) => (
                        <option key={med.id} value={med.id}>{med.nome}</option>
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
                                    {medicamentoSelecionado.apresentacoes.map((apresentacao, index) => (
                                    <option key={index} value={apresentacao.dosagem}>
                                        {apresentacao.dosagem} - {apresentacao.forma_farmaceutica}
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
                                    >
                                    {apresentacaoSelecionada.ehFavorito === "true" ?
                                     <Icon name="heart_filled"></Icon> : 
                                     <Icon name="heart"></Icon>}
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                    <fieldset>
                        <label htmlFor="">Tipo de dose</label>
                        {errors.tipoDose &&
                            <div className="error">
                                <Icon name="error"></Icon>
                                <p>{errors.tipoDose}</p>
                            </div>
                        }
                        <div className="radio-container">
                            <input disabled={props.onlyView ? true : undefined} type="radio" id="mgKgDose" name="medicamento" value="mgKgDose" onClick={formEntries.handleChange} checked={formEntries.values.medicamento === "mgKgDose"} />
                            <label htmlFor="mgKgDose">mg/kg/dose</label>
                            <span className="radio"></span>
                            <Icon name="check"></Icon>
                        </div>
                        <div className="radio-container">
                            <input disabled={props.onlyView ? true : undefined} type="radio" id="mgKgDia" name="medicamento" value="mgKgDia" onClick={formEntries.handleChange} checked={formEntries.values.medicamento === "mgKgDia"} />
                            <label htmlFor="mgKgDia">mg/kg/dia</label>
                            <span className="radio"></span>
                            <Icon name="check"></Icon>
                        </div>
                    </fieldset>
                    {errors.dose &&
                        <div className="error">
                            <Icon name="error"></Icon>
                            <p>{errors.dose}</p>
                        </div>
                    }
                    <label htmlFor="">Dose</label>
                    {!props.onlyView &&
                        <div className="field">
                            <input disabled={props.onlyView ? true : undefined} placeholder="Dose" name="dose" id="dose" onChange={formEntries.handleChange} value={formEntries.values.dose} />
                        </div>}
                    {errors.peso &&
                        <div className="error">
                            <Icon name="error"></Icon>
                            <p>{errors.peso}</p>
                        </div>
                    }
                    <label htmlFor="">Peso</label>
                    <div className="field">
                        <input disabled={props.onlyView ? true : undefined} placeholder="Peso" name="peso" id="peso" onChange={formEntries.handleChange} value={formEntries.values.peso} />
                    </div>
                    {errors.intervalo &&
                        <div className="error">
                            <Icon name="error"></Icon>
                            <p>{errors.intervalo}</p>
                        </div>
                    }
                    <label htmlFor="">Intervalo</label>
                    <div className="field">
                        <input disabled={props.onlyView ? true : undefined} placeholder="Intervalo" name="intervalo" id="intervalo" onChange={formEntries.handleChange} value={formEntries.values.intervalo} />
                    </div>

                    
                  { calculo &&
                    <div className="field">
                        <input disabled={true} placeholder="calculo" name="calculo" id="calculo" value={calculo} />
                    </div>
                    }

                    {errors.calculo &&
                        <div className="error">
                            <Icon name="error"></Icon>
                            <p>{errors.calculo}</p>
                        </div>
                    }
                    {!props.onlyView &&
                        <div className="buttons">
                            <button className="cancelar" onClick={() => navigate('/')}>Cancelar</button>
                            <button className="calcular" onClick={calculate}>Calcular</button>
                        </div>}
                </div>
            </form>
        </div>
    )
}
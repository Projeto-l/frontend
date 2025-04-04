import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/EditorReceita.css';
import { useLocation } from 'react-router-dom';

export function EditorReceita() {
  const location = useLocation();

  const [conteudo, setConteudo] = useState('');
  const [medicamentos, setMedicamentos] = useState(
    location.state?.medicamentos || [
      { id: 1, nome: "Amoxicilina" },
      { id: 2, nome: "Azitromicina" },
    ]
  );

  const gerarTextoInicial = () => {
    let texto = '<h2>Receita Médica</h2>';
    texto += '<p>Data: ' + new Date().toLocaleDateString() + '</p>';
    texto += '<h3>Medicamentos Prescritos:</h3>';
    texto += '<ul>';

    medicamentos.forEach(med => {
      texto += `<li>${med.nome}`;
      if (med.dosagem) texto += ` - Dosagem: ${med.dosagem}`;
      if (med.frequencia) texto += ` - Frequência: ${med.frequencia}`;
      if (med.duracao) texto += ` - Duração: ${med.duracao} dias`;
      if (med.observacoes) texto += ` - Observações: ${med.observacoes}`;
      texto += '</li>';
    });

    texto += '</ul>';
    return texto;
  };

  useEffect(() => {
    if (chrome) {
      chrome.storage.local.get(['medicamentosParaEditar']).then((result) => {
        if (result.medicamentosParaEditar) {
          console.log(result.medicamentosParaEditar);
          setMedicamentos(result.medicamentosParaEditar);
          chrome.storage.local.remove('medicamentosParaEditar');
        }
      });
      chrome.storage.local.set({ isEditing: false });
    }
  }, []);

  useEffect(() => {
    setConteudo(gerarTextoInicial());
  }, [medicamentos])

  const handleChange = (conteudo) => {
    setConteudo(conteudo);
  };

  const printDiv = () => {
    let specific_element = document.querySelector(".ql-container").innerHTML;
    let original_elements = document.body.innerHTML;

    document.body.innerHTML = specific_element;
    window.print();
    document.body.innerHTML = original_elements;
  }

  return (
    <div className="card form_card">
      <div className="editor-header">
        <h1>Editor de Receita</h1>
        <button className="imprimir-botao" onClick={() => printDiv()}>
          Imprimir
        </button>
      </div>
      <div className="editor-content">
        <ReactQuill
          value={conteudo}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['clean'],
              ['image'],
              ['blockquote', 'code-block'],
              [{ 'align': [] }]
            ]
          }}
        />
      </div>
    </div>
  );
} 
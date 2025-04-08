import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/EditorReceita.css';
import { useLocation } from 'react-router-dom';

export function EditorReceita() {
  const location = useLocation();

  const [conteudo, setConteudo] = useState('');
  const [prescricao, setPrescricao] = useState(location.state?.prescription);

  const gerarTextoInicial = () => {
    let texto = '<h2>Receita Médica</h2>';
    texto += '<p>Data: ' + new Date().toLocaleDateString() + '</p>';
    texto += '<h3>Medicamentos Prescritos:</h3>';
    texto += '<ul>';

    if (prescricao && Array.isArray(prescricao)) {
      prescricao.forEach(med => {
        texto += `<li>${med.medication.name} <ul>`;
        if (med.dosage) texto += `<li> Dosagem: ${med.dosage}</li>`;
        if (med.frequency) texto += `<li> Frequência: ${med.frequency}</li>`;
        if (med.duration) texto += `<li> Duração: ${med.duration} dias</li>`;
        if (med.notes) texto += `<li> Observações: ${med.notes}</li>`;
        texto += '</ul></li>';
      });
    } else {
      texto += '<li>Nenhum medicamento prescrito</li>';
    }

    texto += '</ul>';
    return texto;
  };

  useEffect(() => {
    if (chrome) {
      chrome.storage.local.get(['prescription']).then((result) => {
        if (result.prescription) {
          setPrescricao(result.prescription.prescriptionMedications);
          chrome.storage.local.remove('prescription');
        }
      });
      chrome.storage.local.set({ isEditing: false });
    }
  }, []);

  useEffect(() => {
    setConteudo(gerarTextoInicial());
  }, [prescricao])

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
    <div className="card form_card editor_card">
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
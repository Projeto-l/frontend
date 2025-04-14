import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { RecentItem } from "./RecentItem.jsx";
import "../styles/RecentCard.css";

export function ReceitasCard() {
  const navigate = useNavigate();

  const formatDate = (creationDate) => {
    const dateObj = new Date(creationDate);

    const date = dateObj.toLocaleDateString("pt-BR");

    return date;
  };

  const formatTime = (creationTime) => {
    const dateObj = new Date(creationTime);

    const time = dateObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
  };

  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const resposta = await fetch("http://3.142.149.185:8080/api/prescriptions");
        if (!resposta.ok) throw new Error("Erro ao buscar os dados");
        const json = await resposta.json();
        setPrescriptions(json);
      } catch (erro) {
        console.log(erro);
      }
    };
    fetchDados();
  }, []);

  const handlePrescriptionClick = (prescriptionId) => {
    navigate(`/receita/${prescriptionId}`);
  };

  return (
    <div className="recent-card">
      <h2 className="recent-card-title">Recentes</h2>
      <div className="recent-items-container">
        {prescriptions.reverse().map((prescription, index) => (
          <RecentItem
            key={prescription.prescriptionId}
            type="receita"
            date={formatDate(prescription.creationDate)}
            time={formatTime(prescription.creationDate)}
            medications={prescription.prescriptionMedications}
            patientName={prescription.patientName}
            onClick={() => handlePrescriptionClick(prescription.prescriptionId)}
          />
        ))}
      </div>
    </div>
  );
}

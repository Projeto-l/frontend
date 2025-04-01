import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RecentItem } from "./RecentItem.jsx";
import "../styles/RecentCard.css";

export function ReceitasCard() {
  const navigate = useNavigate();

  const body = [
    {
      prescription: {
        prescriptionId: "cbb954a5-23f5-4fc7-b0df-1871fc3c5a02",
        user: {
          userId: "b00047d8-dbb5-439f-82e5-ce08b29735a2",
          name: "Dr. Alice",
          email: "alice@example.com",
          password: "hashed_password_1",
          role: "PEDIATRICIAN",
        },
        patientName: "John Doe",
        creationDate: "2025-03-12T19:17:02.7037629",
        prescriptionMedications: [
          {
            id: {
              prescriptionId: "cbb954a5-23f5-4fc7-b0df-1871fc3c5a02",
              medicationId: "ad9f9ed4-e5ee-49e1-8749-61bd4ce445c6",
            },
            medication: {
              medicationId: "ad9f9ed4-e5ee-49e1-8749-61bd4ce445c6",
              name: "Paracetamol",
              presentations: [],
            },
            notes: "Take after meal",
            dosage: 250.0,
            frequency: "every 8 hours",
            duration: 7,
          },
          {
            id: {
              prescriptionId: "cbb954a5-23f5-4fc7-b0df-1871fc3c5a02",
              medicationId: "1bfbebdd-1586-41b5-ae56-f6590c85c8b2",
            },
            medication: {
              medicationId: "1bfbebdd-1586-41b5-ae56-f6590c85c8b2",
              name: "Ibuprofeno",
              presentations: [],
            },
            notes: "Take before bedtime",
            dosage: 100.0,
            frequency: "once a day",
            duration: 5,
          },
        ],
      },
      interactions: [
        {
          medication1Id: "ad9f9ed4-e5ee-49e1-8749-61bd4ce445c6",
          medication1Name: "Paracetamol",
          medication2Id: "1bfbebdd-1586-41b5-ae56-f6590c85c8b2",
          medication2Name: "Ibuprofeno",
          description:
            "Paracetamol e Ibuprofeno não devem ser administrados juntos devido ao risco aumentado de efeitos adversos.",
        },
      ],
    },
  ];

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

  const [prescriptions, setPrescriptions] = useState(body);

  /*
    useEffect(() => {
        const fetchDados = async () => {
            try {
                const resposta = await fetch("http://localhost:8080/api/prescriptions");
                if (!resposta.ok) throw new Error("Erro ao buscar os dados");
                const json = await resposta.json();
                setPrescriptions(json);
            } catch (erro) {
                console.log(erro);
            }
        };
        fetchDados();
    }, []);
  */

  const handlePrescriptionClick = (prescriptionData) => {
    navigate("/receita", {
      state: { prescriptionData },
    });
  };

  return (
    <div className="recent-card">
      <h2 className="recent-card-title">Recentes</h2>
      <div className="recent-items-container">
        {prescriptions.map((prescription, index) => (
          <RecentItem
            key={prescription.prescription.prescriptionId}
            type="receita"
            date={formatDate(prescription.prescription.creationDate)}
            time={formatTime(prescription.prescription.creationDate)}
            medications={prescription.prescription.prescriptionMedications}
            onClick={() => handlePrescriptionClick(prescription)}
          />
        ))}
      </div>
    </div>
  );
}

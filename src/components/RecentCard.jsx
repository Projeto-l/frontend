import React, { useState, useEffect, useContext } from "react";
import { RecentItem } from "./RecentItem.jsx";
import AuthContext from "../context/AuthContext.jsx";
import "../styles/RecentCard.css";

export function RecentCard() {
  const { user } = useContext(AuthContext);
  const user_obj = JSON.parse(user);
  const userId = user_obj.userId;

  const [items, setItems] = useState([]);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("pt-BR");
  };

  const formatTime = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const parseDateString = (dateStr, timeStr) => {
    const [day, month, year] = dateStr.split('/');
    const formattedDate = `${year}-${month}-${day}`;
    return new Date(`${formattedDate}T${timeStr}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://3.142.149.185:8080/api/prescriptions");
        if (!response.ok) throw new Error("Erro ao buscar receitas");
        const prescriptions = await response.json();

        const receitasFormatadas = prescriptions.map(prescription => ({
          type: "receita",
          date: formatDate(prescription.creationDate),
          time: formatTime(prescription.creationDate),
          medications: prescription.prescriptionMedications,
          patientName: prescription.patientName,
          timestamp: new Date(prescription.creationDate).getTime(),
          userId: prescription.user.userId
        }));

        const calculos = JSON.parse(localStorage.getItem('calculos') || '[]');
        
        const calculosComTimestamp = calculos.map(calculo => ({
          ...calculo,
          timestamp: parseDateString(calculo.date, calculo.time).getTime()
        }));

        const todosItens = [...receitasFormatadas, ...calculosComTimestamp];
        todosItens.sort((a, b) => b.timestamp - a.timestamp);

        const itensLimitados = todosItens.slice(0, 5);
        
        setItems(itensLimitados);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="recent-card">
      <h2 className="recent-card-title">Recentes</h2>
      <div className="recent-items-container">
        {items.filter(item => item.userId === userId).map((item, index) => (
          <RecentItem
            key={index}
            type={item.type}
            date={item.date}
            time={item.time}
            medications={item.medications}
            patientName={item.patientName}
          />
        ))}
      </div>
    </div>
  );
}

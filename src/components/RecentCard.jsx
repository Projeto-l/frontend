import React from "react";
import { RecentItem } from "./RecentItem.jsx";
import "../styles/RecentCard.css";

export function RecentCard() {
  return (
    <div className="recent-card">
      <h2 className="recent-card-title">Recentes</h2>
      <div className="recent-items-container">
        <RecentItem
          type="calculo"
          date="10/05/2025"
          time="15:42"
          medications={[
            {
              medication: {
                name: "Amoxicilina",
              },
              details: "Suspensão oral 250mg/ml",
              dosage: "2ml",
              schedule: "8/8 horas",
            },
          ]}
        />

        <RecentItem
          type="calculo"
          date="10/05/2025"
          time="15:42"
          medications={[
            {
              medication: {
                name: "Amoxicilina",
              },
              details: "Suspensão oral 250mg/ml",
              dosage: "2ml",
              schedule: "8/8 horas",
            },
          ]}
        />

        <RecentItem
          type="receita"
          date="10/05/2025"
          time="15:42"
          medications={[
            {
              medication: {
                name: "Amoxicilina",
              },
              duration: "7",
            },
            {
              medication: {
                name: "Paracetamol",
              },
              duration: "2",
            },
          ]}
        />
      </div>
    </div>
  );
}

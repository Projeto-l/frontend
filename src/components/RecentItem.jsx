import React from "react";
import { Icon } from "./Icons";
import "../styles/RecentItem.css";

export function RecentItem({
  type,
  date,
  time,
  medications,
  patientName,
  onClick,
}) {
  return (
    <div
      className="recent-item"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div>
        {type === "calculo" && (
          <div className="tag">
            <Icon name="calculator"></Icon>
            <span>Calculo</span>
          </div>
        )}
        {type === "receita" && (
          <div className="tag">
            <Icon name="prescription"></Icon>
            <span>Receita</span>
          </div>
        )}
      </div>
      <div className="recent-item-date">
        <span className="recent-item-date-bold">
          {date} {""}
        </span>
        <span className="recent-item-date-normal">{time}</span>
      </div>

      {patientName && (
        <div className="patient-name">
          <span className="patient-label">Paciente: </span>
          <span className="patient-value">{patientName}</span>
        </div>
      )}

      {medications.map((medication, index) => (
        <React.Fragment key={index}>
          <div className="medication-name">{medication.medication.name}</div>

          {medication.details && (
            <div className="medication-details">
              <span>{medication.details}</span>
              {medication.dosage && (
                <>
                  <br />
                  <span>{medication.dosage}</span>
                </>
              )}
            </div>
          )}

          {medication.schedule && (
            <div className="medication-time-info">
              <Icon name="alarm"></Icon>
              <span>{medication.schedule}</span>
            </div>
          )}

          {medication.duration && (
            <div className="medication-time-info">
              <Icon name="date_range"></Icon>
              <span>{medication.duration} dias</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

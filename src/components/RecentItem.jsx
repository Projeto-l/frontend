import React from "react";
import { Icon } from "./Icons";
import "../styles/RecentItem.css";

export function RecentItem({ type, date, time, medications }) {
    return (
        <div className="recent-item">
            <div>
                {type === "calculo" &&
                    <div className="tag">
                        <Icon name="calculator"></Icon>
                        <span>Calculo</span>
                    </div>
                }
                {type === "receita" &&
                    <div className="tag">
                        <Icon name="prescription"></Icon>
                        <span>Receita</span>
                    </div>
                }
            </div>
            <div className="recent-item-date">
                <span className="recent-item-date-bold">{date} {""}</span>
                <span className="recent-item-date-normal">{time}</span>
            </div>

            {medications.map((medication, index) => (
                <React.Fragment key={index}>
                    <div className="medication-name">
                        {medication.name}
                    </div>

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
                            <span>{medication.duration}</span>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

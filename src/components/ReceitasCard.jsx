import React from "react";
import { RecentItem } from "./RecentItem.jsx";
import "../styles/RecentCard.css";

export function ReceitasCard() {
    return (
        <div className="recent-card">
            <h2 className="recent-card-title">
                Recentes
            </h2>
            <div className="recent-items-container">
                <RecentItem
                    date="10/05/2025"
                    time="15:42"
                    medications={[
                        {
                            name: "Amoxicilina",
                            duration: "7 dias",
                        },
                        {
                            name: "Paracetamol",
                            duration: "2 dias",
                        },
                    ]}
                />
            </div>
        </div>
    );
};
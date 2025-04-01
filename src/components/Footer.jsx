import '../styles/Footer.css'
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import { Icon } from '../components/Icons';

export function Footer(props) {
    // const { user, logout } = useContext(AuthContext);
    const [enabled, setEnabled] = useState(false);
    const [tabMode, setTabMode] = useState(true);

    useEffect(() => {
        if (chrome && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.get(['enabled'], (result) => {
                setEnabled(result.enabled || false);
            });
        }
        setTabMode(isTabMode());
    }, []);

    const isTabMode = () => {
        if (chrome) {
            var retorno = false;
            if (chrome.extension.getViews({ type: "popup" }).length === 0) {
                retorno = true;
            }
            return retorno;
        }
    };

    const toggleEnabled = () => {
        const newEnabled = !enabled;
        setEnabled(newEnabled);

        if (chrome && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set({ enabled: newEnabled });

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0] && tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, { enabled: newEnabled });
                }
            });
        }
    };

    return (
        (!tabMode &&
            <div className="container">
                <span>Colar Fácil</span>
                <span className="help_button">
                    <Icon name="help"></Icon>
                </span>
                <span className="help_text">Adiciona um botão ao lado dos campos de entrada para facilitar a colagem de texto.</span>
                <div className="toggle-switch">
                    <input
                        type="checkbox"
                        id="toggle"
                        checked={enabled}
                        onChange={toggleEnabled}
                    />
                    <label htmlFor="toggle" className="switch"></label>
                </div>
            </div>)
    );

}


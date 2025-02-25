import '../styles/Menu.css'
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext'

export function Menu() {
    // const { user, logout } = useContext(AuthContext);

    const openInNewTab = () => {
        chrome.runtime.sendMessage({ action: "openTab" });
    };

    return (
        <nav className={``}>
            <menu>
                <button onClick={openInNewTab}>Abrir em Aba</button>
            </menu>
        </nav>
    )

}


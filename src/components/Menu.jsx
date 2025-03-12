import '../styles/Menu.css'
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import { Icon } from '../components/Icons';

export function Menu(props) {
    // const { user, logout } = useContext(AuthContext);

    const openInNewTab = () => {
        chrome.runtime.sendMessage({ action: "openTab" });
    };

    const navigate = useNavigate();
    
    const handleNavigation = () => {
        navigate("/"); // Altere para a rota desejada
    };

    return (
        <nav className={``}>
            <menu>
                { props.isHome &&          
                    <button onClick={openInNewTab}>Abrir em Aba</button>
                }
                {
                    !props.isHome &&
                    <button className="back" onClick={handleNavigation}><Icon name="back"></Icon></button>
                }
            </menu>
        </nav>
    )

}


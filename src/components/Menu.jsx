import '../styles/Menu.css'
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import { Icon } from '../components/Icons';

export function Menu(props) {
    // const { user, logout } = useContext(AuthContext);
    const [tabMode, setTabMode] = useState(false);

    useEffect(() => {
        setTabMode(isTabMode());
    }, []);

    const isTabMode = () => {
        var retorno = false;
        if (chrome.extension.getViews({ type: "popup" }).length === 0) {
            retorno = true;
        }
        return retorno;
    };

    const navigate = useNavigate();
    
    const handleNavigation = () => {
        localStorage.setItem("formData", "");
        navigate("/");
    };

    const openInNewTab = () => {
        chrome.runtime.sendMessage({ action: "openTab" });
    };

    const backToPopup = () => {
        chrome.runtime.sendMessage({ action: "openPopup" });
        window.close();
    };

    return (
        <nav className={``}>
            <menu>
                <div className="header_wr">
                    { !props.isHome &&
                        <button className="back" onClick={handleNavigation}><Icon name="back"></Icon></button>
                    }
                    <span>Med<span>Com</span></span>
                    { tabMode === true ? (
                            <button className="change_mode" onClick={backToPopup}><Icon name="close_full_screen"></Icon></button>
                        ) : (
                            <button className="change_mode" onClick={openInNewTab}><Icon name="open_full_screen"></Icon></button>
                        )
                    }
                </div>
            </menu>
        </nav>
    )

}


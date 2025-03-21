import React from "react";
import '../styles/Home.css'
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from '../components/Footer.jsx';
import { RecentCard } from "../components/RecentCard.jsx";

const Home = () => {

    const navigate = useNavigate();

    const navigateTo = (path) =>{
        console.log(path);
        navigate(path);
    }

    return (
        <div className="home">
            <Header isHome={true}></Header>
            <div className="menu-card">
                <h2 className="menu-card-title">
                    Menu
                </h2>
                <div className="menu-buttons-container">
                    <button className="menu-button" onClick={() => {navigateTo("/calculator")}} >
                        <Icon name="calculator"></Icon>
                        <span>Calculadora</span>
                    </button>
                    <button className="menu-button" onClick={() => {navigateTo("/receita")}} >
                        <Icon name="prescription"></Icon>
                        <span>Nova Receita</span>
                    </button>
                    <button className="menu-button" onClick={() => {navigateTo("/receitas")}} >
                        <Icon name="prescriptions"></Icon>
                        <span>Receitas</span>
                    </button>
                </div>
            </div>
            <RecentCard />
            <Footer></Footer>
        </div>
    );
};

export default Home;

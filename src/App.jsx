import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


import SaveRoute from './utils/SaveRoute.jsx';
import RestoreRoute from './utils/RestoreRoute.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Receita from "./pages/Receita.jsx";
import Calculator from './pages/Calculator.jsx';
import CadastroReceita from "./pages/CadastroReceita.jsx";

function App() {  
  const location = useLocation();

  useEffect(() => {
    const lastRoute = localStorage.getItem("lastRoute");

    if (lastRoute && lastRoute !== location.pathname) {
      localStorage.removeItem("formData");
      alert("Dados do formulário removidos ao mudar de rota");      
    }
    
  }, [location.pathname]);
  return (
    <>
      <RestoreRoute/>
      <SaveRoute/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/receita" element={<Receita />} />
          <Route path="/calculator" element={<Calculator/>}/>
          <Route path="/cadastroReceita" element={<CadastroReceita/>}/>
      </Routes>
    </>
  )
}

export default App;

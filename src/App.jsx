import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./routes/PrivateRoute";

import SaveRoute from "./utils/SaveRoute.jsx";
import RestoreRoute from "./utils/RestoreRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Receita from "./pages/Receita.jsx";
import Receitas from "./pages/Receitas.jsx";
import Calculator from "./pages/Calculator.jsx";
import CadastroReceita from "./pages/CadastroReceita.jsx";
import Editor from "./pages/Editor.jsx";
import Perfil from "./pages/Perfil.jsx";

function App() {
  const location = useLocation();
  const [tabMode, setTabMode] = useState(false);

  useEffect(() => {
    setTabMode(isTabMode());
    const lastRoute = localStorage.getItem("lastRoute");

    if (lastRoute && lastRoute !== location.pathname) {
      localStorage.removeItem("formData");
      alert("Dados do formulário removidos ao mudar de rota");
    }
  }, [location.pathname]);

  const isTabMode = () => {
    if (chrome) {
      var retorno = false;
      if (chrome.extension.getViews({ type: "popup" }).length > 0) {
        retorno = true;
      }
      return retorno;
    }
  };

  return (
    <>
      <RestoreRoute />
      <SaveRoute />
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home tabMode={tabMode} />} />
            <Route path="/receita" element={<Receita tabMode={tabMode} />} />
            <Route
              path="/receita/:prescriptionId"
              element={<Receita tabMode={tabMode} />}
            />
            <Route path="/receitas" element={<Receitas tabMode={tabMode} />} />
            <Route
              path="/calculator"
              element={<Calculator tabMode={tabMode} />}
            />
            <Route
              path="/cadastroReceita"
              element={<CadastroReceita tabMode={tabMode} />}
            />
            <Route path="/editor" element={<Editor tabMode={tabMode} />} />
            <Route
              path="/perfil"
              element={<Perfil tabMode={tabMode} />}
            ></Route>
          </Route>
          <Route path="/login" element={<Login tabMode={tabMode} />} />
          <Route path="/register" element={<Register tabMode={tabMode} />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

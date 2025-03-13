import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HashRouter } from "react-router-dom";

import SaveRoute from './utils/SaveRoute.jsx';
import RestoreRoute from './utils/RestoreRoute.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Calculator from './pages/Calculator.jsx';

function App() {

  return (
    <>
      <RestoreRoute/>
      <SaveRoute/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/calculator" element={<Calculator/>}/>
      </Routes>
    </>
  )
}

export default App

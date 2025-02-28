import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header.jsx';

const Home = () => {
  return (
    <div>
      <h1>Página Inicial</h1>
      <Header isHome={true}></Header>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Registrar</Link>
          </li>
          <li>
            <Link to="/calculator">Calculator</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
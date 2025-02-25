import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header.jsx';

const Home = () => {
  return (
    <div>
      <h1>Página Inicial</h1>
      <Header></Header>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Registrar</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
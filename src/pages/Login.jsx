
import React, { useEffect } from "react";
import '../styles/Login.css';
import '../styles/Geral.css';
import { useState, useContext } from "react";
import { Icon } from "../components/Icons.jsx";
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header.jsx';
// import fakeLoginApi from '../components/fakeAuthApi';
// import AuthContext from "../context/AuthContext.jsx";

const Login = () => {

  const [errors, setErrors] = useState({})
//   const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    var savedData = localStorage.getItem("formData");
    if (savedData) {
      savedData = JSON.parse(savedData);
      formEntries.setValues({
          email: savedData.email,
          senha: savedData.senha,
      });
    }
  }, []);

  const useFormEntries = ({ initialValues }) => {
    const [values, setValues] = useState(initialValues);

    function handleChange(event) {
      const fieldName = event.target.getAttribute('name');
      const value = event.target.value;
      setValues({
        ...values,
        [fieldName]: value,
      });
    };

    useEffect(() => {
      localStorage.setItem("formData", JSON.stringify(values));
    }, [values]);

    return { values, handleChange, setValues };
  };

  const formEntries = useFormEntries({
    initialValues: {
      email: '',
      senha: ''
    }
  });

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors])

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Insira um email';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Insira um email válido';
    }
    if (values.senha === '') {
      errors.senha = 'Insira uma senha';
    }

    return errors;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    formEntries.handleChange(event);
    const errorsList = validate(formEntries.values);
    setErrors(errorsList);

    if (Object.keys(errorsList).length !== 0) { //se houverem erros nos campos
      return null;
    } else {
      submitToApi(event);
    }
    setErrors(null); // Limpa os erros antes de nova tentativa
  };

  const submitToApi = async () => {
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/login`;
      const response = await fetch(url, {
        method: 'PUT',
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (response.ok) {
        // login(json);  // Chama a função login com o token fake
        console.log('Post enviado com sucesso!');
        window.location.href = "/";
      } else {
        console.error('Email ou senha incorretos:', response.statusText);
        setErrors({ login: 'Email ou senha incorretos' });
      }
    } catch (error) {
      console.error('Erro ao enviar o post:', error);
    }
    // enviar para o back
  };

  return (
    <div className="page">
      <div className="content">
        <Header isHome={false}></Header>
        <div className="loginPage">
          <div className="card form_card LoginCard">
            <form onSubmit={handleSubmit} className="LoginForm">
              <h2>Login</h2>
              <div className="FormGroup">
                { errors && errors.login &&
                  <div className="error">
                    <Icon name="error"></Icon>
                    <p>{errors.login}</p>
                  </div>
                }
                { errors && errors.email &&
                  <div className="error">
                    <Icon name="error"></Icon>
                    <p>{errors.email}</p>
                  </div>
                }
                <div className="field">
                  <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M226-262q59-39.666 121-60.833T480-344q71 0 133.333 21.167Q675.667-301.666 734.667-262q41-49.667 59.833-103.667 18.834-54 18.834-114.333 0-141-96.167-237.167T480-813.334q-141 0-237.167 96.167T146.666-480q0 60.333 19.167 114.333T226-262Zm253.876-184.667q-58.209 0-98.043-39.957Q342-526.581 342-584.791q0-58.209 39.957-98.042 39.958-39.834 98.167-39.834t98.043 39.958Q618-642.752 618-584.543q0 58.21-39.957 98.043-39.958 39.833-98.167 39.833ZM479.73-80q-83.097 0-156.183-31.5t-127.15-85.833q-54.064-54.334-85.23-127.227Q80-397.454 80-480.333q0-82.88 31.5-155.773Q143-709 197.333-763q54.334-54 127.227-85.5Q397.454-880 480.333-880q82.88 0 155.773 31.5Q709-817 763-763t85.5 127Q880-563 880-480.177q0 82.822-31.5 155.666T763-197.333Q709-143 635.914-111.5T479.73-80Z" /></svg>
                  <input
                    id="email"
                    name="email"
                    value={formEntries.values.email}
                    onChange={formEntries.handleChange}
                    placeholder="Email"
                    className="WithIcon"
                  />
                </div>
              </div>
              <div className="FormGroup">
                { errors && errors.senha &&
                  <div className="error">
                    <Icon name="error"></Icon>
                    <p>{errors.senha}</p>
                  </div>
                }
                <div className="field">
                  <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M280-354q52.667 0 89.333-36.667Q406-427.333 406-480t-36.667-89.333Q332.667-606 280-606t-89.333 36.667Q154-532.667 154-480t36.667 89.333Q227.333-354 280-354Zm0 114q-100 0-170-70T40-480q0-100 70-170t170-70q83.667 0 142.167 46.333 58.5 46.334 81.833 117h341l75 75L788.667-331l-102-82.334L604-330.667l-74-74h-26q-21 74-82.667 119.334Q359.667-240 280-240Z" /></svg>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={formEntries.values.senha}
                    onChange={formEntries.handleChange}
                    placeholder="Senha"
                    className="WithIcon"
                  />
                </div>
              </div>

              <div className="ButtonWrapper">
                <Link to="/register" className="LoginButton">
                    Cadastre-se
                </Link>
                <button type="submit" className="LoginButton">
                  Entre
                </button>
              </div>

              <Link to="/recuperarsenha" id="forgot_passwd">Esqueci minha senha</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

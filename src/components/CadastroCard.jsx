import '../styles/CadastroCard.css';
import '../styles/Geral.css';
import { Icon } from '../components/Icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export function CadastroCard(props) {

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        var savedData = localStorage.getItem("formData");
        if (savedData) {
            savedData = JSON.parse(savedData);
            props.data = savedData;
        }
        formEntries.setValues({
            role: 'PEDIATRICIAN',
            email: props.data?.email || '',
            name: props.data?.name || '',
            password: props.data?.password || '',
            status: props.data?.status || '',
        });
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
            role: 'PEDIATRICIAN',
            email: props.data?.email || '',
            name: props.data?.name || '',
            password: props.data?.password || '',
            status: props.data?.status || '',
        }
    });

    const validate = (values) => {
        const errors = {};

        if (values.role === '') {
            errors.tipo = 'Selecione o tipo da sua conta';
        }

        if (!values.email) {
            errors.email = 'Insira um email';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Insira um email válido';
        }

        if (values.name.trim() === '') {
            errors.name = 'Insira seu nome';
        }

        if (values.password.length === 0) {
            errors.password = 'Insira uma senha com mais de 8 caracteres';
        }

        if (values.telefone.trim() === '') {
            errors.telefone = 'Insira o telefone';
        } else if (values.telefone.length < 11) {
            errors.telefone = 'Isira um telefone válido';
        }

        return errors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        formEntries.handleChange(event);
        const errorsList = validate(formEntries.values);
        setErrors(errorsList);

        if (Object.keys(errorsList).length !== 0) { //se houverem erros nos campos
            return null;
        } else {
            localStorage.setItem("formData", "");
            submitToApi(event);
        }
    };

    const submitToApi = async (event) => {
        const formData = new FormData(event.target);
        const data = {};

        Object.keys(formEntries.values).forEach(chave => {
            data[chave] = formEntries.values[chave];
        });

        try {
            const url = "http://localhost:8080/api/users";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            const json = await response.json();
            console.log(json);

            if (response.ok) {
                console.log('Post enviado com sucesso!');
                navigate('/login');
            } else {
                console.error('Email ou telefone já cadastrados', response.statusText);
                setErrors({ registro: 'Email ou telefone já cadastrados' });
            }
        } catch (error) {
            console.error('Erro ao enviar o post:', error);
        }
        // enviar para o back
    };

    return (
        <div className="cadastro-page">
            <form method="post" className="card form_card" onSubmit={handleSubmit}>
                <div className="content">
                    <h1>Cadastro</h1>
                    {props.onlyView && formEntries.values.status !== '' &&
                        <div className="status">
                            <h2>Status:</h2>
                            <p>{formEntries.values.status}</p>
                        </div>
                    }
                    {/* <fieldset>
                        <h2>Tipo de conta</h2>
                        {errors.tipo &&
                            <div className="error">
                                <Icon name="error"></Icon>
                                <p>{errors.tipo}</p>
                            </div>
                        }
                        <div className="radio-container">
                            <input disabled={props.onlyView ? true : undefined} type="radio" id="estudante" name="role" value="estudante" onClick={formEntries.handleChange} checked={formEntries.values.role === "estudante"} />
                            <label htmlFor="estudante">Estudante</label>
                            <span className="radio"></span>
                            <Icon name="check"></Icon>
                        </div>
                        <div className="radio-container">
                            <input disabled={props.onlyView ? true : undefined} type="radio" id="medico-generalista" name="role" value="medico-generalista" onClick={formEntries.handleChange} checked={formEntries.values.role === "medico-generalista"} />
                            <label htmlFor="medico-generalista">Médico Generalista</label>
                            <span className="radio"></span>
                            <Icon name="check"></Icon>
                        </div>
                        <div className="radio-container">
                            <input disabled={props.onlyView ? true : undefined} type="radio" id="pediatra" name="role" value="pediatra" onClick={formEntries.handleChange} checked={formEntries.values.role === "pediatra"} />
                            <label htmlFor="pediatra">Pediatra</label>
                            <span className="radio"></span>
                            <Icon name="check"></Icon>
                        </div>
                        {props.onlyView &&
                            <div>
                                <div className="radio-container">
                                    <input disabled={props.onlyView ? true : undefined} type="radio" id="admin_basico" name="role" value="admin_basico" onClick={formEntries.handleChange} checked={formEntries.values.role === "admin_basico"} />
                                    <label htmlFor="pediatra">Admin Básico</label>
                                    <span className="radio"></span>
                                    <Icon name="check"></Icon>
                                </div>
                                <div className="radio-container">
                                    <input disabled={props.onlyView ? true : undefined} type="radio" id="admin_geral" name="role" value="admin_geral" onClick={formEntries.handleChange} checked={formEntries.values.role === "admin_geral"} />
                                    <label htmlFor="pediatra">Admin Geral</label>
                                    <span className="radio"></span>
                                    <Icon name="check"></Icon>
                                </div>
                            </div>
                        }
                    </fieldset> */}
                    {errors.name &&
                        <div className="error">
                            <Icon name="error"></Icon>
                            <p>{errors.name}</p>
                        </div>
                    }
                    {formEntries.values.name &&
                        <label htmlFor="">Nome</label>
                    }
                    <div className="field">
                        <Icon name="user"></Icon>
                        <input disabled={props.onlyView ? true : undefined} type="text" placeholder="Nome" name="name" id="name" value={formEntries.values.name} onChange={formEntries.handleChange} />
                    </div>
                    {errors.email &&
                        <div className="error">
                            <Icon name="error"></Icon>
                            <p>{errors.email}</p>
                        </div>
                    }
                    {formEntries.values.email &&
                        <label htmlFor="">Email</label>
                    }
                    <div className="field">
                        <Icon name="email"></Icon>
                        <input disabled={props.onlyView ? true : undefined} placeholder="Email" name="email" id="email" value={formEntries.values.email} onChange={formEntries.handleChange} />
                    </div>
                    {errors.password &&
                        <div className="error">
                            <Icon name="error"></Icon>
                            <p>{errors.password}</p>
                        </div>
                    }
                    {!props.onlyView && formEntries.values.password &&
                        <label htmlFor="">Senha</label>
                    }
                    {!props.onlyView &&
                        <div className="field">
                            <Icon name="passwd"></Icon>
                            <input disabled={props.onlyView ? true : undefined} type="password" placeholder="Senha" name="password" id="password" onChange={formEntries.handleChange} value={formEntries.values.password} />
                        </div>}
                    {errors.telefone &&
                        <div className="error">
                            <Icon name="error"></Icon>
                            <p>{errors.telefone}</p>
                        </div>
                    }
                    {formEntries.values.telefone &&
                        <label htmlFor="">Telefone</label>
                    }
                    <div className="field">
                        <Icon name="tel"></Icon>
                        <input disabled={props.onlyView ? true : undefined} type="tel" placeholder="Telefone" name="telefone" id="telefone" onChange={formEntries.handleChange} value={formEntries.values.telefone} />
                    </div>
                    {errors.registro &&
                        <div className="error">
                            <Icon name="error"></Icon>
                            <p>{errors.registro}</p>
                        </div>
                    }
                    {!props.onlyView &&
                        <div className="buttons">
                            <button className="cancelar" onClick={() => navigate('/')}>Cancelar</button>
                            <button className="cadastrar" type="submit">Cadastre-se</button>
                        </div>}
                </div>
            </form>
        </div>
    )
}
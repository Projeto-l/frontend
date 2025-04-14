
import { CadastroCard } from '../components/CadastroCard.jsx';
import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext.jsx';

const Perfil = () => {
    const { user } = useContext(AuthContext);
    const [form, setForm] = useState({});

    const user_obj = JSON.parse(user);

    console.log(user_obj);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                localStorage.removeItem("formData");
                const response = await fetch(`http://localhost:8080/api/users/${'344fe775-edcf-4be1-be3c-a34460d928db'}`, {
                    method: 'GET',
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const userForm = await response.json();
                console.log(userForm);
                setForm(userForm);
            } catch (error) {
                console.log(error);
                console.error("Não foi possível carregar as informações do usuário");
            }
        }
        fetchForm();
    }, []);

    return (
        <div className="page">
            <div className="content">
                <Header isHome={false}></Header>
                <CadastroCard onlyView="true" data={form} />
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Perfil;

import { CadastroCard } from '../components/CadastroCard.jsx';
import { Header } from '../components/Header.jsx';

const Register = () => {
    return (
        <div className="page">
            <div className="content">
                <Header isHome={false}></Header>
                <CadastroCard />
            </div>
        </div>
    );
};

export default Register;
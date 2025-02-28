
import { CalculatorCard } from '../components/CalculatorCard.jsx';
import { Header } from '../components/Header.jsx';

const Register = () => {
    return (
        <div className="page">
            <div className="content">
                <Header isHome={false}></Header>
                <CalculatorCard />
            </div>
        </div>
    );
};

export default Register;
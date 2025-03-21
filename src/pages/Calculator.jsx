
import { CalculatorCard } from '../components/CalculatorCard.jsx';
import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';

const Register = () => {
    return (
        <div className="page">
            <div className="content">
                <Header isHome={false}></Header>
                <CalculatorCard />
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Register;
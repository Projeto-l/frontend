
import { CalculatorCard } from '../components/CalculatorCard.jsx';
import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';

const Register = (props) => {
    return (
        <div className={props.tabMode ? 'page tab_mode' : 'page'}>
            <Header isHome={false}></Header>
            <div className="content">
                <CalculatorCard />
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Register;
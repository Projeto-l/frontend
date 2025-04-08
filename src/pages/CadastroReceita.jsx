import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { CadastroReceitaCard } from "../components/CadastroReceitaCard.jsx";

const CadastroReceita = (props) => {
  return (
    <div className={props.tabMode ? 'page tab_mode' : 'page'}>
      <Header isHome={false}></Header>
      <div className="content">
        <CadastroReceitaCard />
        <Footer></Footer>
      </div>
    </div>
  );
};

export default CadastroReceita;

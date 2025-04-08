import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { ReceitaCard } from "../components/ReceitaCard.jsx";

const Receita = (props) => {
  return (
    <div className={props.tabMode ? 'page tab_mode' : 'page'}>
      <Header isHome={false}></Header>
      <div className="content">
        <ReceitaCard />
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Receita;

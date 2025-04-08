import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { ReceitasCard } from "../components/ReceitasCard.jsx";

const Receitas = (props) => {
  return (
    <div className={props.tabMode ? 'page tab_mode' : 'page'}>
      <Header isHome={false}></Header>
      <div className="content">
        <ReceitasCard />
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Receitas;

import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { CadastroReceitaCard } from "../components/CadastroReceitaCard.jsx";

const CadastroReceita = () => {
  return (
    <div>
      <Header isHome={false}></Header>
      <CadastroReceitaCard />
      <Footer></Footer>
    </div>
  );
};

export default CadastroReceita;

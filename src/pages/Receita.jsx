import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { ReceitaCard } from "../components/ReceitaCard.jsx";

const Receita = () => {
  return (
    <div>
      <Header isHome={false}></Header>
      <ReceitaCard />
      <Footer></Footer>
    </div>
  );
};

export default Receita;

import { Header } from "../components/Header.jsx";
import { ReceitaCard } from "../components/ReceitaCard.jsx";

const Receita = () => {
  return (
    <div>
      <Header isHome={false}></Header>
      <ReceitaCard />
    </div>
  );
};

export default Receita;

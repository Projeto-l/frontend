import { Header } from "../components/Header.jsx";
import { ReceitasCard } from "../components/ReceitasCard.jsx";

const Receitas = () => {
  return (
    <div>
      <Header isHome={false}></Header>
      <ReceitasCard />
    </div>
  );
};

export default Receitas;
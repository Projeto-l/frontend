import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { ReceitasCard } from "../components/ReceitasCard.jsx";

const Receitas = () => {
  return (
    <div>
      <Header isHome={false}></Header>
      <ReceitasCard />
      <Footer></Footer>
    </div>
  );
};

export default Receitas;

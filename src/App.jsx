import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Accueil from "./pages/Accueil";
import Produits from "./pages/Produits";
import AjouterProduit from "./pages/AjouterProduit";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/ajouter" element={<AjouterProduit />} />
      </Routes>
    </div>
  );
}

export default App;

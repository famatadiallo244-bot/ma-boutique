import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Accueil from "./pages/Accueil";
import Produits from "./pages/Produits";
import AjouterProduit from "./pages/AjouterProduit";

function App() {
  const [panier, setPanier] = useState([]);

  const ajouterAuPanier = (produit) => {
    const existe = panier.find((p) => p.id === produit.id);
    if (existe) {
      setPanier(
        panier.map((p) =>
          p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p,
        ),
      );
    } else {
      setPanier([...panier, { ...produit, quantite: 1 }]);
    }
  };
  return (
    <div>
      <Navbar panier={panier} />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route
          path="/produits"
          element={<Produits ajouterAuPanier={ajouterAuPanier} />}
        />
        <Route path="/ajouter" element={<AjouterProduit />} />
      </Routes>
    </div>
  );
}

export default App;

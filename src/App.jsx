import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Navbar from "./Navbar";
import Accueil from "./pages/Accueil";
import Produits from "./pages/Produits";
import AjouterProduit from "./pages/AjouterProduit";
import Panier from "./pages/Panier";
import Connexion from "./pages/Connexion";

function App() {
  const [panier, setPanier] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
      <Navbar panier={panier} user={user} />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route
          path="/produits"
          element={<Produits ajouterAuPanier={ajouterAuPanier} />}
        />
        <Route
          path="/ajouter"
          element={user ? <AjouterProduit /> : <Connexion />}
        />
        <Route
          path="/panier"
          element={<Panier panier={panier} setPanier={setPanier} />}
        />
      </Routes>
    </div>
  );
}

export default App;

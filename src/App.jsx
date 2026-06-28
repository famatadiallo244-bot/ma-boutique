import Navbar from "./Navbar";
import ProduitCard from "./ProduitCard";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import AjouterProduits from "./AjouterProduit";
function App() {
  const [panier, setPanier] = useState(0);
  const [produits, setProduits] = useState([]);
  const [notification, setNotification] = useState("");

  const afficherNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(""), 3000);
  };

  useEffect(() => {
    const getProduits = async () => {
      const { data } = await supabase.from("produits").select("*");
      setProduits(data);
    };
    getProduits();
  }, []);
  const rechargeProduits = async () => {
    const { data } = await supabase.from("produits").select("*");
    setProduits(data);
  };
  return (
    <div>
      <div className="entete">
        <Navbar panier={panier} />
        {notification && (
          <div
            className={
              notification.type === "succes"
                ? "notification-succes"
                : "notification-erreur"
            }
          >
            {notification.message}
          </div>
        )}
        <h1>Ma Boutique 🛍️</h1>
      </div>
      <div className="produits">
        {produits.map((produit) => (
          <ProduitCard
            key={produit.id}
            id={produit.id}
            nom={produit.nom}
            prix={produit.prix}
            image={produit.image}
            onAjouter={() => setPanier(panier + 1)}
            onSupprimer={() => rechargeProduits()}
            onModifier={rechargeProduits}
            onNotification={afficherNotification}
          />
        ))}
      </div>
      <AjouterProduits
        onProduitAjouter={rechargeProduits}
        onNotification={afficherNotification}
      />
    </div>
  );
}

export default App;

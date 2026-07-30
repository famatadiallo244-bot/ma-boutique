import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useLocation } from "react-router-dom";
import ProduitCard from "../ProduitCard";
import Categories from "../Categories";

function Produits() {
  const [produits, setProduits] = useState([]);
  const [panier, setPanier] = useState(0);
  const [notification, setNotification] = useState("");
  const location = useLocation();
  const [chargement, setChargement] = useState(false);

  const afficherNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(""), 3000);
  };
  const rechargeProduits = async () => {
    setChargement(true);
    const { data, error } = await supabase
      .from("produits")
      .select("*, categories(nom)");

    if (error) {
      console.error("Erreur Supabase:", error);
      setChargement(false);
      return;
    }

    setProduits(data || []);
    setChargement(false);
  };

  useEffect(() => {
    rechargeProduits();
  }, [location]);
  return (
    <div>
      {chargement && <p className="entete">Chargement...</p>}
      <p className="panier">🛒 {panier} article(s)</p>
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
      <div className="produits">
        {produits &&
          produits.map((produit) => (
            <ProduitCard
              key={produit.id}
              id={produit.id}
              nom={produit.nom}
              prix={produit.prix}
              image={produit.image}
              categorie={produit.categories?.nom}
              onAjouter={() => setPanier(panier + 1)}
              onSupprimer={() => rechargeProduits()}
              onModifier={rechargeProduits}
              onNotification={afficherNotification}
            />
          ))}
      </div>
    </div>
  );
}
export default Produits;

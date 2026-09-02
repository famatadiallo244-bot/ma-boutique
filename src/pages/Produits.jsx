import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useLocation } from "react-router-dom";
import ProduitCard from "../ProduitCard";
import Categories from "../Categories";

function Produits({ ajouterAuPanier }) {
  const [produits, setProduits] = useState([]);
  const [notification, setNotification] = useState("");
  const location = useLocation();
  const [chargement, setChargement] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [categorieFiltre, setCategorieFiltre] = useState("");

  const produitsFiltres = produits.filter(
    (produit) =>
      produit.nom.toLowerCase().includes(recherche.toLowerCase()) &&
      (categorieFiltre === "" ||
        produit.categorie_id === Number(categorieFiltre)),
  );

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
      <input
        className="input"
        type="text"
        placeholder="🔍 Rechercher un produit..."
        onChange={(e) => setRecherche(e.target.value)}
      />
      <Categories onChange={setCategorieFiltre} />
      <div className="produits">
        {produitsFiltres.map((produit) => (
          <ProduitCard
            key={produit.id}
            id={produit.id}
            nom={produit.nom}
            prix={produit.prix}
            image={produit.image}
            categorie={produit.categories?.nom}
            onAjouter={() => ajouterAuPanier(produit)}
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

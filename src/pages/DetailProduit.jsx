import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

function DetailProduit({ ajouterAuPanier }) {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const getProduit = async () => {
      const { data, error } = await supabase
        .from("produits")
        .select("*, categories(nom)")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erreur:", error);
      } else {
        setProduit(data);
      }
      setChargement(false);
    };
    getProduit();
  }, [id]);

  if (chargement) return <p className="entete">Chargement...</p>;
  if (!produit) return <p className="entete">Produit introuvable !</p>;

  return (
    <div className="formulaire">
      <img src={produit.image} alt={produit.nom} className="carte-image-real" />
      <h1>{produit.nom}</h1>
      <p className="carte-categorie">{produit.categories?.nom}</p>
      <p className="carte-prix">{produit.prix} FCFA</p>
      <button className="btn-panier" onClick={() => ajouterAuPanier(produit)}>
        Ajouter au panier
      </button>
    </div>
  );
}
export default DetailProduit;

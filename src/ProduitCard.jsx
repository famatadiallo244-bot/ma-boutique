import { supabase } from "./supabase";
import { useState } from "react";
function ProduitCard(props) {
  const [modifier, setModifier] = useState(false);
  const [nom, setNom] = useState(props.nom);
  const [prix, setPrix] = useState(props.prix);

  const handleSupprimer = async () => {
    const confirmer = window.confirm(
      "Voulez-vous vraiment supprimer ce produit ?",
    );
    if (confirmer) {
      await supabase.from("produits").delete().eq("id", props.id);
      props.onSupprimer();
      props.onNotification("Produit supprimé avec succès ! 🗑️", "succes");
    }
  };

  const handleModifier = async () => {
    console.log("id :", props.id);
    console.log("nom :", nom);
    console.log("prix :", prix);
    await supabase.from("produits").update({ nom, prix }).eq("id", props.id);
    props.onModifier();
    setModifier(false);
  };

  return (
    <div className="carte">
      <p className="carte-image">{props.image}</p>
      {modifier ? (
        <>
          <input
            className="input"
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Prix"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
          />
          <button className="btn-sauvegarde" onClick={handleModifier}>
            Sauvegarde
          </button>
          <button className="btn-annuler" onClick={() => setModifier(false)}>
            Annuler
          </button>
        </>
      ) : (
        <>
          <h2>{props.nom}</h2>
          <p className="carte-prix">Prix: {props.prix} FCFA</p>
          <button className="btn-panier" onClick={props.onAjouter}>
            Ajouter au panier
          </button>
          <button className="btn-modifier" onClick={() => setModifier(true)}>
            Modifier
          </button>
          <button className="btn-supprimer" onClick={handleSupprimer}>
            Supprimer
          </button>
        </>
      )}
    </div>
  );
}
export default ProduitCard;

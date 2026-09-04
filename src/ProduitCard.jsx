import { supabase } from "./supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProduitCard(props) {
  const [modifier, setModifier] = useState(false);
  const [nom, setNom] = useState(props.nom);
  const [prix, setPrix] = useState(props.prix);
  const [image, setImage] = useState(props.image);
  const navigate = useNavigate();

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
    let imagesUrl = props.image; // garde l'ancienne image par défaut

    // Si  l'utilisateur a choisi un nouveau fichier (pas juste une chaîne)
    if (image instanceof File) {
      const nomFichier = `${Date.now()}-${image.name}`;
      await supabase.storage.from("images").upload(nomFichier, image);
      const { data } = supabase.storage.from("images").getPublicUrl(nomFichier);
      imagesUrl = data.publicUrl;
    }
    console.log("id :", props.id);
    console.log("nom :", nom);
    console.log("prix :", prix);
    await supabase
      .from("produits")
      .update({ nom, prix, image: imagesUrl })
      .eq("id", props.id);
    props.onModifier();
    setModifier(false);
  };

  return (
    <div className="carte">
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
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
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
          <img src={props.image} alt={props.nom} className="carte-image-real" />
          <h2>{props.nom}</h2>
          <p className="carte-categorie">{props.categorie}</p>
          <p className="carte-prix">Prix: {props.prix} FCFA</p>
          <button className="btn-panier" onClick={props.onAjouter}>
            Ajouter au panier
          </button>
          <button
            className="btn-modifier"
            onClick={() => navigate(`/produits/${props.id}`)}
          >
            Voir détail
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

import { useState } from "react";
import { supabase } from "./supabase";

function AjouterProduit(props) {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState("");
  const handleAjouter = async () => {
    await supabase.from("produits").insert({ nom, prix, image });
    props.onNotification("Produit ajouté avec succès ! ✅", "succes");
    props.onProduitAjouter();
    setNom("");
    setPrix("");
    setImage("");
  };
  return (
    <div className="formulaire">
      <h2>Ajouter un produit</h2>
      <input
        className="input"
        type="text"
        placeholder="Nom"
        onChange={(e) => setNom(e.target.value)}
      />
      <br></br>
      <input
        className="input"
        type="text"
        placeholder="Prix"
        onChange={(e) => setPrix(e.target.value)}
      />
      <br></br>
      <input
        className="input"
        type="text"
        placeholder="image (emoji)"
        onChange={(e) => setImage(e.target.value)}
      />
      <br></br>
      <button className="btn-sauvegarde" onClick={handleAjouter}>
        Ajouter
      </button>
    </div>
  );
}
export default AjouterProduit;

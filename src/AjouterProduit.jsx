import { useState } from "react";
import { supabase } from "./supabase";
import Categories from "./Categories";

function AjouterProduit(props) {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState(null);
  const [categorieId, setCategorieId] = useState("");

  const handleAjouter = async () => {
    const fichier = image;
    const nomFichier = `${Date.now()}-${fichier.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const { data: uploadData, error } = await supabase.storage
      .from("images")
      .upload(nomFichier, fichier);
    console.log("upload error:", error);
    console.log("upload data:", uploadData);

    const { data } = supabase.storage.from("images").getPublicUrl(nomFichier);
    const imagesUrl = data.publicUrl;

    const { data: insertData, error: insertError } = await supabase
      .from("produits")
      .insert({
        nom,
        prix: Number(prix),
        image: imagesUrl,
        categorie_id: categorieId,
      });
    console.log("insert error:", insertError);
    console.log("insert data:", insertData);

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
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <Categories onChange={setCategorieId} />
      <button className="btn-sauvegarde" onClick={handleAjouter}>
        Ajouter
      </button>
    </div>
  );
}
export default AjouterProduit;

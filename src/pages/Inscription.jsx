import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

function Inscription() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");
  const navigate = useNavigate();

  const handleInscription = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password: motDePasse,
    });
    if (error) {
      setErreur("Erreur lors de l'inscription !");
    } else {
      setSucces("Compte créé ! Vérifiez votre email pour confirmer !");
      setTimeout(() => navigate("/ajouter"), 3000);
    }
  };

  return (
    <div className="formulaire">
      <h2>Inscription</h2>
      {erreur && <p style={{ color: "red" }}>{erreur}</p>}
      {succes && <p style={{ color: "green" }}>{succes}</p>}
      <input
        className="input"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => setMotDePasse(e.target.value)}
      />
      <button className="btn-sauvegarde" onClick={handleInscription}>
        S'inscrire
      </button>
    </div>
  );
}
export default Inscription;

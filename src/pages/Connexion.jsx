import { useState } from "react";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";

function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");

  const handleConnexion = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: motDePasse,
    });
    if (error) {
      setErreur("Email ou mot de passe incorrect !");
    }
  };

  return (
    <div className="page-centre">
      <div className="formulaire">
        <h2>Connexion</h2>
        {erreur && <p style={{ color: "red" }}>{erreur}</p>}
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
        <button className="btn-sauvegarde" onClick={handleConnexion}>
          Se connecter
        </button>
        <p>
          Pas encore de compte ?{" "}
          <Link to="/inscription" className="nav-link">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Connexion;

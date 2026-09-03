import { Link } from "react-router-dom";
import { supabase } from "./supabase";

function Navbar({ panier, user }) {
  const handleDeconnexion = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="nav-link">
          Accueil
        </Link>
        <Link to="/produits" className="nav-link">
          Produits
        </Link>
        <Link to="/ajouter" className="nav-link">
          Ajouter
        </Link>
        <Link to="/panier" className="nav-link">
          🛒 {panier.reduce((total, p) => total + p.quantite, 0)} article(s)
        </Link>
        {user ? (
          <button className="btn-supprimer" onClick={handleDeconnexion}>
            Déconnexion
          </button>
        ) : (
          <Link to="/ajouter" className="nav-link">
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}
export default Navbar;

import { Link } from "react-router-dom";
import { supabase } from "./supabase";

function Navbar({ panier, user }) {
  const handleDeconnexion = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="navbar">
      <div className="navbar-liens">
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
      </div>
      <div className="navbar-auth">
        {user ? (
          <button className="btn-deconnexion" onClick={handleDeconnexion}>
            Déconnexion
          </button>
        ) : (
          <Link to="/ajouter" className="nav-link-connexion">
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}
export default Navbar;

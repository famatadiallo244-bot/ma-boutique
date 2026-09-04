import { NavLink } from "react-router-dom";
import { supabase } from "./supabase";

function Navbar({ panier, user }) {
  const handleDeconnexion = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="navbar">
      <div className="navbar-liens">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-actif" : "nav-link"
          }
          end
        >
          Accueil
        </NavLink>
        <NavLink
          to="/produits"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-actif" : "nav-link"
          }
        >
          Produits
        </NavLink>
        <NavLink
          to="/ajouter"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-actif" : "nav-link"
          }
        >
          Ajouter
        </NavLink>
        <NavLink
          to="/panier"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-actif" : "nav-link"
          }
        >
          🛒 {panier.reduce((total, p) => total + p.quantite, 0)} article(s)
        </NavLink>
      </div>
      <div className="navbar-auth">
        {user ? (
          <button className="btn-deconnexion" onClick={handleDeconnexion}>
            Déconnexion
          </button>
        ) : (
          <NavLink to="/ajouter" className="nav-link-connexion">
            Connexion
          </NavLink>
        )}
      </div>
    </nav>
  );
}
export default Navbar;

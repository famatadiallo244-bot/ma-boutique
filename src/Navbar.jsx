import { Link } from "react-router-dom";
function Navbar({ panier }) {
  return (
    <nav className="navbar">
      <p className="navbar-panier">
        🛒 {panier.reduce((total, p) => total + p.quantite, 0)} article(s)
      </p>
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
      </div>
    </nav>
  );
}
export default Navbar;

import { Link } from "react-router-dom";
function Navbar({ panier }) {
  return (
    <nav className="navbar">
      <p className="navbar-panier">🛒 {panier} article(s)</p>
      <di>
        <Link to="/" className="nav-link">
          Accueil
        </Link>
        <Link to="/produits" className="nav-link">
          Produits
        </Link>
        <Link to="/ajouter" className="nav-link">
          Ajouter
        </Link>
      </di>
    </nav>
  );
}
export default Navbar;

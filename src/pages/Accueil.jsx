import { useNavigate } from "react-router-dom";

function Accueil() {
  const navigate = useNavigate();

  return (
    <div className="accueil">
      <div className="hero">
        <h1 className="hero-titre">Ma Boutique 🛍️</h1>
        <p className="hero-sous-titre">
          Découvrez notre collection exclusive de vêtements et accessoires
        </p>
        <button className="btn-hero" onClick={() => navigate("/produits")}>
          Voir les produits
        </button>
      </div>

      <div className="categories-accueil">
        <div className="categorie-card" onClick={() => navigate("/produits")}>
          <span className="categorie-emoji">👗</span>
          <h3>Vêtements</h3>
        </div>
        <div className="categorie-card" onClick={() => navigate("/produits")}>
          <span className="categorie-emoji">👟</span>
          <h3>Chaussures</h3>
        </div>
        <div className="categorie-card" onClick={() => navigate("/produits")}>
          <span className="categorie-emoji">👜</span>
          <h3>Accessoires</h3>
        </div>
      </div>
    </div>
  );
}
export default Accueil;

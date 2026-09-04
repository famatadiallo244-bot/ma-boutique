import { useNavigate } from "react-router-dom";
import AjouterProduitForm from "../AjouterProduit";
import { useState } from "react";

function AjouterProduit() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");

  const afficherNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification("");
      navigate("/produits");
    }, 2000);
  };

  const rechargeProduits = () => {
    navigate("/produits");
  };

  return (
    <div className="page-centre">
      <div className="formulaire">
        <h1 className="entete">Ajouter un produit</h1>
        {notification && (
          <div
            className={
              notification.type === "succes"
                ? "notification-succes"
                : "notification-erreur"
            }
          >
            {notification.message}
          </div>
        )}
        <AjouterProduitForm
          onProduitAjouter={rechargeProduits}
          onNotification={afficherNotification}
        />
      </div>
    </div>
  );
}

export default AjouterProduit;

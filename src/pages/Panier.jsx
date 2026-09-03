function Panier({ panier, setPanier }) {
  const total = panier.reduce((acc, p) => acc + p.prix * p.quantite, 0);

  const supprimer = (id) => {
    setPanier(panier.filter((p) => p.id !== id));
  };

  const augmenter = (id) => {
    setPanier(
      panier.map((p) => (p.id === id ? { ...p, quantite: p.quantite + 1 } : p)),
    );
  };

  const diminuer = (id) => {
    setPanier(
      panier.map((p) =>
        p.id === id && p.quantite > 1 ? { ...p, quantite: p.quantite - 1 } : p,
      ),
    );
  };

  return (
    <div>
      <h1 className="entete">Mon Panier 🛒</h1>
      {panier.length === 0 ? (
        <p className="entete">Votre panier est vide !</p>
      ) : (
        <>
          {panier.map((p) => (
            <div key={p.id} className="carte">
              <img src={p.image} alt={p.nom} className="carte-image-real" />
              <h2>{p.nom}</h2>
              <p className="carte-prix">{p.prix} FCFA</p>
              <div>
                <button className="btn-modifier" onClick={() => diminuer(p.id)}>
                  -
                </button>
                <span> {p.quantite} </span>
                <button
                  className="btn-modifier"
                  onClick={() => augmenter(p.id)}
                >
                  +
                </button>
              </div>
              <p className="carte-prix">
                Sous-total: {p.prix * p.quantite} FCFA
              </p>
              <button className="btn-supprimer" onClick={() => supprimer(p.id)}>
                Supprimer
              </button>
            </div>
          ))}
          <h2 className="entete">Total: {total} FCFA</h2>
        </>
      )}
    </div>
  );
}
export default Panier;

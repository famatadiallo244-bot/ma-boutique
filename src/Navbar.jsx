function Navbar({ panier }) {
  return (
    <nav className="navbar">
      <p className="navbar-panier">🛒 {panier} article(s)</p>
    </nav>
  );
}
export default Navbar;

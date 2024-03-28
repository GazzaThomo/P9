import logo from "../../assets/logo.png";

function Header() {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo sportsee" className="navbar--logo" />
      <div className="navbar--links">
        <p className="navbar--link">Accueil</p>
        <p className="navbar--link">Profil</p>
        <p className="navbar--link">Réglage</p>
        <p className="navbar--link">Communauté</p>
      </div>
    </nav>
  );
}

export default Header;

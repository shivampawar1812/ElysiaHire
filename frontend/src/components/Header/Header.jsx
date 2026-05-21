import "./Header.css";

import { Link } from "react-router-dom";

const Header = ({ setIsOpen }) => {

  return (

    <header className="main-header">

      {/* ================= MENU ================= */}

      <div
        className="menu-btn"
        onClick={() => setIsOpen(true)}
      >

        ☰

      </div>

      {/* ================= LOGO ================= */}

      <div className="logo">

        <Link
          to="/home"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >

          <img
            src="/images/ElysiaHire.png"
            alt="ElysiaHire"
          />

        </Link>

      </div>

    </header>

  );

};

export default Header;
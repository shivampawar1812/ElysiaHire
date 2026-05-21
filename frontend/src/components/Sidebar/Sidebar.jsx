import "./Sidebar.css";

import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <>

      {/* ================= OVERLAY ================= */}

      <div

        className={`sidebar-overlay ${isOpen ? "active" : ""
          }`}

        onClick={() => setIsOpen(false)}

      ></div>

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`sidebar ${isOpen ? "open" : ""
          }`}
      >
        
        {/* ================= TOP ================= */}

        <div className="sidebar-top">
          <h2>ElysiaHire</h2>
        <span
          className="close-btn"
          onClick={() => setIsOpen(false)}
        >

          ✕

        </span></div> 
        {/* ================= LINKS ================= */}

        <nav className="sidebar-links">

          <Link
            to="/home"
          onClick={() =>
            setIsOpen(false),window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          >
            Home
          </Link>

          <Link
            to="/features"
            onClick={() => setIsOpen(false)}
          >

            Features

          </Link>

          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
          >

            Dashboard

          </Link>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
          >

            About

          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
          >

            Contact

          </Link>

        </nav>

        {/* ================= LOGOUT ================= */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          Logout

        </button>

      </aside>

    </>

  );

};

export default Sidebar;
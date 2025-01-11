// Navbar.js
import React, {useState} from "react";
import "./styles/Navbar.css";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";

const AnotherNavbar = ({isOpen}) => {
  const onLogout = ()=>{

    localStorage.clear()
    window.location.pathname = '/'

}

 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};


const HomePage = ()=>{

  window.location.pathname = '/manager'
}


  return (
    <nav className="navbar">
      <div className="navbar-container">
 <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

        <h1 className="navbar-title" id="navbar-title">Healthcare App</h1>
        <div className={`navbar-buttons ${isMenuOpen ? "show" : ""}`}>
          <button onClick={HomePage} className="navbar-button" id="add-patient-button">Home</button>
          <button className="navbar-button" id="logout-button" onClick={onLogout} >Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default AnotherNavbar;
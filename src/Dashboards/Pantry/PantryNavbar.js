import React,{useState} from 'react';
import './styles/PantryNavbar.css'; // CSS for the Navbar
import { FaBell, FaSignOutAlt , FaTimes , FaBars } from 'react-icons/fa'; // Importing icons

function Navbar({  onNotifications , data }) {


   const [isMenuOpen, setIsMenuOpen] = useState(false);

 
const onLogout = ()=>{

    localStorage.clear()
    window.location.pathname = '/'

}

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};

  return (
    <nav className="pantry-navbar">
      <div className="pantry-navbar-logo">
        <h1>Pantry Dashboard</h1>
      </div>
  <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>




      <div className={`navbar-buttons ${isMenuOpen ? "show" : ""}`}>
        <button className="notification-btn" onClick={onNotifications}>
         <div className='check' >
         <FaBell className="icon" />
         <span className="notification-badge">{data.length}</span>
         </div>
        </button>
        <button className="logout-btn" onClick={onLogout}>
          <FaSignOutAlt className="icon" />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

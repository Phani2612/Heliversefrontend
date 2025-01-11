import React,{useState} from "react";
import "./styles/DeliveryNavbar.css"; // CSS styles
import { FaBell, FaSignOutAlt , FaTimes , FaBars } from 'react-icons/fa'; // Importing icons
function DeliveryNavbar({  onNotifications , data }) {

  const onLogout = ()=>{

      localStorage.clear()
      window.location.pathname = '/'

  }

   const [isMenuOpen, setIsMenuOpen] = useState(false);
   
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="delivery-navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Delivery Dashboard</h1>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
      <div className={`navbar-right ${isMenuOpen ? "show" : ""}`}>
        <button
          className="navbar-icon-button"
          onClick={onNotifications}
          title="Notifications"
        >
           <FaBell className="icon" />
          <span className="notification-badge">{data.length}</span>
        </button>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default DeliveryNavbar;

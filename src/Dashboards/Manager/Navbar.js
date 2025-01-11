import React, { useState } from "react";
import "./styles/Navbar.css";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import DelayedMealsModal from "./Delaymodal"; // Component for the modal

const Navbar = ({ isOpen, data }) => {
  const [showDelayedMeals, setShowDelayedMeals] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    window.location.pathname = "/";
  };

  const toggleDelayedMealsModal = () => {
    setShowDelayedMeals(!showDelayedMeals);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-title" id="navbar-title">Healthcare App</h1>
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className={`navbar-buttons ${isMenuOpen ? "show" : ""}`}>
            <button
              className="navbar-icon-button"
              onClick={toggleDelayedMealsModal}
              title="Notifications"
            >
              
              <div className="check">
              <FaBell className="icon" />
              <span className="notification-badge">{data.length}</span>
              </div>
             
            </button>
            <button onClick={isOpen} className="navbar-button" id="add-patient-button">
              Add Patient
            </button>
            <button className="navbar-button" id="logout-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Modal for delayed meals */}
      {showDelayedMeals && (
        <DelayedMealsModal
          onClose={toggleDelayedMealsModal}
          delayedMeals={data}
        />
      )}
    </>
  );
};

export default Navbar;

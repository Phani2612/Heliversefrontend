import React, { useState } from "react";
import "./RegisterPage.css";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Manager");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const Data = {
      Email: email,
      Password: password,
      Role: role,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/signup`,
        Data
      );

      const { message, redirect_url } = response.data;

      Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
      });

      localStorage.setItem("User_Email", email);
      window.location.pathname = redirect_url;
    } catch (error) {
      console.error(error);

      if (error.response.status === 409) {
        Swal.fire({
          title: "Info!",
          text: error.response.data.message,
          icon: "info",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h2 className="register-title">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="register-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <select
            className="register-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Manager">Manager</option>
            <option value="Pantry">Pantry</option>
            <option value="Delivery">Delivery</option>
          </select>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        {error && <p className="register-error-message">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;

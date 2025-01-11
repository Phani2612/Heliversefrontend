import React from "react";
import "./styles/DelayModal.css"; // Add CSS for modal styling

const DelayedMealsModal = ({ onClose, delayedMeals }) => {

  console.log(delayedMeals)
  return (
    <div className="delay-modal-overlay">
      <div className="delay-modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Delayed Meals</h2>
        {delayedMeals.length === 0 ? (
          <p>No delayed meals at the moment.</p>
        ) : (
          <div className="delayed-meals-list">
            {delayedMeals.map((meal, index) => (
              <div className="delayed-meal-card" key={index}>
                <h3>Patient: {meal.patientId.name}</h3>
                <p><strong>Age:</strong> {meal.patientId.age}</p>
                <p><strong>Room:</strong> {`Floor ${meal.patientId.floorNumber}, Room ${meal.patientId.roomNumber}, Bed ${meal.patientId.bedNumber}`}</p>
                <p><strong>Morning Meal Status:</strong> {meal.meals.morning.status}</p>
                <p><strong>Afternoon Meal Status:</strong> {meal.meals.afternoon.status}</p>
                <p><strong>Evening Meal Status:</strong> {meal.meals.evening.status}</p>
                <p><strong>Expected Completion:</strong> {meal.meals.morning.expectedCompletionTime || "N/A"}</p>
                <p><strong>Pantry Staff:</strong> {meal.Pantry_Staff}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DelayedMealsModal;

import React from "react";
import "./styles/BellModal.css"; // Add custom styles here

const BellModal = ({ data, onClose }) => {
    return (
        <div className="bell-notification-modal-overlay">
          <div className="bell-notification-modal">
            <div className="bell-modal-header">
              <h2>Notifications</h2>
              <button className="close-btn" onClick={onClose}>
                &times;
              </button>
            </div>
            <div className="bell-modal-content">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <div key={index} className="bell-notification-card">
                    <p>
                      <strong>Created By:</strong> {item.createdBy || "Unknown"}
                    </p>
                    <p>
                      <strong>Patient Name:</strong>{" "}
                      {item.patientId?.name || "Unknown"}
                    </p>

                    <p>
                        <strong>Assigned By:</strong>{""}
                        {item.Pantry_Staff || ""}
                    </p>
                    <div className="meal-status-section">
                      {Object.keys(item.meals).map((mealTime) => (
                        <div key={mealTime} className="status-tag">
                          <span className="meal-time">
                            {mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}:
                          </span>
                          <span className={`status ${item.meals[mealTime]?.Delivery_Status.toLowerCase()}`}>
                            {item.meals[mealTime]?.Delivery_Status || "N/A"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No notifications available</p>
              )}
            </div>
          </div>
        </div>
      );
};

export default BellModal;

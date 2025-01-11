import React from "react";
import "./styles/NotifyModal.css"; // Add custom styles here

const NotificationModal = ({ data, onClose }) => {
    return (
        <div className="notification-modal-overlay">
          <div className="notification-modal">
            <div className="modal-header">
              <h2>Notifications</h2>
              <button className="close-btn" onClick={onClose}>
                &times;
              </button>
            </div>
            <div className="modal-content">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <div key={index} className="notification-card">
                    <p>
                      <strong>Created By:</strong> {item.createdBy || "Unknown"}
                    </p>
                    <p>
                      <strong>Patient Name:</strong>{" "}
                      {item.patientId?.name || "Unknown"}
                    </p>
                    <div className="meal-status-section">
                      {Object.keys(item.meals).map((mealTime) => (
                        <div key={mealTime} className="status-tag">
                          <span className="meal-time">
                            {mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}:
                          </span>
                          <span className={`status ${item.meals[mealTime]?.status.toLowerCase()}`}>
                            {item.meals[mealTime]?.status || "N/A"}
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

export default NotificationModal;

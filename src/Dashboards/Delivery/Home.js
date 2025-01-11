import React, { useState, useEffect } from "react";
import axios from "axios";
import DeliveryNavbar from "./DeliveryNavbar";
import "./styles/DeliveryHome.css";
import Swal from "sweetalert2";
import BellModal from "./BellModal";

function DeliveryHome() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [shownotify , setshownotify] = useState(false)

  const User_Email = localStorage.getItem('User_Email');
  const User_Type  = localStorage.getItem('User_Type')


  const fetchTaskData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/delivery/all/${User_Email}` , {withCredentials : true});
      console.log(response.data.AllData);
      const filteredTasks = response.data.AllData.filter((task) =>
        Object.values(task.meals).some(meal => meal.Delivery_Staff === User_Email)
      );
      setTasks(filteredTasks);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching task:", error);
      setIsLoading(false);
    }
  };

 

  const handleStatusChange = async(mealTime, newStatus, taskId) => {
    setIsLoading(true);

    setTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              meals: {
                ...task.meals,
                [mealTime]: {
                  ...task.meals[mealTime],
                  Delivery_Status: newStatus,
                },
              },
            }
          : task
      );
    });

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/delivery/update`, {
        taskId,
        newStatus,
        mealTime
      } , {withCredentials : true});

      const { message } = response.data;

      Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success'
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        icon: 'error'
      });

      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'red';
      case 'In Progress':
        return 'orange';
      case 'Delivered':
        return 'green';
      default:
        return 'black';
    }
  };


  const handleNotifications = () => {
    console.log('Notifications clicked');
    // Add notification logic here
    setshownotify(!shownotify)
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  if(User_Type != 'Delivery'){
    return (
      <h1>You don't have access to view this Dashboard , Raise a request for Delivery access</h1>
    )
  }

  

  return (
    <div>
      <DeliveryNavbar data={tasks}   onClose={handleNotifications} onNotifications={handleNotifications}/>

      {shownotify && <BellModal  data={tasks}   onClose={handleNotifications}/>}

      <div className="delivery-home-container">
        <h2 className="delivery-home-title">Delivery Dashboard</h2>
        {isLoading ? (
          <p className="delivery-home-loading-message">Loading patient details...</p>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="delivery-home-card" key={task._id}>
              <div className="delivery-home-card-header">
                <h3>Patient Details</h3>
              </div>
              <div className="delivery-home-card-body">
                <div className="patient-info">
                  <p><strong>Patient Name:</strong> {task.patientId.name}</p>
                  <p><strong>Age:</strong> {task.patientId.age}</p>
                  <p><strong>Gender:</strong> {task.patientId.gender}</p>
                  <p><strong>Contact:</strong> {task.patientId.contactInfo}</p>
                  <p><strong>Emergency Contact:</strong> {task.patientId.emergencyContact}</p>
                  <p><strong>Diseases:</strong> {task.patientId.diseases}</p>
                  <p><strong>Allergies:</strong> {task.patientId.allergies}</p>
                  <p><strong>Room Number:</strong> {task.patientId.roomNumber}</p>
                  <p><strong>Bed Number:</strong> {task.patientId.bedNumber}</p>
                  <p><strong>Floor Number:</strong> {task.patientId.floorNumber}</p>
                </div>
              </div>

              {/* Meal Status Table */}
              <div className="meal-status-table">
                <h3>Meal Status</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Meal</th>
                      <th>Status</th>
                      <th>Delivery Staff</th>
                      <th>Delivery Status</th>
                      <th>Change Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['morning', 'afternoon', 'evening'].map((mealTime) => {
                      const meal = task.meals[mealTime];
                      if (meal.Delivery_Staff === User_Email) {
                        return (
                          <tr key={mealTime}>
                            <td>{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</td>
                            <td>{meal.status}</td>
                            <td>{meal.Delivery_Staff}</td>
                            <td style={{ color: getStatusColor(meal.Delivery_Status) }}>
                              {meal.Delivery_Status}
                            </td>
                            <td>
                              <select
                                value={meal.Delivery_Status}
                                onChange={(e) =>
                                  handleStatusChange(mealTime, e.target.value, task._id)
                                }
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <p className="delivery-home-no-data">No task data available.</p>
        )}
      </div>
    </div>
  );
}

export default DeliveryHome;

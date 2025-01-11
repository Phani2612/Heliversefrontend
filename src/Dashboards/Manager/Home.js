import React, { useEffect, useState , useCallback } from 'react';
import Navbar from './Navbar';
import PatientDetailsForm from './PatientDetailsForm';
import axios from 'axios';
import './styles/ManagerHome.css'; // Add CSS for styling
import ViewDetails from './ViewDetails';
import Swal from 'sweetalert2';

function ManagerHome() {
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [delayitems , setdelayitems] = useState([])
  const [selectedTaskId, setSelectedTaskId] = useState(null); // Store selected task's ID

  const User_Type  = localStorage.getItem('User_Type')

 
 


  const closePatientModal = () => {
    setShowPatientDetails(false);
  };

  const openPatientModal = () => {
    setShowPatientDetails(true);
  };

  // Open the modal for a specific task
  const openDetailsModal = useCallback((taskId) => {
    if (selectedTaskId !== taskId) {
      setSelectedTaskId(taskId);
    }


  }, [selectedTaskId]);

  const closeDetailsModal = useCallback(() => {
    setSelectedTaskId(null);
  }, []);

  const fetchAllTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/meal/all` , {
        withCredentials: true, // Ensure cookies are included in the request
      });
      setTasks(response.data.AllData); // Set fetched tasks in state
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  const getdelay = async()=>{

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/meal/delay` , {withCredentials : true});
      const {message} = response.data

      

      setdelayitems(response.data.delayedMeals)

    } catch (error) {
      console.error('Error fetching delayed meals:', error);
    }
  }







  useEffect(() => {
    fetchAllTasks();
    getdelay()

  }, []);






  if(User_Type != 'Manager'){
    return (
      <h1>You don't have access to view this Dashboard , Raise a request for Manager access</h1>
    )
  }



  return (
    <div>
        <Navbar isOpen={openPatientModal} data = {delayitems} />
        
      <div className="manager-home">
    
      {showPatientDetails && <PatientDetailsForm onClose={closePatientModal} />}

      {/* Task List */}
      <div className="task-list">
        <h2>Assigned Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <div className="tasks-container">
            {tasks.map((task) => (
              <div className="task-card" key={task._id}>
                <h3>Patient: {task.patientId.name}</h3>
                <p><strong>Age:</strong> {task.patientId.age}</p>
                <p><strong>Gender:</strong> {task.patientId.gender}</p>
                <p><strong>Contact:</strong> {task.patientId.contactInfo}</p>
                <p><strong>Room:</strong> {`Floor ${task.patientId.floorNumber}, Room ${task.patientId.roomNumber}, Bed ${task.patientId.bedNumber}`}</p>
                <p><strong>Diseases:</strong> {task.patientId.diseases}</p>
                <p><strong>Allergies:</strong> {task.patientId.allergies}</p>
                <h4>Meal Details & status</h4>

                <button type="button" className="btn btn-info" onClick={() => openDetailsModal(task._id)}>
                  View details
                </button>

                {/* Show modal only for the selected task */}
                {selectedTaskId === task._id && (
                  
                  <ViewDetails
                    morning={task.meals.morning}
                    afternoon={task.meals.afternoon}
                    evening={task.meals.evening}
                    onClose={closeDetailsModal}
                    taskid = {task._id}
                    selectedtask = {selectedTaskId}
                  />
                )}

                <h4>Task Status</h4>
                <p><strong>Pantry Staff:</strong> {task.Pantry_Staff}</p>

                <p>
                  <strong>Delivery Status:</strong>
                  <span style={{ color: task.Delivery_Status === 'Pending' ? 'red' : task.Delivery_Status === 'In Progress' ? 'orange' : 'green' }}>
                    {task.Delivery_Status}
                  </span>
                </p>

                <p><strong>Created By:</strong> {task.createdBy}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default ManagerHome;













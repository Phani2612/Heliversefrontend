import React, { useEffect, useState } from 'react';
import Navbar from './PantryNavbar';
import axios from 'axios';
import './styles/PantryHome.css'; // Add CSS for styling
import Loader from '../../Loader'
import Swal from 'sweetalert2'
import NotificationModal from './NotifyModal';

function PantryHome() {
  const [tasks, setTasks] = useState([]);

  const [isLoading, setIsLoading] = useState(false)

  const [shownotify , setshownotify] = useState(false)
  const User_Type  = localStorage.getItem('User_Type')

  const handleLogout = () => {
    console.log('Logged out');
    // Add logout logic here
  };

  const handleNotifications = () => {
    console.log('Notifications clicked');
    // Add notification logic here
    setshownotify(!shownotify)
  };






  const fetchAllTasks = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/meal/all` , {withCredentials : true});
      setTasks(response.data.AllData); // Set fetched tasks in state
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    finally {

      setIsLoading(false)
    }
  };

  const updateMealStatus = async (taskId, mealTime, newStatus) => {

    setIsLoading(true)
    try {
      // Update the task status via API
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/meal/update`, {
        taskId,
        mealTime,
        status: newStatus,
      } , {withCredentials : true});

      const { message } = response.data


      Swal.fire({

        title: 'Success!',
        text: message,
        icon: 'success'
      })


      // Update the state locally
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? {
              ...task,
              meals: {
                ...task.meals,
                [mealTime]: {
                  ...task.meals[mealTime],
                  status: newStatus,
                },
              },
            }
            : task
        )
      );


      setIsLoading(false)

    } catch (error) {
      console.error('Error updating status:', error);

      Swal.fire({

        title: 'Error!',
        text: error.response.data.message,
        icon: 'error'
      })

      setIsLoading(false)
    }

    finally {

      setIsLoading(false)
    }
  };




  const updateDeliveryAgentEmail = async (taskId, mealTime, email) => {

    if(!email){
      Swal.fire({

        title:'Info!',
        text:'Email is required!',
        icon:'info'
        
      })

      return
  }

    setIsLoading(true)

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/meal/update-email`, {
        taskId,
        mealTime,
        deliveryAgentEmail: email,
      } , {withCredentials : true});

      const { message } = response.data

      Swal.fire({

        title: 'Success!',
        text: message,
        icon: 'success'
      })



    } catch (error) {
      console.error('Error updating Delivery Agent email:', error);

      Swal.fire({

        title: 'Error!',
        text: error.response.data.message,
        icon: 'error'
      })

      setIsLoading(false)
    }

    finally {

      setIsLoading(false)
      fetchAllTasks()
    }
  };


  const handleEmailChange = async (taskId, mealTime, email) => {

   
    // Update the email in the frontend state
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              meals: {
                ...task.meals,
                [mealTime]: {
                  ...task.meals[mealTime],
                  deliveryAgentEmail: email,
                },
              },
            }
          : task
      )
    );
  
    // Call the API to update the email in the backend
    try {
      await updateDeliveryAgentEmail(taskId, mealTime, email);
      console.log('Email updated successfully');
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };
  


  useEffect(() => {
    fetchAllTasks();
  }, []);



  if(User_Type != 'Pantry'){
    return (
      <h1>You don't have access to view this Dashboard , Raise a request for Pantry access</h1>
    )
  }






 

  return (
    <div>

      {isLoading && <Loader/>}
      {shownotify && <NotificationModal data={tasks}  onClose={handleNotifications} />}
      <Navbar onLogout={handleLogout} onNotifications={handleNotifications} data = {tasks} />
      <div className="pantry-home-container">


        <div className="pantry-home-tasks">
          <h2 className="pantry-home-title">Pantry Dashboard</h2>
          {tasks.length === 0 ? (
            <p className="pantry-home-no-tasks">No tasks available</p>
          ) : (
            <div className="pantry-home-task-table">
              {tasks.map((task) => (
                <div className="pantry-home-task-card" key={task._id}>
                  <h3 className="pantry-home-task-patient">
                    Patient: {task.patientId.name}
                  </h3>
                  <p className="pantry-home-task-room">
                    <strong>Room:</strong> Floor {task.patientId.floorNumber}, Room{' '}
                    {task.patientId.roomNumber}, Bed {task.patientId.bedNumber}
                  </p>

                  <table className="pantry-home-meal-table">
                    <thead>
                      <tr>
                        <th>Meal Time</th>
                        <th>Details</th>
                        <th>Ingredients</th>
                        <th>Instructions</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Delivery Assigned</th>
                        <th>Delivery Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['morning', 'afternoon', 'evening'].map((mealTime) => (
                        <tr
                          key={`${task._id}-${mealTime}`}
                          id={`pantry-home-task-${task._id}-${mealTime}`}
                        >
                          <td>{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</td>
                          <td>{task.meals[mealTime]?.details || 'N/A'}</td>
                          <td>{task.meals[mealTime]?.ingredients || 'N/A'}</td>
                          <td>{task.meals[mealTime]?.instructions || 'N/A'}</td>
                          <td
                            style={{
                              color:
                                task.meals[mealTime]?.status === 'Pending'
                                  ? 'red'
                                  : task.meals[mealTime]?.status === 'In Progress'
                                    ? 'orange'
                                    : 'green',
                            }}
                          >
                            {task.meals[mealTime]?.status || 'N/A'}
                          </td>
                          <td>
                            <select
                              className="pantry-home-meal-status-dropdown"
                              disabled= {task.meals[mealTime].Delivery_Staff ? true : false}
                              value={task.meals[mealTime]?.status || ''}
                              onChange={(e) =>
                                updateMealStatus(task._id, mealTime, e.target.value)
                              }
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Done">Done</option>
                            </select>
                          </td>

                          <td>
  <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
    <input
      type="email"
      className="pantry-home-email-input"
      disabled={task.meals[mealTime].Delivery_Staff ? true : false}
      value={task.meals[mealTime]?.tempEmail || '' || task.meals[mealTime]?.Delivery_Staff} // Use tempEmail for temporary state
      onChange={(e) =>
        setTasks((prevTasks) =>
          prevTasks.map((tasks) =>
            task._id === tasks._id
              ? {
                  ...tasks,
                  meals: {
                    ...tasks.meals,
                    [mealTime]: {
                      ...tasks.meals[mealTime],
                      tempEmail: e.target.value, // Temporarily store the email
                    },
                  },
                }
              : tasks
          )
        )
      }
    />

    <button
      className="pantry-home-save-email-btn"
      disabled={task.meals[mealTime].Delivery_Staff ? true : false} // Disable only after saving
      onClick={() => {
        // Save the email and update the Delivery_Staff field
        const email = task.meals[mealTime]?.tempEmail || '';
        if (email.trim() !== '') {
          handleEmailChange(task._id, mealTime, email); // Call API to save email
          setTasks((prevTasks) =>
            prevTasks.map((tasks) =>
              task._id === tasks._id
                ? {
                    ...tasks,
                    meals: {
                      ...tasks.meals,
                      [mealTime]: {
                        ...tasks.meals[mealTime],
                        Delivery_Staff: email, // Set Delivery_Staff after saving
                        tempEmail: '', // Clear tempEmail after save
                      },
                    },
                  }
                : tasks
            )
          );
        }
      }}
    >
      Save Email
    </button>
  </div>
</td>



<td
                            style={{
                              color:
                                task.meals[mealTime]?.Delivery_Status === 'Pending'
                                  ? 'red'
                                  : task.meals[mealTime]?.Delivery_Status === 'In Progress'
                                    ? 'orange'
                                    : 'green',
                            }}
                          >
                            {task.meals[mealTime]?.Delivery_Status || 'N/A'}
                          </td>




                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PantryHome;

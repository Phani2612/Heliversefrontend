// import React, { useState } from 'react';
// import './styles/MealPlan.css'; // Import custom CSS for styling
// import Navbar from './Navbar';
// import Modal from './MealModal';
// import axios from 'axios';
// import {useParams} from 'react-router-dom'
// import Swal from 'sweetalert2'

// function MealPlan() {
  // const [showMorningModal, setShowMorningModal] = useState(false);
  // const [showAfternoonModal, setShowAfternoonModal] = useState(false);
  // const [showEveningModal, setShowEveningModal] = useState(false);

  // const [Mealdata , setMealdata] = useState({})

  // const {OID} = useParams()

  // const GatherData = (data, shift) => {
  //   console.log('Data' , data)

  //   setMealdata((prev) => ({
  //     ...prev,
  //     [shift]: data[shift], // Store meal data for the specific shift
  //   }));
  // };



//   const HandleSubmit = async()=>{
//     const User_Email = localStorage.getItem('User_Email')

//     const PayLoad = {

//         Email : User_Email,
//         MealShifts : Mealdata,
//         OID : OID

//     }

//        try{

      
        

//         const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/meal/save` , PayLoad)

//         const {message} = response.data

//         Swal.fire({

//           title : 'Success!',
//           text : message,
//           icon :'success'
//         })

//        }

//        catch(error){

//           console.error(error)
//           Swal.fire({

//             title : 'error!',
//             text : error.response.data.message,
//             icon : 'error'
//           })
//        }
//   }






//   return (
//     <div className="mealplan-container">
        

//       <h1>Create Diet Chart</h1>
//       <p>Plan meals for Morning, Afternoon, and Evening.</p>
//       <div className="mealplan-buttons-container">
//         <button className="mealplan-btn" onClick={() => setShowMorningModal(true)}>Plan Morning Meal</button>
//         <button className="mealplan-btn" onClick={() => setShowAfternoonModal(true)}>Plan Afternoon Meal</button>
//         <button className="mealplan-btn" onClick={() => setShowEveningModal(true)}>Plan Evening Meal</button>
//       </div>

//       {showMorningModal && (
//         <Modal
//           title="Morning Meal Plan"
//           shift="morning"
//           onClose={() => setShowMorningModal(false)}
//           onSave={() => {
//             setShowMorningModal(false);
//             alert('Morning meal saved!');
//           }}

//           onShare = {GatherData}
//         />
//       )}

//       {showAfternoonModal && (
//         <Modal
//           title="Afternoon Meal Plan"
//           shift="afternoon"
//           onClose={() => setShowAfternoonModal(false)}
//           onSave={() => {
//             setShowAfternoonModal(false);
//             alert('Afternoon meal saved!');
//           }}

//           onShare = {GatherData}
//         />
//       )}

//       {showEveningModal && (
//         <Modal
//           title="Evening Meal Plan"
//           shift="evening"
//           onClose={() => setShowEveningModal(false)}
//           onSave={() => {
//             setShowEveningModal(false);
//             alert('Evening meal saved!');
//           }}

//           onShare = {GatherData}
//         />
//       )}

// <button  onClick={HandleSubmit} type="button" class="btn btn-success">Submit</button>

//     </div>
//   );
// }

// export default MealPlan;





import React, { useState } from 'react';
import './styles/MealPlan.css'; // Import custom CSS for styling
import Navbar from './Navbar';
import Modal from './MealModal';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import AnotherNavbar from './AnotherNavbar';

// ... other imports

function MealPlan() {
  const [pantryStaffEmail, setPantryStaffEmail] = useState(''); // State to hold pantry staff email

  // Other existing code ...


  const User_Type  = localStorage.getItem('User_Type')
  
  const [showMorningModal, setShowMorningModal] = useState(false);
  const [showAfternoonModal, setShowAfternoonModal] = useState(false);
  const [showEveningModal, setShowEveningModal] = useState(false);

  const [Mealdata , setMealdata] = useState({})

  const {OID} = useParams()

  const GatherData = (data, shift) => {
    console.log('Data' , data)

    setMealdata((prev) => ({
      ...prev,
      [shift]: data[shift], // Store meal data for the specific shift
    }));
  };

  

  const HandleSubmit = async () => {
    const User_Email = localStorage.getItem('User_Email');

    console.log(Mealdata)

 
  

    const requiredShifts = ['morning', 'afternoon', 'evening'];
    const requiredFields = ['details', 'ingredients', 'instructions', 'status'];
  
      // Validate Mealdata
  for (const shift of requiredShifts) {
    if (!Mealdata[shift]) {
      Swal.fire({
        title: 'Info',
        text: `Please provide data for the ${shift} shift.`,
        icon: 'info',
      });
      return;
    }

    for (const field of requiredFields) {
      if (!Mealdata[shift][field] || Mealdata[shift][field].trim() === '') {
        Swal.fire({
          title: 'Info',
          text: `Please fill all required fields for the ${shift} shift.`,
          icon: 'info',
        });
        return;
      }
    }
  }



    const PayLoad = {
      Email: User_Email,
      MealShifts: Mealdata,
      PantryStaffEmail: pantryStaffEmail, // Include the pantry staff email in the payload
      OID: OID,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/meal/save`, PayLoad , {withCredentials : true});

      const { message } = response.data;

      Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        icon: 'error',
      });
    }
  };


  if(User_Type != 'Manager'){
    return (
      <h1>You don't have access to view this Dashboard , Raise a request for Manager access</h1>
    )
  }



  return (
    <div>

      <AnotherNavbar/>
      
      <div className="mealplan-container">

      

{/* Existing elements */}
<h1>Create Diet Chart</h1>
<p>Plan meals for Morning, Afternoon, and Evening.</p>

<div className="meal-form-container">
<div className="meal-form-group">
<label htmlFor="pantryStaffEmail">Assign Pantry Staff Email:</label>
<input
type="email"
id="pantryStaffEmail"
className="form-control"
value={pantryStaffEmail}
onChange={(e) => setPantryStaffEmail(e.target.value)}
placeholder="Enter pantry staff email"
required
/>
</div>
</div>


<div className="mealplan-buttons-container">
  <button className="mealplan-btn" onClick={() => setShowMorningModal(true)}>
    Plan Morning Meal
  </button>
  <button className="mealplan-btn" onClick={() => setShowAfternoonModal(true)}>
    Plan Afternoon Meal
  </button>
  <button className="mealplan-btn" onClick={() => setShowEveningModal(true)}>
    Plan Evening Meal
  </button>
</div>

{/* Existing modals */}
{showMorningModal && (
  <Modal
    title="Morning Meal Plan"
    shift="morning"
    onClose={() => setShowMorningModal(false)}
    onSave={() => {
      setShowMorningModal(false);
      alert('Morning meal saved!');
    }}
    onShare={GatherData}
  />
)}

{showAfternoonModal && (
  <Modal
    title="Afternoon Meal Plan"
    shift="afternoon"
    onClose={() => setShowAfternoonModal(false)}
    onSave={() => {
      setShowAfternoonModal(false);
      alert('Afternoon meal saved!');
    }}
    onShare={GatherData}
  />
)}

{showEveningModal && (
  <Modal
    title="Evening Meal Plan"
    shift="evening"
    onClose={() => setShowEveningModal(false)}
    onSave={() => {
      setShowEveningModal(false);
      alert('Evening meal saved!');
    }}
    onShare={GatherData}
  />
)}

<button onClick={()=>HandleSubmit()} type="button" className="btn btn-success">
  Submit
</button>
</div>
    </div>
  );
}

export default MealPlan;

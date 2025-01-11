import React,{useState} from "react";
import "./styles/PatientDetailsForm.css";
import axios from 'axios'
import Swal, {swal} from 'sweetalert2'
import Loader from '../../Loader'

const PatientDetailsModal = ({ onClose }) => {
//   if (!isOpen) return null;

const [isLoading , setisLoading] = useState(false)

const [patientDetails, setPatientDetails] = useState({
    patientName: "",
    diseases: "",
    allergies: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    age: "",
    gender: "",
    contactInfo: "",
    emergencyContact: "",
    others: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Patient Details Submitted:", patientDetails);

    setisLoading(true)

    try{

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/save/patients` , patientDetails ,  {withCredentials : true})
        console.log(response.data)

        const {message , redirect_url} = response.data
        Swal.fire({
            title : 'Success!',
            text : message,
            icon:'success',
            timerProgressBar:2000
        })

        window.location.pathname = redirect_url
    }

    catch(error){

        Swal.fire({

            title : 'Error!!',
            text : error.response.data.message,
            icon : 'error',
            timerProgressBar:2000
        })
         
    }

    finally{

        setisLoading(false)
    }
  };

  return (
    <div className="patientdetails-modal-overlay">


    {isLoading && <Loader/>}


      <div className="patientdetails-modal">
        <button className="patientdetails-close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="patientdetails-modal-title">Manage Patient Details</h2>
        <form className="patientdetails-form" onSubmit={handleSubmit} >
          <div className="patientdetails-group">
            <label>Patient Name</label>
            <input type="text" name="patientName" placeholder="Enter patient name" required onChange={(e)=>handleChange(e)} />
          </div>
          <div className="patientdetails-group">
            <label>Diseases</label>
            <input type="text" name="diseases" placeholder="Enter diseases"  onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="patientdetails-group">
            <label>Allergies</label>
            <input type="text" name="allergies" placeholder="Enter allergies"  onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="patientdetails-row">
            <div className="patientdetails-group">
              <label>Room Number</label>
              <input type="text" name="roomNumber" placeholder="Enter room number" onChange={(e)=>handleChange(e)} />
            </div>
            <div className="patientdetails-group">
              <label>Bed Number</label>
              <input type="text" name="bedNumber" placeholder="Enter bed number" onChange={(e)=>handleChange(e)} />
            </div>
            <div className="patientdetails-group">
              <label>Floor Number</label>
              <input type="text" name="floorNumber" placeholder="Enter floor number" onChange={(e)=>handleChange(e)} />
            </div>
          </div>
          <div className="patientdetails-group">
            <label>Age</label>
            <input type="number" name="age" placeholder="Enter age" required onChange={(e)=>handleChange(e)}/>
          </div>
          <div className="patientdetails-group">
            <label>Gender</label>
            <select name="gender" required onChange={(e)=>handleChange(e)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="patientdetails-group">
            <label>Contact Information</label>
            <input type="text" name="contactInfo" placeholder="Enter contact information" onChange={(e)=>handleChange(e)} />
          </div>
          <div className="patientdetails-group">
            <label>Emergency Contact</label>
            <input type="text" name="emergencyContact" placeholder="Enter emergency contact" onChange={(e)=>handleChange(e)} />
          </div>
          <div className="patientdetails-group">
            <label>Others</label>
            <textarea name="others" placeholder="Add any additional details" onChange={(e)=>handleChange(e)}></textarea>
          </div>
          <button type="submit" className="patientdetails-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientDetailsModal;

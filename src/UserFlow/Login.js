// // LoginPage.js
// import React, { useState } from "react";
// import "./LoginPage.css";
// import axios from 'axios';
// import Swal from "sweetalert2";

// const LoginPage = () => {
//   const [Userdetails, setUserdetails] = useState({
//     email: '',
//     password: ''
//   });

//   const HandleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, Userdetails);
//       console.log(response.data);

//       const {message , redirect_url , User_OID , Auth_Token , User_Type} = response.data

//       Swal.fire({

//         title :'Sucess!',
//         text:message,
//         icon:'success'
//       })

//       localStorage.setItem('User_Email' , Userdetails.email)
//       localStorage.setItem('User_OID' , User_OID)
//       localStorage.setItem('Auth_Token' , Auth_Token)
//       localStorage.setItem('User_Type' , User_Type)

//       window.location.pathname = redirect_url

//     } catch (error) {
//       console.error(error);

//       if(error.response.status === 404){

//         Swal.fire({
         
//              title : 'Info!',
//              text : error.response.data.message,
//              icon : 'info'
//         })
//       }

//       Swal.fire({
            
//            title : 'Error!',
//            text : error.response.data.message,
//            icon : 'error'
//       })



//     }
//   };

//   return (
//     <div className="login-page-wrapper">
//       <div className="login-container">
//         <div className="login-card">
//           <h1 className="login-title">Welcome Back!</h1>
//           <form className="login-form" onSubmit={HandleSubmit}>
//             <div className="login-input-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="login-email"
//                 placeholder="Enter your email"
//                 required
//                 name="email"
//                 onChange={(e) => setUserdetails({ ...Userdetails, [e.target.name]: e.target.value })}
//               />
//             </div>
//             <div className="login-input-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="login-password"
//                 placeholder="Enter your password"
//                 required
//                 name="password"
//                 onChange={(e) => setUserdetails({ ...Userdetails, [e.target.name]: e.target.value })}
//               />
//             </div>

//             <button type="submit" className="login-button">Login</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;





import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [Userdetails, setUserdetails] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const { email, password } = Userdetails;
    let emailError = "";
    let passwordError = "";

    // Email validation
    if (!email) {
      emailError = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError = "Invalid email format.";
    }

    // Password validation
    // if (!password) {
    //   passwordError = "Password is required.";
    // } else if (password.length < 8) {
    //   passwordError = "Password must be at least 8 characters.";
    // } else if (!/[A-Z]/.test(password)) {
    //   passwordError = "Password must contain at least one uppercase letter.";
    // } else if (!/[a-z]/.test(password)) {
    //   passwordError = "Password must contain at least one lowercase letter.";
    // } else if (!/[0-9]/.test(password)) {
    //   passwordError = "Password must contain at least one number.";
    // } else if (!/[!@#$%^&*]/.test(password)) {
    //   passwordError = "Password must contain at least one special character.";
    // }

    setErrors({
      email: emailError,
      password: passwordError,
    });

    // Form is valid if there are no errors
    setIsFormValid(!emailError && !passwordError);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    validateForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      Swal.fire({
        title: "Error!",
        text: "Please correct the errors in the form.",
        icon: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        Userdetails , 
        // { withCredentials: true } // Ensure cookies are included
      );

      const { message, redirect_url, User_OID, Auth_Token, User_Type } =
        response.data;

      Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
      });

      localStorage.setItem("User_Email", Userdetails.email);
      localStorage.setItem("User_OID", User_OID);
      localStorage.setItem("Auth_Token", Auth_Token);
      localStorage.setItem("User_Type", User_Type);

      window.location.pathname = redirect_url;
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
      });
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Welcome Back!</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="login-email"
                placeholder="Enter your email"
                name="email"
                value={Userdetails.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="login-password"
                placeholder="Enter your password"
                name="password"
                value={Userdetails.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={!isFormValid}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import glogo from "../glogo.png";
import '../Dashboard/Dashboard.css';
import '../SignUp/SignUp.css';

function Login() {
  const navigate = useNavigate(); 
  const [formvalue, setFormvalue] = useState({
    email: "",
    password: "",
    referral: ""   
  });

  const handleInput = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = { email: formvalue.email, password: formvalue.password };
    try {
      const res = await axios.post("http://localhost/growmore/login.php", formData);
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data['data']));
        toast.success("Login successful!", {
          // position: toast.POSITION.TOP_CENTER
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        toast.error(res.data.message, {
          // position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        // position: toast.POSITION.TOP_CENTER
      });
    }
  };

  return (
    <div className="container main d-flex flex-column justify-content-center align-items-center">
      <div>
        <img src={glogo} className="grow-logo position-static" alt="logo" />
      </div>
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4 bg-light rounded-5 p-5 shadow">
          <div className="text-center mb-4">
            <h3 className="font-weight-bold mb-3">Login</h3>
            <p className="text-muted w-auto">Welcome! Please enter your details.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                id="email"
                required
                name="email"
                value={formvalue.email}
                onChange={handleInput}
                type="email"
                placeholder="Enter email"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                value={formvalue.password}
                onChange={handleInput}
                className="form-control"
              />
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" id="remember" name="remember" className="form-check-input" required />
              <label htmlFor="remember" className="form-check-label">
                I accept the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>
            <div className="d-flex w-100 justify-content-center">
              <Button type="submit" variant="outline-success" className="w-25 p-1">LogIn</Button>
            </div>
            <p className="text-muted text-center w-auto">
              If you are a new User <a className="font-weight-bold" href="/signup">Register</a>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;


// function Login() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [referralCode, setReferralCode] = useState('');
//   const [otp, setOtp] = useState('');

//   const sendData = async (event) => {
//     event.preventDefault();
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };
//     const body = JSON.stringify({
//       phoneNumber,
//       referralCode
//     });
//     try {
//       const response = await axios.post('http://localhost:5000/user/register', body, config);
//       const data = response.data;
//       alert(data.message);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleVerifyOtp = async (event) => {
//     event.preventDefault();
//     if (!otp || !phoneNumber) {
//       alert('Mobile number or OTP are missing');
//     }
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };
//     const body = JSON.stringify({
//       mobileNumber: phoneNumber,
//       otp: otp
//     });
//     try {
//       const response = await axios.post('http://localhost:5000/user/verify', body, config);
//       const data = response.data;
//       alert(data.message);
//       if (data.success === true) {
//         window.location.href = 'http://localhost:5173/dashboard';
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       alert(error);
//     }
//   };

//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       {/* <Route path="/payment" element={<Payment />} /> */}
//       <Route path="/history" element={<Admin />} />
//     </Routes>
//   );
// }


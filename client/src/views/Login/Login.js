import axios from 'axios';
import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../Dashboard/Dashboard.css';
// import Payment from '../../Razorpay/Payment';
import Admin from '../Admin/Admin';
// import PaymentSuccess from '../../Razorpay/PaymentSuccess';
import { useNavigate } from 'react-router-dom';
import glogo from "./glogo.png";
import '../SignUp/SignUp.css'
const Home = () => {
  const navigate = useNavigate(); 
  const [message, setMessage] = useState('');
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
    console.log(formvalue); 
    const formData = { email: formvalue.email, password: formvalue.password };
    const res = await axios.post("http://localhost/growmore/login.php", formData);
    setMessage(res.data['message']);
    if(res.data.success){ 
      localStorage.setItem('user', JSON.stringify(res.data['data']));
      setTimeout(() => {
        navigate('/dashboard');
        // window.location.reload();
      }, 900);
    }
  };

  return (
    <div className="container main d-flex flex-column justify-content-center align-items-center  ">
    <div>     <img src={glogo} className="grow-logo position-static "></img></div>
         
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4 bg-light rounded-5 p-5 shadow "> {/* Change the bg-white to bg-light or any other class for different background color */}
          <div className="text-center mb-4 ">
    
            <h3 className="font-weight-bold mb-3">Login</h3>
            <p className="text-muted w-auto ">Welcome! Please enter your details.</p>
            <h6 className="text-danger">{message}</h6>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                id="email"
                required
                name='email'
                value={formvalue.email}
                onChange={handleInput}
                type="email"
                placeholder='Enter email'
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

            <div className='d-flex w-100 justify-content-center '>
            <Button type='submit' variant="outline-success" className='w-25 p-1 '>LogIn</Button>{' '} 
            </div>

            <p className="text-muted text-center w-auto">
              If you are new User <a className="font-weight-bold" href="/signup">Register</a>
             
            </p>
          </form>
         
        </div>
      </div>
    </div>
  );
};

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [otp, setOtp] = useState('');

  const sendData = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({
      phoneNumber,
      referralCode
    });
    try {
      const response = await axios.post('http://localhost:5000/user/register', body, config);
      const data = response.data;
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    if (!otp || !phoneNumber) {
      alert('Mobile number or OTP are missing');
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({
      mobileNumber: phoneNumber,
      otp: otp
    });
    try {
      const response = await axios.post('http://localhost:5000/user/verify', body, config);
      const data = response.data;
      alert(data.message);
      if (data.success === true) {
        window.location.href = 'http://localhost:5173/dashboard';
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/payment" element={<Payment />} /> */}
      <Route path="/history" element={<Admin />} />
    </Routes>
  );
}

export default Login;

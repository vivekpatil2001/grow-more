import axios from 'axios';
import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
// import Payment from '../../Razorpay/Payment';
import Admin from '../Admin/Admin';
// import PaymentSuccess from '../../Razorpay/PaymentSuccess';
import { useNavigate } from 'react-router-dom';

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
    const formData = { email: formvalue.email, password: formvalue.password, referral: formvalue.referral };
    const res = await axios.post("http://localhost/growmore/login.php", formData);
    setMessage(res.data['message']);
    if(res.data.success){ 
      localStorage.setItem('user', JSON.stringify(res.data['data']));
      setTimeout(() => {
        navigate('/dashboard');
        window.location.reload();
      }, 900);
    }
  };

  return (
    <div className="container py-5 mt-5  ">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 bg-light p-4 p-5 shadow-sm"> {/* Change the bg-white to bg-light or any other class for different background color */}
          <div className="text-center mb-4 ">
            <h3 className="font-weight-bold mb-3">Registration</h3>
            <p className="text-muted">Welcome! Please enter your details.</p>
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
            <div className="form-group mb-3">
              <input
                type="text"
                id="referral"
                name="referral"
                placeholder="Referral (optional)"
                className="form-control"
                value={formvalue.referral}
                onChange={handleInput}
              />
            </div>

            <div className="form-check mb-3">
              <input type="checkbox" id="remember" name="remember" className="form-check-input" required />
              <label htmlFor="remember" className="form-check-label">
                I accept the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="btn btn-dark w-100 mb-3">Login</button>

            <p className="text-muted text-center">
              By creating an account you agree to our <br />
              <a className="font-weight-bold" href="#">Terms of Service</a> and <a className="font-weight-bold" href="#">Privacy Policy</a>
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

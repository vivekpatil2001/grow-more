import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../SignUp/SignUp.css'
function SignUp() {
    const navigate = useNavigate(); 
  const [message, setMessage] = useState('');
  const [formvalue, setFormvalue] = useState({
    username: "" ,  
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
    const formData = { username:formvalue.username,email: formvalue.email, password: formvalue.password, referral: formvalue.referral };
    const res = await axios.post("http://localhost/growmore/signup.php", formData);
    setMessage(res.data['message']);
    if(res.data.success){ 
      localStorage.setItem('user', JSON.stringify(res.data['data']));
      setTimeout(() => {
        navigate('/');
      }, 900);
    }
  };

  return (
    <div className="container mt-4  ">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 bg-light p-3 m-4 shadow-sm rounded-4" > {/* Change the bg-white to bg-light or any other class for different background color */}
          <div className="text-center mb-4 ">
            <h3 className="font-weight-bold mb-3">Registration</h3>
            <p className="text-muted">Welcome! Please enter your details.</p>
            <h6 className="text-danger">{message}</h6>
          </div>
          
          <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
              <input
                id="username"
                required
                name='username'
                value={formvalue.username}
                onChange={handleInput}
                type="text"
                placeholder='Enter your full name'
                className="form-control"
              />
            </div>
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
            <div className='d-flex w-100 justify-content-center '>
            <Button type='submit' variant="outline-success" className='w-25 p-1 '>Sign Up</Button>{' '}
            </div>
            

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

export default SignUp













































































// import React, {useEffect } from "react";
// import "./SignUp.css";
// import Aos from "aos";
// import "aos/dist/aos.css";
// import Navbar from "../../components/Navbar/Navbar";


// function SignUp() {
//   useEffect(() => {
//     Aos.init();
//   }, []);

// //   const [url, setUrl] = useState('https://product.geniusocean.com/genius-hyip-light?reff=3266dcfa238c067719a09f1eabc4e1b4');
//  return (
//   <div>
// <Navbar/>
// <div className="main">

//             <div className="box ">
//                 <form action="" data-aos="fade-up"
//      data-aos-anchor-placement="center-bottom"   data-aos-duration="3000">


//                     <div className="border-b border-gray-900/10 pb-12 form">

//                         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                            {/* <img src={logo} height={'100px'}/> */}
//                             <h1>SignUp</h1>
//                         </div>

//                         <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                             <div className="sm:col-span-3">
//                                 <label for="first-name" className="block text-sm font-medium leading-6 text-white">First
//                                     name</label>
//                                 <div className="mt-2">
//                                     <input type="text" name="first-name" id="first-name" autocomplete="given-name"
//                                         className="input block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//                                 </div>
//                             </div>

//                             <div className="sm:col-span-3">
//                                 <label for="last-name" className="block text-sm font-medium leading-6 text-white">Last
//                                     name</label>
//                                 <div className="mt-2">
//                                     <input type="text" name="last-name" id="last-name" autocomplete="family-name"
//                                         className="block input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//                                 </div>
//                             </div>

//                             <div className="sm:col-span-4">
//                                 <label for="email" className=" inputblock text-sm font-medium leading-6 text-white">Email
//                                     address</label>
//                                 <div className="mt-2">
//                                     <input id="email" name="email" type="email" autocomplete="email"
//                                         className="block w-full input rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//                                 </div>
//                             </div>

                          

//                             <div className="col-span-full">
//                                 <label for="street-address"
//                                     className="block text-sm font-medium leading-6 text-white">Street
//                                     address</label>
//                                 <div className="mt-2">
//                                     <input type="text" name="street-address" id="street-address"
//                                         autocomplete="street-address"
//                                         className="block input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//                                 </div>
//                             </div>

//                             <div className="sm:col-span-2 sm:col-start-1">
//                                 <label for="city" className="  block text-sm font-medium leading-6 text-white">City</label>
//                                 <div className="mt-2">
//                                     <input type="text" name="city" id="city" autocomplete="address-level2"
//                                         className="block w-full input rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//                                 </div>
//                             </div>

//                             <div className="sm:col-span-2">
//                                 <label for="region" className=" block text-sm font-medium leading-6 text-white">State /
//                                     Province</label>
//                                 <div className="mt-2">
//                                     <input type="text" name="region" id="region" autocomplete="address-level1"
//                                         className="block w-full input rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//                                 </div>
//                             </div>

//                             <div className="sm:col-span-2">
//                                 <label for="postal-code" className="block text-sm font-medium leading-6 text-white">ZIP /
//                                     Postal
//                                     code</label>
//                                 <div className="mt-2">
//                                     <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code"
//                                         className="block w-full input rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//                                 </div>
//                             </div>
//                         </div>
//                         <div>
//                             <button type="submit"
//                                 className="mt-8 flex w-full input text-white justify-center rounded-md bg-danger px-3 py-1.5 text-lg font-semibold leading-6  shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><a
//                                     href="/">Sign up </a></button>
//                                     <p className='text-center text-white'>Already have an account ?Login</p>
//                         </div>
//                     </div>

//                 </form>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default SignUp
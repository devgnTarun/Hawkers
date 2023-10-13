import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'
import googleImg from '../../../Images/google.png'
import axios from 'axios';
import {useDispatch} from 'react-redux'

const VendorLogin = () => {

    const [vendorEmail, setVendorEmail] = useState("")
    const [vendorPassword, setVendorPassword] = useState("")

    const handleGoogleLogin = async () => {
      try {
        // Make a GET request to the /auth/success route to obtain the JWT token
        const response = await axios.get('http://localhost:5000/auth/vendor/success');
    
        // Extract the JWT token from the response
        const { token } = response.data;
    
        // Store the token in local storage for later use
        localStorage.setItem('auth_token', token);
    
        // Perform any other necessary actions, such as redirecting to the user dashboard
      } catch (error) {
        // Handle any errors, e.g., display an error message or redirect to an error page
      }
    };

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const isGoogleLogin = urlParams.get('http://localhost:5000/vendor/success');
  
      if (isGoogleLogin) {
        console.log('logged') 
        handleGoogleLogin()
      }
      handleGoogleLogin()
    }, []);
  

  return (
    <form className='main_form '>
    <h3>Login as Vendor</h3>
    <input value={vendorEmail} onChange={(e) => setVendorEmail(e.target.value)} className='rounded-[5px]' type="email" name="vendorEmail" id="email" placeholder='user@gmail.com' />
    <input value={vendorPassword} onChange={(e) => setVendorPassword(e.target.value)} className='rounded-[5px]' type="password" name="vendorPassword" id="password" placeholder='Enter Your Password' />
    <button className='bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-[5px]'>Login</button>
    <Link className='text-sky-600' to='/vendor/register'> Not Having Account? Register</Link>
      <div className="or_box">
        <div></div> <span>Or</span> <div></div>
      </div>
      <div className="sign_google"  onClick={() => {
            window.location.href = 'http://localhost:5000/auth/google'; // Replace with your actual Google OAuth route
          }}>
        <img src={googleImg} alt="google"  />
        <span>Sign In Using Google</span>
      </div>
  </form>
  )
}

export default VendorLogin
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import googleImg from '../../../Images/google.png'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../../Action/userAction';
import axios from 'axios';


const UserLogin = () => {


  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { loading } = useSelector(state => state.user)



  const loginUser = async (e) => {
    e.preventDefault();

    dispatch(userLogin({ email, password }))

  }

  const handleGoogleLogin = async () => {
    try {
      // Make a GET request to the /auth/success route to obtain the JWT token
      const response = await axios.get('http://localhost:5000/auth/success');
  
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
    const isGoogleLogin = urlParams.get('http://localhost:5000/auth/success');

    if (isGoogleLogin) {
      console.log('logged') 
      handleGoogleLogin()
    }
    handleGoogleLogin()
  }, []);


  return (


    <>
      <form className='main_form '>
        <h3>Login as User</h3>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-[5px]' type="email" name="email" id="email" placeholder='user@gmail.com' />
        <input value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-[5px]' type="password" name="password" id="password" placeholder='Enter Your Password' />

        {loading ? <button style={{ color: "black" }} disabled className='bg-gray-200 rounded-[5px] flex items-center justify-center  '>  <div className="mx-3 animate-spin rounded-full w-[20px] h-[20px] border-t-2 border-b-2 border-yellow-300"></div> Loading...</button> :
          <button type='button' onClick={loginUser} className='bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-[5px]'>Login</button>
        }

        <Link className='text-sky-600' to='/user/register'> Not Having Account? Register</Link>
        <div className="or_box">
          <div></div> <span>Or</span> <div></div>
        </div>
        <div className="sign_google"   onClick={() => {
            window.location.href = 'http://localhost:5000/auth/google'; // Replace with your actual Google OAuth route
          }}>
          <img src={googleImg} alt="google" />
          <span>Sign In Using Google</span>
        </div>
      </form>
    </>
  )
}

export default UserLogin
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import googleImg from '../../../Images/google.png'
import {useDispatch, useSelector} from 'react-redux'
import { userLogin } from '../../../Action/userAction';


const UserLogin = () => {


    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading} = useSelector(state => state.user)

  
    const loginUser = async (e) => {
      e.preventDefault();

      dispatch(userLogin({email, password}))

    }
    
  
  return (

    
   <>
       <form className='main_form '>
              <h3>Login as User</h3>
              <input value={email}  onChange={(e) => setEmail(e.target.value)}  className='rounded-[5px]' type="email" name="email" id="email" placeholder='user@gmail.com' />
              <input value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-[5px]' type="password" name="password" id="password" placeholder='Enter Your Password' />
             
              {loading ? <button style={{color : "black"}} disabled className='bg-gray-200 rounded-[5px] flex items-center justify-center  '>  <div className="mx-3 animate-spin rounded-full w-[20px] h-[20px] border-t-2 border-b-2 border-yellow-300"></div> Loading...</button> : 
              <button  type='button' onClick={loginUser} className='bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-[5px]'>Login</button>
            }

              <Link className='text-sky-600' to='/user/register'> Not Having Account? Register</Link>
              <div className="or_box">
                <div></div> <span>Or</span> <div></div>
              </div>
              <div className="sign_google">
                <img src={googleImg} alt="google"  />
                <span>Sign In Using Google</span>
              </div>
            </form>
   </>
  )
}

export default UserLogin
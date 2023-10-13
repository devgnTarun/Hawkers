import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import googleImg from '../../../Images/google.png'
import {useDispatch} from 'react-redux'

const VendorLogin = () => {

    const [vendorEmail, setVendorEmail] = useState("")
    const [vendorPassword, setVendorPassword] = useState("")

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
      <div className="sign_google">
        <img src={googleImg} alt="google"  />
        <span>Sign In Using Google</span>
      </div>
  </form>
  )
}

export default VendorLogin
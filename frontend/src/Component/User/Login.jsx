// src/components/LoginPage.js
import React, { useEffect, useState } from 'react';
import Particles from '../Utils/Particles';
import VendorLogin from './Forms/VendorLogin';
import UserLogin from './Forms/UserLogin';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearError } from '../../Action/userAction';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {
  
  const dispatch = useDispatch();
  const history = useHistory()
  const [isVendor, setIsVendor] = useState(false);
  const handleToggle = () => {
    setIsVendor(!isVendor);
  };

  const { isAuth, error} = useSelector(state => state.user)

  useEffect(() => {
    if(error) {
      toast.error(`Error : ${error}`)
      dispatch(clearError())
    }
    if(isAuth) {
      history.push('/')
    }
  }, [history , dispatch , error , isAuth])
  

  return (
    <div style={{ overflow: "hidden", position: "relative" }} className="min-h-screen ">
      <div className="bg_img login_img"></div>
      <Particles />
      <div className="login_page_box shadow-2xl border-[0.2px] border-gray-200 rounded-lg overflow-hidden">


        {/* button group  */}
        <div className="flex items-center justify-center   gap-8 w-[100%] ">
         
          <div
            className={`cursor-pointer text-gray-800 w-[30%] border-b-2 py-4  text-center ${isVendor ? '' : 'border-yellow-500 text-yellow-500'
              } text-[14px]`}
            onClick={handleToggle}
          >
            <i className="fa-solid fa-user"></i>
            <h1>User</h1>
          </div>

          <div
            className={`cursor-pointer text-gray-800 w-[30%] border-b-2 py-4  text-center  text-[14px] ${!isVendor ? '' : 'border-yellow-500 text-yellow-500'
              } `}
            onClick={handleToggle}
          >
            <i className="fa-solid fa-shop"></i>
            <h1>Vendor</h1>
          </div>
        </div>

        {isVendor ? <>
          {/* vendor login  */}
          <VendorLogin/>
        </>
          :
          <>
            {/* user login  */}
         <UserLogin/>
          </>
        }




      </div>
    </div>
  );
};

export default Login;

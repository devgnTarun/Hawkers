import React, { useEffect, useState } from 'react'
import Particles from '../Utils/Particles'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import googleImg from '../../Images/google.png'
import { clearError, userRegister } from '../../Action/userAction'
import { useDispatch , useSelector} from 'react-redux'
import { toast } from 'react-toastify';


const UserRegister = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth, error, loading, success} = useSelector(state => state.user);


  useEffect(() => {
    if(error) {
      toast.error(`Error : ${error}`)
      dispatch(clearError())
    }
    if(isAuth) {
      history.push('/')
    }
    if(success) {
      history.push('/')
      toast.success("Verification link sended on your email! Verify to access id")
    }
  }, [history , dispatch , error , isAuth, success])


  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(userRegister({name, email , password}))
  }


  return (
    <div style={{ overflow: "hidden", position: "relative" }} className="min-h-screen ">

      <div className="bg_img login_img"></div>
      <Particles />
      <div className="login_page_box shadow-2xl border-[0.2px] border-gray-200 rounded-lg overflow-hidden">
        <h1 className='text-gray-900 text-lg text-center mx-auto py-3 w-full bg-gray-200'>Register User</h1>

        {/* User register phone  */}
        <form className="main_form">
          <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className='rounded-[5px]' placeholder='Your name ' />
          <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className='rounded-[5px]' placeholder='dev@mail.com' />
          <input type="password" name="password" placeholder='Your password!' id="" value={password} onChange={e => setPassword(e.target.value)} className='rounded-[5px]' />
          {loading ? <button style={{color : "black"}} disabled className='bg-gray-200 rounded-[5px] flex items-center justify-center  '>  <div className="mx-3 animate-spin rounded-full w-[20px] h-[20px] border-t-2 border-b-2 border-yellow-300"></div> Loading...</button> : 
              <button  type='button' onClick={handleSubmit} className='bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-[5px]'>Register</button>
            }
          <Link className='text-sky-600' to='/login'> Not Having Account? Register</Link>
          {/* OAuth */}

          <div className="or_box">
            <div></div> <span>Or</span> <div></div>
          </div>
          <div className="sign_google">
            <img src={googleImg} alt="google" />
            <span>Sign In Using Google</span>
          </div>
        </form>
      </div>


    </div>
  )
}

export default UserRegister
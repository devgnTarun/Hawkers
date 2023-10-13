import axios from "axios"
import { CLEAR_ERROR, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../Constants/userConstants"


export const userLogin = ({email, password}) =>  async (dispatch) => {
    try {
        dispatch({type : LOGIN_REQUEST})


        await axios.post("http://localhost:5000/api/user/login", {email, password})
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("auth_token" , token)

          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data,
          });
        })

    } catch (error) {
        dispatch({
            type : LOGIN_FAIL,
            payload : error.response.data.message
        })
    }
}

// Register user 

export const userRegister = ({name, email , password}) =>  async (dispatch) => {
    try {
        dispatch({type : REGISTER_USER_REQUEST})

        await axios.post("http://localhost:5000/api/user/register", {name, email , password})
        .then((response) => {

          dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: response.data,
          });
          
        })

    } catch (error) {
        dispatch({
            type : REGISTER_USER_FAIL,
            payload : error.response.data.message
        })
    }
}

//Clearing all errors
export const clearError = () => async (dispatch)=>{
    dispatch({type : CLEAR_ERROR})
}
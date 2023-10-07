import axios from "axios"
import { CLEAR_ERROR, LOGIN_FAIL, LOGIN_REQUEST } from "../Constants/userConstants"


export const userLogin = (data) =>  async (dispatch) => {
    try {
        dispatch({type : LOGIN_REQUEST})

        const {data} = await axios.post('/api/user/login' , data)
        const token = data.token;

        localStorage.setItem('auth_token' , token )

    } catch (error) {
         dispatch({
            type : LOGIN_FAIL,
            payload : error.response.data.message
        })
    }
}

//Clearing all errors
export const clearError = () => async (dispatch)=>{
    dispatch({type : CLEAR_ERROR})
}
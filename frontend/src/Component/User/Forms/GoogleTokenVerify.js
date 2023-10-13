import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'

const GoogleTokenVerify = () => {

    const history = useHistory();
    const params = useParams()

        useEffect(() => {
         if(localStorage.getItem('auth_token')) {
           return history.push('/')
         }
         else {
            const token = params.token;
            localStorage.setItem('auth_token' , token)
         }

        }, [params , history])
        
  return (
    <div>Verifying login</div>
  )
}

export default GoogleTokenVerify
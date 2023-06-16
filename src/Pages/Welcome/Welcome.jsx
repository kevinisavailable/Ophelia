import React, { useEffect } from 'react'
import { account } from '../../Services/Appwrite/AppwriteConfig';
import { useNavigate } from 'react-router-dom';

const successUrl = import.meta.env.VITE_SUCCESS_URL
const failureUrl = import.meta.env.VITE_FAILURE_URL
const Welcome = () => {
    const navigate = useNavigate()
    useEffect(() => {
      async function checkSession(){
           const user =  await account.get()
            if(user){
              navigate('/dashboard')
            }
      }
      checkSession()
    }, [])
    
    async function createSession(){
        account.createOAuth2Session('google' ,successUrl , failureUrl);
    }
  return (
    <div onClick={()=>createSession()}>
       Click to Login
    </div>
  )
}

export default Welcome
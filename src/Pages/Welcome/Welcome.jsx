import React, { useEffect } from 'react'
import { account } from '../../Services/Appwrite/AppwriteConfig';
import { useNavigate } from 'react-router-dom';

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
        account.createOAuth2Session('google' ,'http://127.0.0.1:5173/dashboard' , 'http://127.0.0.1:5173/');
    }
  return (
    <div onClick={()=>createSession()}>
       Click to Login
    </div>
  )
}

export default Welcome
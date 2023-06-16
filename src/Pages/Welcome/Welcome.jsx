import React, { useEffect } from 'react'
import { account } from '../../Services/Appwrite/AppwriteConfig';
import { useNavigate } from 'react-router-dom';
import WelcomeHero from '../../Components/Welcome/WelcomeHero';

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
  return (
    <WelcomeHero />
  )
}

export default Welcome
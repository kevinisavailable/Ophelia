import React, { useEffect, useState } from 'react'
import DashboardWelcome from './DashboardWelcome'
import DashboardCredentialsData from './DashboardCredentialsData'
import { useSearchParams } from 'react-router-dom';

const DashboardComponent = () => {
  const [searchParams] = useSearchParams()
  const [id , setId] = useState('')
  useEffect(() => {
    const credentialsId = searchParams.get('id')
    setId(credentialsId)
  }, [searchParams])
  
 
  return (
    <div>
        <DashboardWelcome />
        {id ?  ( <DashboardCredentialsData id={id}/>) : (<><h3>Add a new Credential <br /> Or Click on the existing credential to view</h3></>)}
    </div>
  )
}

export default DashboardComponent
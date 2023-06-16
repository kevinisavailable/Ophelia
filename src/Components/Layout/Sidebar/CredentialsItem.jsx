import { rem } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CredentialsItem = ({credential}) => {
  const navigate = useNavigate()
  return (
    <a
    style={{textDecoration :'none' , cursor:'pointer'}}
    onClick={() =>{navigate(`/dashboard?id=${credential.$id}`)} }
    key={credential.$id}>
    <span style={{ marginRight: rem(9), fontSize: rem(16) }}>{"🔒"}</span>{' '}
    {credential.name}
  </a>
  )
}

export default CredentialsItem;
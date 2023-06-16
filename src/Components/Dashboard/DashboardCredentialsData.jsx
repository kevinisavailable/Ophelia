import { Button, Card, Input, Loader, PasswordInput, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { deleteACredential, getACredential, getUserByEmail } from '../../Services/Database/UserCollection'
import { useNavigate } from 'react-router-dom'
import FaceRecoginition from '../ImageVerification/FaceRecoginition'
import { account } from '../../Services/Appwrite/AppwriteConfig'

const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID
const usersBucketId = import.meta.env.VITE_USERS_BUCKET_ID

const DashboardCredentialsData = ({id}) => {
  const [credential , setCredential] = useState({})
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()
  const [open , setOpen] = useState(false)
  const [lock , setLock] = useState(true)
  const [imageUrl , setImageUrl] = useState('')
  const onClose = ()=> {setOpen(false)}

  useEffect(() => {
    async function getCredential(){
      setLoading(true)
      const credential = await getACredential(id)
      setCredential(credential)
      const user = await account.get()
      const userFromDb = await getUserByEmail(user.email)
      const imageId = userFromDb.documents[0].ImageId
      const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${usersBucketId}/files/${imageId}/view?project=${projectId}&mode=admin`
      setImageUrl(imageUrl)
      setLoading(false)
    }
    getCredential()
  }, [id])

  async function deleteCredential(){
    await deleteACredential(id)
    navigate('/')
  }
  return (
    <div style={{display:'flex' , justifyContent:'flex-start' , marginTop:'2rem'}}>
    <FaceRecoginition open={open} close={onClose} setLock={setLock} imageUrl={imageUrl}/>
    <Card shadow="sm" padding="xs" radius="md" withBorder style={{width:'50%'}}>
    <div style={{display:'flex' , justifyContent:'space-between'}}>
    <Text weight={500}>{credential.name}</Text>
    {loading &&  <><Loader variant="dots" /></>}
    </div>
    <div style={{margin:'3px 0px' , display:'flex' , flexDirection:'column' ,width:'50%'}}>
    <Input value={credential.id} style={{margin:'3px 0px'}} disabled={lock} readOnly/>
    <PasswordInput value={credential.password} disabled={lock}/>
    </div>
    <Text size="sm" color="dimmed">
       {credential.password}
      </Text>
      <div style={{display:'flex' , flexDirection:'row' , justifyContent:'flex-end' , columnGap:'5px' ,alignItems:'center'}}>
      {
        lock && (
          <Button variant="light" color="blue" radius="md" onClick={()=>setOpen(true)}>
          Verify to Unlock
        </Button>
        )
      }
      <Button variant='light' color='red' disabled={lock} onClick={deleteCredential}>Delete</Button>
      </div>
    </Card>      
    </div>
  )
}

export default DashboardCredentialsData
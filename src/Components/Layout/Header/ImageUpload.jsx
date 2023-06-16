import { Button, Modal } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";
import {  base64ToFile } from './ImageConversion';
import { getUserByEmail, uploadImageToBucket } from '../../../Services/Database/UserCollection';
import { account } from '../../../Services/Appwrite/AppwriteConfig';

const ImageUpload = ({isImageUploaded}) => {
  const [loading , setLoading] = useState(false)
  const [open , setOpen] = useState(false)
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    async() => {
      setLoading(true)
      const user = await account.get()
      const userFromDb = await getUserByEmail(user.email)
      // console.log(userFromDb)
      const imageSrc = webcamRef.current.getScreenshot();
      const file =  base64ToFile(imageSrc , userFromDb.documents[0].email);
      await uploadImageToBucket(userFromDb.documents[0] , file)
      setLoading(false)
      close()
    },
    [webcamRef]
  );

  useEffect(() => {
    if(!isImageUploaded){
      setOpen(true)
    }
  }, [isImageUploaded])
  

  const close = async()=>{
    const user = await account.get()
    const userFromDb = await getUserByEmail(user.email)
    if(userFromDb.documents[0].isImageUploaded === true){
      setOpen(false)
    }else{
      null
    }
  }
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  return (
       <Modal opened={open}  onClose={close} title="Capture Face For Auth" centered>
        <div>
            <Webcam 
            audio={false}
            ref={webcamRef}
            width='360px'
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            />
            <Button loading={loading} onClick={capture}>{loading ? "Capturing" : "Capture"}</Button>
        </div>
      </Modal>
  )
}

export default ImageUpload
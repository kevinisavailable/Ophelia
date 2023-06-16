import {
    Header,
    Container,
    Group,
    Button,
    Burger,
    rem,
  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useHeaderStyles } from './HeaderStyles';
import ImageUpload from './ImageUpload';
import { useEffect, useState } from 'react';
import { account } from '../../../Services/Appwrite/AppwriteConfig';

const HeaderComponent = ({isImageUploaded}) => {
  const [email , setEmail] = useState('')

  useEffect(() => {
    async function getUser(){
      const user = await account.get()
      setEmail(user.email)
    }
    getUser()
  }, [])
  
    const HEADER_HEIGHT = rem(60);
    const { classes } = useHeaderStyles();
    const [opened, { toggle }] = useDisclosure(false);
  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <ImageUpload isImageUploaded={isImageUploaded} email={email}/>
    <Container className={classes.inner} fluid>
      <Group>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        <h2>Ophelia</h2>
      </Group>
      <Button radius="xl" h={30} color='red'>
        Logout
      </Button>
    </Container>
  </Header>
  )
}

export default HeaderComponent


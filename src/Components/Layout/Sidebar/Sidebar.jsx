import {
    Navbar,
    Text,
    Group,
    ActionIcon,
    Tooltip,
  } from '@mantine/core';

import {IconPlus,IconSelector} from '@tabler/icons-react';
import { useSidebarStyles } from './sidebarStyles';
import CredentialsItem from './CredentialsItem';
import UserButton from './UserButton';
import { useEffect, useState } from 'react';
import { account } from '../../../Services/Appwrite/AppwriteConfig';
import { getCredentialsOfUser } from '../../../Services/Database/UserCollection';
import CredentialsForm from './CredentialsForm';

const Sidebar = () => {
    const [user , setUser] = useState({})
    const [credentials , setCredentials] = useState([])
    const { classes } = useSidebarStyles();
    const [open, setOpen] = useState(false)
    const collectionLinks = credentials.map((credential) => (
        <CredentialsItem credential={credential}/>
    ));

    useEffect(() => {
      async function getUser(){
        const user = await account.get()
        setUser(user);
        const credentialsArray = await getCredentialsOfUser(user.email)
        setCredentials(credentialsArray.documents)
      }
      getUser()
    }, [])
    
    const close = ()=>{setOpen(false)}
  return (
    <Navbar height={700} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <CredentialsForm open={open} close={close} />
    <Navbar.Section className={classes.section}>
    <UserButton
          image="https://i.imgur.com/fGxgcDF.png"
          name={user.name ? user.name : 'Loading...'}
          email={user.email ? user.email : 'Loading...'}
          icon={<IconSelector size="0.9rem" stroke={1.5} />}
        />
    </Navbar.Section>
    <Navbar.Section className={classes.section}>
      <Group className={classes.collectionsHeader} position="apart">
        <Text size="xs" weight={500} color="dimmed">
          Credentials
        </Text>
        <Tooltip label="Create New Credential" withArrow position="right">
          <ActionIcon variant="default" size={18}>
            <IconPlus size="0.8rem" stroke={1.5} onClick={()=>{setOpen(true)}}/>
          </ActionIcon>
        </Tooltip>
      </Group>
      <div className={classes.collections}>{collectionLinks}</div>
    </Navbar.Section>
  </Navbar>
  )
}

export default Sidebar
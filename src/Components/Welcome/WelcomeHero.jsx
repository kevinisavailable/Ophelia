import {
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    rem,
  } from '@mantine/core';
  import { IconCheck } from '@tabler/icons-react';
import { useHeroStyles } from './HeroStyles';
import image from '../../assets/HeroImg.svg'
import { account } from '../../Services/Appwrite/AppwriteConfig';

const successUrl = import.meta.env.VITE_SUCCESS_URL
const failureUrl = import.meta.env.VITE_FAILURE_URL

const WelcomeHero = () => {
    async function createSession(){
        account.createOAuth2Session('google' ,successUrl , failureUrl);
    }

    const { classes } = useHeroStyles();
    return (
      <div>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
            <span className={classes.highlight}>Ophelia</span>  <br /> <p style={{fontSize:'2rem'}}> An Open Source Password Manager</p>
              </Title>
              <Text color="dimmed" mt="md">
               Never Forget your passwords anymore. 
              </Text>
  
              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconCheck size={rem(12)} stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>Unlock Password using Biometric only</b>
                </List.Item>
                <List.Item>
                  <b>Free and open source</b> – all packages have MIT license.
                </List.Item>
                <List.Item>
                  <b>Saved to a Appwrite Database </b>
                </List.Item>
              </List>
  
              <Group mt={30}>
                <Button radius="xl" size="md" className={classes.control} onClick={createSession}>
                  Get started
                </Button>
                <a radius="xl" size="md" className={classes.control} href='https://github.com/kevinisavailable/Ophelia'>
                  Source code
                </a>
              </Group>
            </div>
            <Image  src={image} className={classes.image} />
          </div>
        </Container>
      </div>
  )
}

export default WelcomeHero
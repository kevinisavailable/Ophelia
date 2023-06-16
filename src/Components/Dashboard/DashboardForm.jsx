import { Button, Card, PasswordInput,Textarea, TextInput } from '@mantine/core';
import { useDashboardFormStyles } from './DashboardFormStyles';
import { useForm } from '@mantine/form';
import { createCredentailsForUser } from '../../Services/Database/UserCollection';
import { account } from '../../Services/Appwrite/AppwriteConfig';

const DashboardForm = ({width , onClose}) => {
  const { classes } = useDashboardFormStyles()

  async function createCredentials(){
    const userEmail = (await account.get()).email
    const credentialObj = form.values
    credentialObj.user = userEmail
    await createCredentailsForUser(credentialObj)
    onClose()
    window.location.reload()
  }

  const form = useForm({
    initialValues: {
      name: '',
      id: '',
      password : '',
      Description : ''
    }
  });

  return (
    <Card withBorder radius="md" p="xl" className={classes.card} title='Demo' style={{width:width ? width : '50%'}}>
    <form onSubmit={form.onSubmit(createCredentials)}>
    <TextInput placeholder="Enter the Name of Credentials" label="Name"  required  
      value={form.values.name}
      onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}/>

    <TextInput placeholder="Enter the Id" label="ID"  required
     value={form.values.id}
     onChange={(event) => form.setFieldValue('id', event.currentTarget.value)}/>

    <PasswordInput label="Password" placeholder="Your password" required mt="md" 
     value={form.values.password}
     onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}/>

    <Textarea label="Description" placeholder="Additional Info"  
     value={form.values.Description}
     onChange={(event) => form.setFieldValue('Description', event.currentTarget.value)}/>

    <Button type="submit" radius="xl">
      Create
    </Button>
     </form>
    </Card >
  );

}

export default DashboardForm
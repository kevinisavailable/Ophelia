import { AppShell, Navbar, Header } from '@mantine/core';
import Sidebar from './Sidebar/Sidebar';
import HeaderComponent from './Header/Header';

const Layout = ({children , isImageUploaded}) => {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{<Sidebar />}</Navbar>}
      header={<Header height={60} p="xs">{<HeaderComponent isImageUploaded={isImageUploaded}/>}</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
        {children}
    </AppShell>
  )
}

export default Layout
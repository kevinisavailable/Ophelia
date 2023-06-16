import { TypeAnimation } from "react-type-animation"

const DashboardWelcome = () => {
    return (
        <TypeAnimation
          sequence={[
            `Welcome to Ophelia`,
            1000, 
            `Manage your passwords safely with Ophelia`,
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '2em', display: 'inline-block' }}
          repeat={0}
        />
      )
}

export default DashboardWelcome
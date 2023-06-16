import { Modal } from '@mantine/core'
import React from 'react'
import DashboardForm from '../../Dashboard/DashboardForm'

const CredentialsForm = ({open , close}) => {
  return (
    <div>
        <Modal opened={open}  onClose={close} title="Add New Credentials" centered>
            <DashboardForm width={'100%'} onClose={close}/>
        </Modal>
    </div>
  )
}

export default CredentialsForm
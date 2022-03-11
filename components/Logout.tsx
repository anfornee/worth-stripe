import React, { ReactElement } from 'react'
import { auth } from '../firebase/firebaseClient'
import Button from '@mui/material/Button'

interface Props {}

const Logout = ({}: Props): ReactElement => {
  const handleLogoutClicked= async () => {
    return await auth.signOut()
  }

  return (
    <div>
      <Button
        variant='contained'
        onClick={handleLogoutClicked}
      >
        Log Out
      </Button>
    </div>
  )
}

export default Logout

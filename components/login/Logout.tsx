import React from 'react'
import { auth } from '../../firebase/firebaseClient'
import Button from '@mui/material/Button'

const Logout = ({ setMenuIsActive = value => value, setLoggedIn, fullWidth = false }) => {
  const handleLogoutClicked = async () => {
    await auth.signOut()
    setLoggedIn(false)
    setMenuIsActive(false)
  }

  return (
    <Button
      variant='contained'
      onClick={handleLogoutClicked}
      fullWidth={fullWidth}
    >
      Log Out
    </Button>
  )
}

export default Logout

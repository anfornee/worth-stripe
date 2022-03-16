import React from 'react'
import { auth } from '../../firebase/firebaseClient'
import Button from '@mui/material/Button'

const Logout = ({ setMenuIsActive = value => value, setLoggedIn }) => {
  const handleLogoutClicked = async () => {
    await auth.signOut()
    setLoggedIn(false)
    setMenuIsActive(false)
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

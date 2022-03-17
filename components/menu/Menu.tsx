import React from 'react'
import Logout from '../login/Logout'
import { Button } from '@mui/material'
import styles from './Menu.module.scss'
import Spacer from '../layout/Spacer'

const Menu = ({ menuIsActive, setMenuIsActive, isUserAccount, setIsUserAccount, setLoggedIn }) => {
  const handleUserAccount = () => {
    setMenuIsActive(false)
    setIsUserAccount(!isUserAccount)
  }

  return (
    <div style={menuIsActive ? { top: 0 } : { top: '-12.5em' }} className={styles.menuContainer}>
      <div className={styles.menuButtonContainer}>
        {
          isUserAccount
            ? <Button variant='contained' onClick={handleUserAccount} fullWidth >SUBSCRIPTION</Button>
            : <Button variant='contained' onClick={handleUserAccount} fullWidth >ACCOUNT</Button>
        }
        <Spacer height='1em' />
        <Logout setMenuIsActive={setMenuIsActive} setLoggedIn={setLoggedIn} fullWidth />
        <Spacer height='1em' />
        <Button variant='contained' fullWidth onClick={() => setMenuIsActive(false)}>
          CLOSE
        </Button>
      </div>
    </div>
  )
}

export default Menu

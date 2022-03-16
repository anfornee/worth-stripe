import React from 'react'
import Logout from '../login/Logout'
import { Button } from '@mui/material'
import styles from './Menu.module.scss'
import Spacer from '../layout/Spacer'

const Menu = ({ menuIsActive, setMenuIsActive, setLoggedIn }) => {
  return (
    <div style={menuIsActive ? { top: 0 } : { top: '-100vh' }} className={styles.menuContainer}>
      <Logout setMenuIsActive={setMenuIsActive} setLoggedIn={setLoggedIn} />
      <Spacer height='1em' />
      <Button variant='contained' onClick={() => setMenuIsActive(false)}>
        CLOSE
      </Button>
    </div>
  )
}

export default Menu

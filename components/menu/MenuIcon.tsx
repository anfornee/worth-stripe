import React from 'react'
import { auth } from '../../firebase/firebaseClient'
import Image from 'next/image'
import menuIcon from '../../public/icons/menu-icon.png'

const MenuIcon = ({ setLoggedIn, styles }) => {
  const handleLogoutClicked = async () => {
    await auth.signOut()
    setLoggedIn(false)
  }

  return (
    <div className={styles.MenuIconConatiner} onClick={handleLogoutClicked}>
      <Image
        src={menuIcon}
        width='40%'
        height='40%'
        alt='Menu'
      />
    </div>
  )
}

export default MenuIcon

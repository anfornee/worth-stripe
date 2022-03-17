import React from 'react'
import Image from 'next/image'
import menuIcon from '../../public/icons/menu-icon.png'
import styles from './Menu.module.scss'

const MenuIcon = ({ setLoggedIn, setMenuIsActive }) => {
  const handleMenuClicked = async () => {
    // await auth.signOut()
    // setLoggedIn(false)
    setMenuIsActive(true)
  }

  return (
    <div className={styles.menuIconConatiner} onClick={handleMenuClicked}>
      <Image
        src={menuIcon}
        width='90%'
        height='90%'
        alt='Menu'
      />
    </div>
  )
}

export default MenuIcon

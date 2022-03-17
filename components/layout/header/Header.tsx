import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'
import worthCrest from '../../../public/images/worth_crest_small.jpeg'
import Menu from '../../menu/Menu'
import MenuIcon from '../../menu/MenuIcon'

const Header = ({ user, setLoggedIn }) => {
  const [menuIsActive, setMenuIsActive] = useState(false)

  const signedInContent = (
    <div className={styles.headerLoggedInContainer}>
      <div className={styles.headerLogo}>
        <Image
          src={worthCrest}
          width='100%'
          height='100%'
          alt='Worth logo'
        />
      </div>
      <MenuIcon setLoggedIn={setLoggedIn} setMenuIsActive={setMenuIsActive} />
      <Menu menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive} setLoggedIn={setLoggedIn} />
    </div>
  )

  const notSignedInContent = (
    <div className={styles.headerLogoTextContainer}>
      <div className={styles.headerLogo}>
        <Image
          src={worthCrest}
          width='100%'
          height='100%'
          alt='Worth logo'
        />
      </div>
    </div>
  )

  return (
    <div className={styles.headerContainer}>
      {
        user ? signedInContent : notSignedInContent
      }
    </div>
  )
}

export default Header

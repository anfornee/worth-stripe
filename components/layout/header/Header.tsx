import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'
import worthCrest from '../../../public/images/worth_crest_small.jpeg'
import worthText from '../../../public/images/worth_main_white_small.jpeg'
import Menu from '../../menu/Menu'
import MenuIcon from '../../menu/MenuIcon'
// const worthCrest = 'https://drive.google.com/uc?id=1es6yegU3Z9YRO3pK35Eume0ddChr7-o8'
// const worthText = 'https://drive.google.com/uc?id=1tl6-_LAUGEN29sI_vjlh57Zm-iaoO7kk'

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
      <div className={styles.headerLogoText}>
        <Image
          src={worthText}
          width='100%'
          height='50%'
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

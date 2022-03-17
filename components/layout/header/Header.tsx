import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'
import worthCrest from '../../../public/images/worth_crest_small.jpeg'
import Menu from '../../menu/Menu'
import MenuIcon from '../../menu/MenuIcon'

const Header = ({ user, isUserAccount, setIsUserAccount, setLoggedIn }) => {
  const [menuIsActive, setMenuIsActive] = useState(false)

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLoggedInContainer}>
        <div className={styles.headerLogo}>
          <Image
            src={worthCrest}
            width='100%'
            height='100%'
            alt='Worth logo'
          />
        </div>
        <Menu
          menuIsActive={menuIsActive}
          setMenuIsActive={setMenuIsActive}
          isUserAccount={isUserAccount}
          setIsUserAccount={setIsUserAccount}
          setLoggedIn={setLoggedIn}
        />
        {
          user
            ? <MenuIcon setLoggedIn={setLoggedIn} setMenuIsActive={setMenuIsActive} />
            : ''
        }
      </div>
    </div>
  )
}

export default Header

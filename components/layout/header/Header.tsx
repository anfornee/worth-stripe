import React from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'
import worthCrest from '../../../public/images/worth_crest_small.jpeg'
import MenuIcon from '../../menu/MenuIcon'

const Header = ({ user, setMenuIsActive, setLoggedIn }) => {
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

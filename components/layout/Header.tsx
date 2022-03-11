import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Header.module.scss'
import worthCrest from '../../public/images/worth_crest_small.jpeg'
import worthText from '../../public/images/worth_main_white_small.jpeg'

const Header = ({ user }) => {
  const signedInContent = (
    <div className={styles.headerLoggedInContainer}>
      <div className={styles.headerLogo}>
        <Image
          src={worthCrest}
          width={600}
          height={600}
          alt='Worth logo'
        />
      </div>
      <div className={styles.headerDisplayName}>
        {/* <p>{user.displayName}</p> */}
        <p>Worth Subscription Portal</p>
      </div>
    </div>
  )

  const notSignedInContent = (
    <div className={styles.headerLogoTextContainer}>
      <div className={styles.headerLogoText}>
        <Image
          src={worthText}
          width={800}
          height={400}
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

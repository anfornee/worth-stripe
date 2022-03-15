import React from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'
// import worthCrest from '../../../public/images/worth_crest_small.jpeg'
// import worthText from '../../../public/images/worth_main_white_small.jpeg'
const worthCrest = 'https://drive.google.com/uc?id=1es6yegU3Z9YRO3pK35Eume0ddChr7-o8'
const worthText = 'https://drive.google.com/uc?id=1tl6-_LAUGEN29sI_vjlh57Zm-iaoO7kk'

const Header = ({ user }) => {
  const signedInContent = (
    <div className={styles.headerLoggedInContainer}>
      <div className={styles.headerLogo}>
        <img
          src={worthCrest}
          width='100%'
          height='100%'
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
        <img
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

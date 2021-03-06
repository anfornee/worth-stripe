import React from 'react'
import Image from 'next/image'
import Logout from '../../login/Logout'
import styles from './Footer.module.scss'
import worthCrest from '../../../public/images/worth_crest_small.jpeg'

const Footer = ({ user, setLoggedIn }) => {
  const signedInContent = (
    <Logout setLoggedIn={setLoggedIn} />
  )

  const notSignedInContent = (
    <div className={styles.footerLogo}>
      <Image
        src={worthCrest}
        width='100%'
        height='100%'
        alt='Worth logo'
      />
    </div>
  )

  return (
    <div className={styles.footerContainer}>
      {
        user ? signedInContent : notSignedInContent
      }
    </div>
  )
}

export default Footer

import React from 'react'
import Image from 'next/image'
import Logout from '../Logout'
import styles from '../../styles/Footer.module.scss'
import worthCrest from '../../public/images/worth_crest_small.jpeg'

const Footer = ({ user }) => {
  const signedInContent = (
    <Logout />
  )

  const notSignedInContent = (
    <div className={styles.footerLogo}>
      <Image
        src={worthCrest}
        width={600}
        height={600}
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

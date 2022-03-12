import React from 'react'
import Login from './login/Login'
import styles from '../styles/Intro.module.scss'

const Intro = () => {
  return (
    <div className={'centeredVertContainer ' + styles.introContainer}>
      <h1 className={styles.loginTitle}>
        Log in to the Subscription Portal
      </h1>
      <Login />
    </div>
  )
}

export default Intro

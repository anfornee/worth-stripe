import React from 'react'
import EmailLogin from './EmailLogin'
import GoogleLogin from './GoogleLogin'
import Spacer from '../layout/Spacer'
import Button from '@mui/material/Button'
import styles from './Login.module.scss'

const Login = ({ setIsSignUp }) => (
  <div className={styles.loginContainer}>
    <h1 className={styles.loginTitle}>
      Log in to the Subscription Portal
    </h1>
    <EmailLogin styles={styles} />
    <Spacer height='1em' />
    <Button fullWidth variant='contained' onClick={() => setIsSignUp(true)}>
      Sign Up
    </Button>
    <Spacer height='1em' />
    <GoogleLogin styles={styles} />
  </div>
)

export default Login

import React from 'react'
import Spacer from '../layout/Spacer'
import GoogleLogin from './GoogleLogin'
import EmailSignUp from './EmailSignUp'
import Button from '@mui/material/Button'
import styles from './Login.module.scss'

const SignUp = ({ setIsSignUp }) => (
  <div className={styles.loginContainer}>
    <h1 className={styles.loginTitle}>
      Sign up for the free Subscription Portal where you can purchase and manage subscriptions
    </h1>
    <EmailSignUp styles={styles} />
    <Spacer height='1em' />
    <GoogleLogin styles={styles} isSignUp />
    <Spacer height='2em' />
    <p>
      Already have an account?
    </p>
    <Spacer height='.5em' />
    <Button variant='contained' fullWidth onClick={() => setIsSignUp(false)}>
      LOG IN
    </Button>
  </div>
)

export default SignUp

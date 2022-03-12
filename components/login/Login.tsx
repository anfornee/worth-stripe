import React, { ReactElement, useState } from 'react'
import {
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword
} from "firebase/auth"
import { doc, setDoc, collection } from 'firebase/firestore'
import { auth, firestore } from '../../firebase/firebaseClient'
import EmailLogin from './EmailLogin'
import GoogleLogin from './GoogleLogin'
import Button from '@mui/material/Button'
import styles from './Login.module.scss'

interface Props { }

const Login = ({ }: Props): ReactElement => {

  return (
    <div className={styles.loginContainer}>
      <EmailLogin styles={styles} />
      <br />
      <GoogleLogin styles={styles} />
    </div>
  )
}

export default Login

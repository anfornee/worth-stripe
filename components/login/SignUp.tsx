import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, firestore } from '../../firebase/firebaseClient'
import Spacer from '../layout/Spacer'
import AppleLogin from './AppleLogin'
import GoogleLogin from './GoogleLogin'
import {
  Button,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import styles from './Login.module.scss'

const SignUp = ({ setIsSignUp, setName }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const signUpWithEmail = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredentials => {
        const { user } = userCredentials
        console.log(user)
        const userRef = doc(firestore, 'users', user.uid)
        await setDoc(userRef, user)
        await updateDoc(userRef, { displayName: name })
      })
  }

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>
      Sign up for the free Subscription Portal where you can purchase and manage subscriptions
      </h1>
      <div className={styles.emailForm}>
        <TextField
          label='First and Last Name'
          id='signup-name'
          sx={{ m: 1, width: '100%' }}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label='Email'
          id='signup-email'
          sx={{ m: 1, width: '100%' }}
          onChange={e => setEmail(e.target.value)}
        />
        <FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
          <InputLabel htmlFor='signup-password'>Password</InputLabel>
          <OutlinedInput
            id='signup-password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </FormControl>
        <Spacer height='.75em' />
        <Button
          variant='contained'
          className={styles.emailLoginButton}
          onClick={signUpWithEmail}
        >
          Sign Up With Email
        </Button>
        <Spacer height='1em' />
        <GoogleLogin styles={styles} isSignUp />
        <Spacer height='1em' />
        <AppleLogin styles={styles} isSignUp />
        <Spacer height='2em' />
        <p>
          Already have an account?
        </p>
        <Spacer height='.5em' />
        <Button variant='contained' fullWidth onClick={() => setIsSignUp(false)}>
          LOG IN
        </Button>
      </div>
    </div>
  )
}

export default SignUp

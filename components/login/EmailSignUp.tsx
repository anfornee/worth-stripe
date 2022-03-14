import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, firestore } from '../../firebase/firebaseClient'
import Spacer from '../layout/Spacer'
import { 
  validateEmail,
  validatePassword,
  validateFirstLastName
} from '../../utils/helpers'
import {
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  TextField
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const EmailSignUp = ({ setName, styles }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('Please enter a valid email.')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('Password must be at least 8 characters long and contain one letter, one number and one special character.')
  const [showPassword, setShowPassword] = useState(false)

  const signUpWithEmail = e => {
    e.preventDefault()
    // const validName = validateFirstLastName(userName)
    const validEmail = validateEmail(email)
    const validPassword = validatePassword(password)

    if (validEmail && validPassword) {
      setEmailError(false)
      setPasswordError(false)
      createUserWithEmailAndPassword(auth, email, password)
        .then(async userCredentials => {
          const { user } = userCredentials
          const userRef = doc(firestore, 'users', user.uid)
          await setDoc(userRef, JSON.parse(JSON.stringify(user)))
        })
        .catch(error => {
          if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
            setEmailErrorMessage('This email is already in use.')
            setEmailError(true)
          } else if (error.message === 'Firebase: Error (auth/wrong-password).') {
            setPasswordErrorMessage('Incorrect password')
            setPasswordError(true)
          }
        })
    } else {
      setEmailError(!validEmail)
      setPasswordError(!validPassword)
    }
  }

  return (
    <form onSubmit={signUpWithEmail} className={styles.emailForm}>
      {/* <FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
        <InputLabel htmlFor='signup-name'>First and Last Name</InputLabel>
        <OutlinedInput
          id='signup-name'
          type='text'
          value={userName}
          error={nameError}
          required
          onChange={e => setUserName(e.target.value)}
          label='First And Last Name'
        />
      </FormControl>
      {
        nameError
          ? <span className={styles.formError}>Please enter your first and last.</span>
          : <Spacer height='.95em' />
      } */}
      {/* <TextField
        label='First and Last Name'
        id='signup-name'
        sx={{ m: 1, width: '100%' }}
        onChange={e => setName(e.target.value)}
      /> */}
      <FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
        <InputLabel htmlFor='signup-email'>Email</InputLabel>
        <OutlinedInput
          id='signup-email'
          type='email'
          value={email}
          error={emailError}
          required
          onChange={e => setEmail(e.target.value)}
          label='Email'
        />
      </FormControl>
      {
        emailError
          ? <span className={styles.formError}>{emailErrorMessage}</span>
          : <Spacer height='.95em' />
      }
      <FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
        <InputLabel htmlFor='signup-password'>Password</InputLabel>
        <OutlinedInput
          id='signup-password'
          type={showPassword ? 'text' : 'password'}
          value={password}
          error={passwordError}
          required
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
      {
        passwordError
          ? <span className={styles.formError}>{passwordErrorMessage}</span>
          : <Spacer height='.95em' />
      }
      <Spacer height='.25em' />
      <Button
        type='submit'
        variant='contained'
        className={styles.emailLoginButton}
        onClick={signUpWithEmail}
      >
        Sign Up With Email
      </Button>
    </form>
  )
}

export default EmailSignUp

import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebaseClient'
import Spacer from '../layout/Spacer'
import { validateEmail, validatePassword } from '../../utils/helpers'
import {
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const EmailLogin = ({ styles }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('Please enter a valid email.')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('Password must be at least 8 characters long and contain one letter, one number and one special character.')
  const [showPassword, setShowPassword] = useState(false)

  const logInWithEmail = e => {
    e.preventDefault()
    const validEmail = validateEmail(email)
    const validPassword = validatePassword(password)

    if (validEmail && validPassword) {
      setEmailError(false)
      setPasswordError(false)
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => `${userCredential.user.displayName} signed in.`)
        .catch(error => {
          if (error.message === 'Firebase: Error (auth/user-not-found).') {
            setEmailErrorMessage('User not found.')
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
    <form onSubmit={logInWithEmail} className={styles.emailForm}>
      <FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
        <InputLabel htmlFor='login-email'>Email</InputLabel>
        <OutlinedInput
          id='login-email'
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
          : ''
      }
      <FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
        <InputLabel htmlFor='login-password'>Password</InputLabel>
        <OutlinedInput
          id='login-password'
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
      >
        Log In With Email
      </Button>
    </form>
  )
}

export default EmailLogin

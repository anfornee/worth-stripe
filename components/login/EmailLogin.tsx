import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { doc, setDoc, collection } from 'firebase/firestore'
import { auth, firestore } from '../../firebase/firebaseClient'
import Spacer from '../layout/Spacer'
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

const EmailLogin = ({ styles }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const signUpWithEmail = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const { user } = userCredentials
        console.log(user)
      })
  }

  return (
    <div className={styles.emailForm}>
      <TextField
        label='Email'
        id='login-email'
        sx={{ m: 1, width: '100%' }}
        onChange={e => setEmail(e.target.value)}
      />
      <FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
        <InputLabel htmlFor='login-password'>Password</InputLabel>
        <OutlinedInput
          id='login-password'
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
        Log In With Email
      </Button>
    </div>
  )
}

export default EmailLogin

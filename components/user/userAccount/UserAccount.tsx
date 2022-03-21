import React, { useState } from 'react'
import { auth } from '../../../firebase/firebaseClient'
import { updatePassword } from 'firebase/auth'
import Spacer from '../../layout/Spacer'
import { Button, FormControl, IconButton, InputLabel, InputAdornment, OutlinedInput } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { validateFirstLastName, validatePassword } from '../../../utils/helpers'
import styles from './UserAccount.module.scss'

const UserAccount = ({ userName, updateUserName }) => {
  const [name, setName] = useState(userName)
  const [nameError, setNameError] = useState('')
  const [nameUpdated, setNameUpdated] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordUpdated, setPasswordUpdated] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const updateUserPassword = () => {
    updatePassword(auth.currentUser, password)
      .then(async () => {
        setPasswordUpdated('Password udpated successfully.')
        setPassword('')
      })
      .catch(error => {
        console.log(error)
        setPasswordUpdated('')
        setPasswordError('Password could not be updated at this time.')
      })
  }

  const handleUpdatedNameSubmitted = e => {
    e.preventDefault()
    const validName = validateFirstLastName(name)

    if (name === userName) {
      setNameUpdated('')
      setNameError('Must be different than current name.')
    }

    if (validName && name !== userName) {
      setNameError('')
      updateUserName(name)
        .then(() => setNameUpdated('Name updated successfully.'))
        .catch(error => {
          console.log(error)
          setNameUpdated('')
          setName(userName)
          setNameError('Name could not be updated at this time.')
        })
    } else {
      setNameUpdated('')
      setNameError('Please enter only your first and last name.')
    }
  }

  const handleUpdatedPasswordSubmitted = e => {
    e.preventDefault()
    const validPassword = validatePassword(password)

    if (validPassword) {
      setPasswordError('')
      updateUserPassword()
    } else {
      setPasswordUpdated('')
      setPasswordError('Password must be at least 8 characters long and contain one letter, one number and one special character.')
    }
  }

  return (
    <div className={'centeredVertContainer quickFadeIn ' + styles.userAccountContainer}>
      <h1>Account Details</h1>
      <Spacer height='1em' />
      {
        nameUpdated
          ? <span className='formSuccess'>{nameUpdated}</span>
          : ' '
      }
      <form onSubmit={handleUpdatedNameSubmitted} className='centeredVertContainer'>
        <FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
          <InputLabel htmlFor='update-name'>First and Last Name</InputLabel>
          <OutlinedInput
            id='update-name'
            type='text'
            value={name}
            error={!!nameError}
            required
            onChange={e => setName(e.target.value)}
            label='First And Last Name'
          />
        </FormControl>
        {
          nameError
            ? <span className='formError'>{nameError}</span>
            : ''
        }
        <Spacer height='.5em' />
        <Button type='submit' variant='contained' fullWidth>
          Update Name
        </Button>
      </form>
      <Spacer height='2em' />
      {
        passwordUpdated
          ? <span className='formSuccess'>{passwordUpdated}</span>
          : ' '
      }
      <form onSubmit={handleUpdatedPasswordSubmitted} className='centeredVertContainer'>
        <FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
          <InputLabel htmlFor='update-password'>Password</InputLabel>
          <OutlinedInput
            id='update-password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder='••••••••••••'
            error={!!passwordError}
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
            ? <span className='formError'>{passwordError}</span>
            : ''
        }
        <Spacer height='.5em' />
        <Button type='submit' variant='contained' fullWidth>
          Update Password
        </Button>
      </form>
      <Spacer height='2em' />
      <p>*to update email address please head to Manage Subscription</p>
    </div>
  )
}

export default UserAccount

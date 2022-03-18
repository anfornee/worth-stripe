import React, { useState } from 'react'
import Spacer from '../../layout/Spacer'
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { validateFirstLastName } from '../../../utils/helpers'
import styles from './UserAccount.module.scss'

const UserAccount = ({ email, userName, updateUserName, updateUserPassword }) => {
  const [name, setName] = useState(userName)
  const [nameError, setNameError] = useState('')
  const [password, setPassword] = useState('•••••••••')
  const [passwordError, setPasswordError] = useState('')

  const handleUpdatedNameSubmitted = e => {
    e.preventDefault()
    const validName = validateFirstLastName(name)

    if (name === userName) return setNameError('Must be different than current name.')

    if (validName && name !== userName) {
      setNameError('')
      updateUserName(name)
    } else setNameError('Please enter only your first and last name.')
  }

  const handleUpdatedPasswordSubmitted = e => {
    e.preventDefault()
  }

  return (
    <div className={'centeredVertContainer quickFadeIn ' + styles.userAccountContainer}>
      <h1>Account Details</h1>
      <Spacer height='1em' />
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
      <form onSubmit={handleUpdatedPasswordSubmitted} className='centeredVertContainer'>
        <FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
          <InputLabel htmlFor='update-password'>Password</InputLabel>
          <OutlinedInput
            id='update-password'
            type='password'
            value={password}
            error={!!passwordError}
            required
            onChange={e => setName(e.target.value)}
            label='First And Last Name'
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
      <p>Email: {email}</p>
      <p>*to update email address please head to Manage Subscription</p>
    </div>
  )
}

export default UserAccount

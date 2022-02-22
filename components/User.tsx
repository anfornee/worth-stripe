import React from 'react'
import Logout from './Logout'
import { createCheckoutSession } from '../stripe/createCheckoutSession'
import usePremiumStatus from '../stripe/usePremiumStatus'
import Button from '@mui/material/Button'

const User = ({ userData }) => {
  const userIsPremium = usePremiumStatus(userData)
  return (
    <div className='centeredVertContainer text-center'>
      <div>
        <h1>Hello, {userData.displayName}</h1>
        {!userIsPremium ? (
          <Button
            variant='contained'
            onClick={() => createCheckoutSession(userData.uid)}
          >
            Upgrade to Premium, guy!
          </Button>
        ) : (
          <div>
            <h2>Have a cooke, Premium guy!</h2>
            <Button
              variant='contained'
              onClick={() => createCheckoutSession(userData.id)}
            >
              Cancel Premium
            </Button>
          </div>
        )}
        <Logout />
      </div>
    </div>
  )
}

export default User

import React from 'react'
import Logout from './Logout'
import { createCheckoutSession } from '../stripe/createCheckoutSession'
import usePremiumStatus from '../stripe/usePremiumStatus'

const User = ({ userData }) => {
  const userIsPremium = usePremiumStatus(userData)
  console.log(userData)
  return (
    <div className='centeredVertContainer text-center'>
      <div>
        <h1>Hello, {userData.displayName}</h1>
        {!userIsPremium ? (
          <button onClick={() => createCheckoutSession(userData.uid)}>
            Upgrade to Premium, guy!
          </button>
        ) : (
          <h2>Have a cooke, Premium guy!</h2>
        )}
        <Logout />
      </div>
    </div>
  )
}

export default User

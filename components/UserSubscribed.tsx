import React from 'react'
import Button from '@mui/material/Button'

const UserSubscribed = ({ createPortalLink, subscriptionStatus }) => (
  <div>
    <p>
      <span className='block'>You are currently subscribed</span>
      <span className='block'>to the {subscriptionStatus} plan!</span>
      <Button
        variant='contained'
        onClick={createPortalLink}
      >
        Manage Subscription
      </Button>
    </p>
  </div>
)

export default UserSubscribed

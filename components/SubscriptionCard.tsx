import React from 'react'
import { createCheckoutSession } from '../stripe/createCheckoutSession'
import Button from '@mui/material/Button'

const SubscriptionCard = ({ userData, productData }) => (
  <div className='subscriptionCard'>
    <p>
      <span className='block'>
        {productData.title}
      </span>
      <span className='block'>
        {productData.description}
      </span>
      <span className='block'>
        {productData.cost}/month
      </span>
    </p>
    <Button
      variant='contained'
      className='optionButton'
      onClick={() => createCheckoutSession(userData.uid, productData.price)}
    >
      SUBSCRIBE
    </Button>
  </div>
)

export default SubscriptionCard

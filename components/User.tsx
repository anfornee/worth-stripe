import React from 'react'
import Logout from './Logout'
import { createCheckoutSession } from '../stripe/createCheckoutSession'
import { createPortalLink } from '../stripe/createPoralLink'
import { postData } from '../utils/helpers'
import usePremiumStatus from '../stripe/useSubscriptionStatus'
import Button from '@mui/material/Button'
import userStyles from '../styles/User.module.scss'

const products = [
  {
    title: 'Premium',
    price: 'price_1KUnMHGcvZKv3JxvlOgnzXIP',
  },
  {
    title: 'One Bag Per Month',
    price: 'price_1KUn4eGcvZKv3JxvgaWSJwZO'
  },
  {
    title: 'Two Bags Per Month',
    price: 'price_1KUn5VGcvZKv3Jxv0eiKFPOM'
  },
  {
    title: 'Four Bags Per Month',
    price: 'price_1KUn6mGcvZKv3JxvYFJ33rNz'
  }
]

const User = ({ userData }) => {
  const subscriptionStatus = usePremiumStatus(userData)

  const userNotSubscribedContent = (
    <div className='centeredVertContainer'>
      {products.map((product, i) => (
        <Button
          key={i.toString()}
          variant='contained'
          className={userStyles.optionButtons}
          onClick={() => createCheckoutSession(userData.uid, product.price)}
        >
          {product.title}
        </Button>
      ))}
    </div>
  )

  const userSubscribedContent = (
    <div>
      <p>
        <span className='block'>You are currently subscribed</span>
        <span className='block'>to the {subscriptionStatus} plan!</span>
        <Button
          variant='contained'
          onClick={() => createPortalLink(userData.email, userData.uid)}
          // onClick={async () => {
          //   try {
          //     const { url, error } = await postData({
          //       url: '/api/create-portal-link',
          //       data: {
          //         user: userData
          //       }
          //     })
          //     window.location.assign(url)
          //   } catch (error) {
          //     if (error) return new Error(error)
          //   }
          // }}
        >
          Manage Subscription
        </Button>
      </p>
    </div>
  )

  return (
    <div className='centeredVertContainer text-center'>
      <div>
        <h1>Hello, {userData.displayName}</h1>
        {
          !subscriptionStatus
            ? userNotSubscribedContent
            : userSubscribedContent
        }
        <Logout />
      </div>
    </div>
  )
}

export default User

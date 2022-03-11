import React from 'react'
import { postData } from '../utils/helpers'
import useSubscriptionStatus from '../stripe/useSubscriptionStatus'
import SubscriptionCard from './SubscriptionCard'
import Button from '@mui/material/Button'
import userStyles from '../styles/User.module.scss'
import products from '../utils/productsData.json'

const User = ({ userData }) => {
  const subscriptionStatus = useSubscriptionStatus(userData)

  const createPortalLink = async () => {
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
        data: {
          user: userData
        }
      })
      if (error) throw new Error(error)
      window.location.assign(url)
    } catch (error) {
      if (error) return new Error(error)
    }
  }

  const userNotSubscribedContent = (
    <div className='centeredVertContainer'>
      <p className={userStyles.notSubscribedIntro}>
        <span className='block'>
          You are not currently subscribed
        </span>
        <span className='block'>
          to any monthly coffee plans.
        </span>
        <span className='block'>
          Take a look at our offerings below
        </span>
        <span className='block'>
         and see if anything fits your needs.
        </span>
      </p>
      {products.map((productData, i) => (
        <SubscriptionCard
          userData={userData}
          productData={productData}
          key={i}
        />
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
          onClick={createPortalLink}
        >
          Manage Subscription
        </Button>
      </p>
    </div>
  )

  return (
    <div className='centeredVertContainer text-center'>
      <div>
        <h1 className={userStyles.displayName}>
          Hello, {userData.displayName}
        </h1>
        {
          !subscriptionStatus
            ? userNotSubscribedContent
            : userSubscribedContent
        }
      </div>
    </div>
  )
}

export default User

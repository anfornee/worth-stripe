import React from 'react'
import Spacer from '../layout/Spacer'
import { postData } from '../../utils/helpers'
import { Button } from '@mui/material'

// const UserSubscribed = ({ createPortalLink, subscriptionStatus, email, styles }) => {
const UserSubscribed = ({ subscriptionStatus, date, email, setIsStripeLoading, userName, userTitle, styles }) => {

  const createPortalLink = async () => {
    setIsStripeLoading(true)
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
        data: {
          email
        }
      })
      if (error) throw new Error(error)
      window.location.assign(url)
    } catch (error) {
      if (error) return new Error(error)
    }
  }

  return (
    <div className={'centeredVertContainer ' + styles.userSubscribedContainer}>
      {userTitle}
      <Spacer height='1em' />
      <span className={styles.yourPlanText + ' block'}>Your plan:</span>
      <span className={styles.userSubscriptionText + ' block'}>{subscriptionStatus}</span>
      <Spacer height='1em' />
      <span className={styles.yourPlanText + ' block'}>Next billing date:</span>
      <span className={styles.userSubscriptionText + ' block'}>{date}</span>
      <Spacer height='1em' />
      <Button variant='contained' fullWidth onClick={createPortalLink}>
        Manage Subscription
      </Button>
    </div>
  )
}

export default UserSubscribed

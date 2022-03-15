import React from 'react'
import Button from '@mui/material/Button'
import Spacer from '../layout/Spacer'
import { postData } from '../../utils/helpers'

// const UserSubscribed = ({ createPortalLink, subscriptionStatus, email, styles }) => {
const UserSubscribed = ({ subscriptionStatus, date, email, styles }) => {
  const createPortalLink = async () => {
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
    <p>
      <Spacer height='1em' />
      <span className={styles.yourPlanText + ' block'}>Your plan:</span>
      <span className={styles.userSubscriptionText + ' block'}>{subscriptionStatus}</span>
      <Spacer height='1em' />
      <span className={styles.yourPlanText + ' block'}>Next billing date:</span>
      <span className={styles.userSubscriptionText + ' block'}>{date}</span>
      <Spacer height='1em' />
      <Button
        variant='contained'
        onClick={createPortalLink}
      >
        Manage Subscription
      </Button>
    </p>
  )
}

export default UserSubscribed

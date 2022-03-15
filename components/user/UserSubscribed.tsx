import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Spacer from '../layout/Spacer'
import { postData } from '../../utils/helpers'
import { days, months } from '../../utils/dates'

const UserSubscribed = ({ createPortalLink, subscriptionStatus, email, styles }) => {
  const [date, setDate] = useState('')

  const getNextPaymentDate = async () => {
    try {
      const nextPaymentUnix = await postData({
        url: '/api/get-next-payment-date',
        data: email
      })

      const nextPaymentDate = new Date(nextPaymentUnix * 1000)
      setDate(`${months[nextPaymentDate.getMonth()]} ${nextPaymentDate.getDate()}, ${nextPaymentDate.getFullYear()}`)
    } catch (error) {
      if (error) return new Error(error)
    }
  }

  useEffect(() => {
    getNextPaymentDate()
  }, [])

  return (
    <p className={styles.userSubscribedContainer + ' centeredVertContainer'}>
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

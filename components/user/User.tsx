import React, { useEffect, useState, useCallback } from 'react'
import { postData } from '../../utils/helpers'
import useSubscriptionStatus from '../../stripe/useSubscriptionStatus'
import UserSubscribed from './UserSubscribed'
import UserNotSubscribed from './UserNotSubscribed'
import { Button } from '@mui/material'
import Spacer from '../layout/Spacer'
import styles from './User.module.scss'
import { months } from '../../utils/dates'
import { firestore } from '../../firebase/firebaseClient'
import { collection, getDocs } from 'firebase/firestore'

const User = ({ userData }) => {
  const subscriptionStatus = useSubscriptionStatus(userData)
  const [date, setDate] = useState('')
  const [email, setEmail] = useState(userData.email)
  const [newEmail, setNewEmail] = useState(userData.email !== email)

  const getSubscriptionData = useCallback(async () => {
    const userRef = collection(firestore, `users/${userData.uid}/subscriptions`)
    const docSnap = await getDocs(userRef)
    const nextPaymentDate = new Date(docSnap.docs[0].data().current_period_end.seconds * 1000)
    setDate(`${months[nextPaymentDate.getMonth()]} ${nextPaymentDate.getDate()}, ${nextPaymentDate.getFullYear()}`)
    return docSnap.docs[0].id
  }, [userData.uid])

  /**
   * MAY NOT EVEN NEED TO GET DATE HEAR JUST COMPARE EMAILS
   */
  const getNextPaymentDate = useCallback(async subId => {
    try {
      const { nextPaymentUnix, differentEmail } = await postData({
        url: '/api/get-next-payment-date',
        data: { email: userData.email, subId }
      })

      const nextPaymentDate = new Date(nextPaymentUnix * 1000)
      setDate(`${months[nextPaymentDate.getMonth()]} ${nextPaymentDate.getDate()}, ${nextPaymentDate.getFullYear()}`)
      if (differentEmail) setEmail(differentEmail)
    } catch (error) {
      if (error) return new Error(error)
    }
  }, [userData.email])

  const userTitle = (
    <h1 className={styles.displayName}>
      {'Hello, ' + userData.displayName.split(' ')[0]}
    </h1>
  )

  useEffect(() => {
    if (
      subscriptionStatus &&
      subscriptionStatus !== 'User is not subscribed.' &&
      !date
    ) {
      getSubscriptionData()
        .then(subId => getNextPaymentDate(subId))
    }
    email !== userData.email && setNewEmail(true)
    // ) getNextPaymentDate()
  }, [subscriptionStatus, date, email, getNextPaymentDate, getSubscriptionData, userData.email])

  return (
    <div className='centeredVertContainer'>
      {
        !subscriptionStatus
          ? ''
          : subscriptionStatus === 'User is not subscribed.'
            ? (
              <div className={'text-center quickFadeIn ' + styles.userContainer}>
                {userTitle}
                <UserNotSubscribed userData={userData} />
              </div>
            )
            : date
              ? (
                <div className={'centeredVertContainer text-center quickFadeIn ' + styles.userContainer}>
                  {userTitle}
                  <UserSubscribed
                    subscriptionStatus={subscriptionStatus}
                    date={date}
                    email={email}
                    styles={styles}
                  />
                </div>
              )
              : ''
      }
      {
        newEmail
          ? (
            <div className={styles.newEmailPopupContainer}>
              <div className={styles.newEmailPopup}>
                <p className={styles.newEmailPopupText}>
                  <span className='block'>
                    Your email on Stripe is different from you Subscriptions portal email.
                  </span>
                  <span className='block'>
                    Would you like to update it?
                  </span>
                  <Spacer height='1em' />
                  <Button variant='contained' onClick={() => setNewEmail(false)}>
                    YES
                  </Button>
                  <Spacer height='1em' />
                  <Button variant='contained' onClick={() => setNewEmail(false)}>
                    NO
                  </Button>
                </p>
              </div>
            </div>
          )
          : ''
      }
    </div>
  )
}

export default User

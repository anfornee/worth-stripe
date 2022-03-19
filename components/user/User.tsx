import React, { useEffect, useState, useCallback } from 'react'
import { postData } from '../../utils/helpers'
import useSubscriptionStatus from '../../stripe/useSubscriptionStatus'
import UserSubscribed from './UserSubscribed'
import UserNotSubscribed from './UserNotSubscribed'
import { Button } from '@mui/material'
import Spacer from '../layout/Spacer'
import { months } from '../../utils/dates'
import { auth, firestore } from '../../firebase/firebaseClient'
import { updateEmail } from 'firebase/auth'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import LoadingScreen from '../LoadingScreen'
import styles from './User.module.scss'

const User = ({ userData }) => {
  const subscriptionStatus = useSubscriptionStatus(userData)
  const [date, setDate] = useState('')
  const [email, setEmail] = useState(userData.email)
  const [isNewEmail, setIsNewEmail] = useState(false)
  const [isStripeLoading, setIsStripeLoading] = useState(false)
  const userNotSubscribed = subscriptionStatus === 'User is not subscribed.'
    ? ' h100'
    : ''

  const updateUserEmail = differentEmail => {
    updateEmail(auth.currentUser, differentEmail)
      .then(async () => {
        const userDoc = doc(firestore, 'users', userData.uid)
        await updateDoc(userDoc, { email: differentEmail })
        setIsNewEmail(true)
        setEmail(differentEmail)
      })
      .catch(error => console.log(error))
  }

  const getSubscriptionData = useCallback(async () => {
    const userRef = collection(firestore, `users/${userData.uid}/subscriptions`)
    const docSnap = await getDocs(userRef)
    const nextPaymentDate = new Date(docSnap.docs[0].data().current_period_end.seconds * 1000)
    setDate(`${months[nextPaymentDate.getMonth()]} ${nextPaymentDate.getDate()}, ${nextPaymentDate.getFullYear()}`)
    return docSnap.docs[0].id
  }, [userData.uid])

  const compareStripeEmail = useCallback(async subId => {
    try {
      const { differentEmail } = await postData({
        url: '/api/compare-stripe-email',
        data: { email: userData.email, subId }
      })

      if (differentEmail) updateUserEmail(differentEmail)
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
        .then(subId => compareStripeEmail(subId))
    }
  }, [subscriptionStatus, date, getSubscriptionData])

  return (
    <div className={'centeredVertContainer' + userNotSubscribed}>
      <div className={'text-center quickFadeIn ' + styles.userContainer + userNotSubscribed}>
        {
          !subscriptionStatus
            ? ''
            : userNotSubscribed
              ? (
                <UserNotSubscribed
                  userData={userData}
                  setIsStripeLoading={setIsStripeLoading}
                  userTitle={userTitle}
                  styles={styles}
                />
              )
              : date
                ? (
                  <UserSubscribed
                    subscriptionStatus={subscriptionStatus}
                    date={date}
                    email={userData.email}
                    setIsStripeLoading={setIsStripeLoading}
                    userName={userData.displayName}
                    userTitle={userTitle}
                    styles={styles}
                  />
                )
                : ''
        }
      </div>
      <LoadingScreen isStripeLoading={isStripeLoading} />
      {
        isNewEmail
          ? (
            <div className={styles.newEmailPopupContainer}>
              <div className={styles.newEmailPopup}>
                <p className={styles.newEmailPopupText}>
                  <span className='block'>
                    Your email has been updated:
                  </span>
                  <span className='block'>
                    {email}
                  </span>
                  <Spacer height='1em' />
                  <Button variant='contained' fullWidth onClick={() => setIsNewEmail(false)}>
                    OK
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

import React from 'react'
import { postData } from '../../utils/helpers'
import useSubscriptionStatus from '../../stripe/useSubscriptionStatus'
import UserSubscribed from './UserSubscribed'
import UserNotSubscribed from './UserNotSubscribed'
import styles from './User.module.scss'

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

  return (
    <div className={'centeredVertContainer text-center quickFadeIn ' + styles.userContainer}>
      <h1 className={styles.displayName}>
        {'Hello, ' + userData.displayName.split(' ')[0]}
      </h1>
      {
        !subscriptionStatus
          ? ''
          : subscriptionStatus === 'User is not subscribed.'
            ? <UserNotSubscribed userData={userData} />
            : (
              <UserSubscribed
                createPortalLink={createPortalLink}
                subscriptionStatus={subscriptionStatus}
                email={userData.email}
                styles={styles}
              />
            )
      }
    </div>
  )
}

export default User

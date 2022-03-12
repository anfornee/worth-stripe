import React from 'react'
import { postData } from '../utils/helpers'
import useSubscriptionStatus from '../stripe/useSubscriptionStatus'
import UserSubscribed from './UserSubscribed'
import UserNotSubscribed from './UserNotSubscribed'
import userStyles from '../styles/User.module.scss'

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
    <div className={'centeredVertContainer text-center ' + userStyles.userContainer}>
      <div>
        <h1 className={userStyles.displayName}>
          {userData.displayName
            ? 'Hello, ' + userData.displayName.split(' ')[0]
            : ''
          }
        </h1>
        {
          !subscriptionStatus
            ? <UserNotSubscribed userData={userData} />
            : <UserSubscribed createPortalLink={createPortalLink} subscriptionStatus={subscriptionStatus} />
        }
      </div>
    </div>
  )
}

export default User

import { useState, useEffect } from 'react'
import userSubscription from './userSubscription'

const useSubscriptionStatus = (user: Object) => {
  const [subscriptionStatus, setSubscriptionSatus] = useState<string>('')

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        const subscriptionData = await userSubscription()
        subscriptionData
          ? setSubscriptionSatus(subscriptionData)
          : setSubscriptionSatus('User is not subscribed.')
      }
      checkPremiumStatus()
    }
  }, [user])

  if (
    subscriptionStatus &&
    subscriptionStatus !== 'User is not subscribed.'
  ) {
    return subscriptionStatus
      .charAt(0)
      .toUpperCase() + subscriptionStatus.slice(1)
        .replace(/([a-z])([A-Z])/g, '$1 $2')
  } 
  else if (subscriptionStatus === 'User is not subscribed.') {
    return subscriptionStatus
  }
}

export default useSubscriptionStatus

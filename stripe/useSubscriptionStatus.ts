import { useState, useEffect } from 'react'
import userSubscription from './userSubscription'

export default function useSubscriptionStatus(user: Object) {
  const [subscriptionStatus, setSubscriptionSatus] = useState<string>('')
  let subscriptionType

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        setSubscriptionSatus(await userSubscription())
      }
      checkPremiumStatus()
    }
  }, [user])

  if (subscriptionStatus) {
    subscriptionType = subscriptionStatus
      .charAt(0)
      .toUpperCase() + subscriptionStatus.slice(1)
        .replace(/([a-z])([A-Z])/g, '$1 $2')
  }

  return subscriptionType
}

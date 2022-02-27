import { useState, useEffect } from 'react'
import userSubscription from './userSubscription'

export default function usePremiumStatus(user: firebase.User) {
  const [premiumStatus, setPremiumSatus] = useState<string>('')
  let subscriptionType

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        setPremiumSatus(await userSubscription())
      }
      checkPremiumStatus()
    }
  }, [user])

  if (premiumStatus) {
    subscriptionType = premiumStatus
      .charAt(0)
      .toUpperCase() + premiumStatus.slice(1)
        .replace(/([a-z])([A-Z])/g, '$1 $2')
  }

  return subscriptionType
}

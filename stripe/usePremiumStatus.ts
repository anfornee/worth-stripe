import { useState, useEffect } from 'react'
import firebase from '../firebase/firebaseClient'
import userSubscription from './userSubscription'

export default function usePremiumStatus(user: firebase.User) {
  const [premiumStatus, setPremiumSatus] = useState<string>('')

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        setPremiumSatus(await userSubscription())
      }
      checkPremiumStatus()
    }
  }, [user])

  return premiumStatus
}

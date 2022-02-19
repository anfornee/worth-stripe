import { useState, useEffect } from 'react'
import firebase from '../firebase/firebaseClient'
import isUserPremium from './isUserPremium'

export default function usePremiumStatus(user: firebase.User) {
  const [premiumStatus, setPremiumSatus] = useState<boolean>(false)

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        setPremiumSatus(await isUserPremium())
      }
      checkPremiumStatus()
    }
  }, [user])

  return premiumStatus
}

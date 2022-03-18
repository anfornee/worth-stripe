import React, { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, firestore } from '../firebase/firebaseClient'
import { updateProfile } from 'firebase/auth'
import UserAccount from '../components/user/userAccount/UserAccount'
import User from '../components/user/User'

const UserLoggedIn = ({ userData, isUserAccount }) => {
  const [userName, setUserName] = useState(userData.displayName)

  const updateUserName = name => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(async () => {
        const userDoc = doc(firestore, 'users', userData.uid)
        await updateDoc(userDoc, { name })
        setUserName(name)
      })
      .catch(error => console.log(error))
  }

  const updateUserPassword = () => {
    console.log('update user password')
  }

  const displayContent = isUserAccount
    ? (
      <UserAccount
        email={userData.email}
        userName={userName}
        updateUserName={updateUserName}
        updateUserPassword={updateUserPassword}
      />
    )
    : <User userData={userData} />

  return displayContent
}

export default UserLoggedIn

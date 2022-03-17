import React, { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import firebase, { auth, firestore } from '../firebase/firebaseClient'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import Header from '../components/layout/header/Header'
import UserAccount from '../components/user/userAccount/UserAccount'
import Layout from '../components/layout/Layout'
import User from '../components/user/User'
import Intro from '../components/Intro'

const Home = () => {
  const [userData, userLoading] = useAuthState(getAuth(firebase))
  const [loggedIn, setLoggedIn] = useState(false)
  const [isUserAccount, setIsUserAccount] = useState(false)

  const updateUserName = async (user) => {
    const fullName = window.sessionStorage.getItem('fullName')
    if (fullName) {
      updateProfile(auth.currentUser, {
        displayName: fullName
      })
        .then(async () => {
          const userDetails = {
            uid: user.uid,
            email: user.email,
            name: fullName,
            provider: user.providerData[0].providerId,
            photoUrl: user.photoURL
          }
          const userRef = doc(firestore, 'users', user.uid)
          await setDoc(userRef, JSON.parse(JSON.stringify(userDetails)))
          setLoggedIn(true)
        })
    }
  }

  onAuthStateChanged(auth, user => {
    if (user) {
      if (user.displayName) setLoggedIn(true)
      else updateUserName(user)
    }
  })

  return (
    <Layout>
      <Header
        user={userData}
        isUserAccount={isUserAccount}
        setIsUserAccount={setIsUserAccount}
        setLoggedIn={setLoggedIn}
      />
      <div className='mainContainer'>
        {
          !loggedIn && !userData && !userLoading && (
            <Intro />
          )
        }
        {
          loggedIn && userData && !userLoading && !isUserAccount && (
            <User userData={userData} />
          )
        }
        {
          loggedIn && userData && !userLoading && isUserAccount && (
            <UserAccount />
          )
        }
      </div>
    </Layout>
  )
}

export default Home

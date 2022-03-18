import React, { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import firebase, { auth, firestore } from '../firebase/firebaseClient'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import Header from '../components/layout/header/Header'
import Layout from '../components/layout/Layout'
import Intro from '../components/Intro'
import UserLoggedIn from '../components/UserLoggedIn'

const Home = () => {
  const [userData, userLoading] = useAuthState(getAuth(firebase))
  const [loggedIn, setLoggedIn] = useState(false)
  const [isUserAccount, setIsUserAccount] = useState(false)

  const addUserName = async (user) => {
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
      else addUserName(user)
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
          loggedIn && userData && !userLoading && (
            <UserLoggedIn
              userData={userData}
              isUserAccount={isUserAccount}
            />
          )
        }
      </div>
    </Layout>
  )
}

export default Home

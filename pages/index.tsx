import React, { useState } from 'react'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, firestore } from '../firebase/firebaseClient'
import { useAuthState } from 'react-firebase-hooks/auth'
import { onAuthStateChanged, updateCurrentUser, updateProfile } from 'firebase/auth'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Layout from '../components/layout/Layout'
import User from '../components/User'
import Intro from '../components/Intro'

const Home = () => {
  const [userData, userLoading] = useAuthState(auth)
  const [loggedIn, setLoggedIn] = useState(false)
  const [name, setName] = useState('')

  const updateUserName = async (user) => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(async () => {
        const userDetails = {
          uid: user.uid,
          email: user.email,
          name,
          provider: user.providerData[0].providerId,
          photoUrl: user.photoURL
        }
        const userRef = doc(firestore, 'users', user.uid)
        await setDoc(userRef, JSON.parse(JSON.stringify(userDetails)))
        setLoggedIn(true)
      })
  }

  onAuthStateChanged(auth, user => {
    if (user) {
      if (user.displayName) setLoggedIn(true)
      else updateUserName(user)
    }
  })

  return (
    <Layout>
      <Header user={userData} />
      <div style={{ width: '100vw' }} >
        {!loggedIn && !userData && !userLoading && <Intro setName={setName} />}
        {loggedIn && userData && !userLoading && (
          <User userData={userData} />
        )}
      </div>
      <Footer user={userData} />
    </Layout>
  )
}

export default Home

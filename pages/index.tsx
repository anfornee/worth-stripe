import React from 'react'
import firebase from '../firebase/firebaseClient'
import { useAuthState } from 'react-firebase-hooks/auth'
import User from '../components/User'
import Intro from '../components/Intro'
import homeStyles from '../styles/Home.module.scss'

const Home = () => {
  const [userData, userLoading] = useAuthState(firebase.auth())
  return (
    <div className={homeStyles.mainContainer}>
      {!userData && !userLoading && <Intro />}
      {userData && !userLoading && (
        <User userData={userData} />
      )}
    </div>
  )
}

export default Home

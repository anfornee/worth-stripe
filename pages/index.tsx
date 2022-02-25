import React from 'react'
import { auth } from '../firebase/firebaseClient'
import { useAuthState } from 'react-firebase-hooks/auth'
import Layout from '../components/layout/Layout'
import User from '../components/User'
import Intro from '../components/Intro'
import homeStyles from '../styles/Home.module.scss'

const Home = () => {
  const [userData, userLoading] = useAuthState(auth)

  return (
    <Layout>
      <div className={homeStyles.mainContainer}>
        {!userData && !userLoading && <Intro />}
        {userData && !userLoading && (
          <User userData={userData} />
        )}
      </div>
    </Layout>
  )
}

export default Home

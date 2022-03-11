import React from 'react'
import { auth } from '../firebase/firebaseClient'
import { useAuthState } from 'react-firebase-hooks/auth'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Layout from '../components/layout/Layout'
import User from '../components/User'
import Intro from '../components/Intro'
import homeStyles from '../styles/Home.module.scss'

const Home = () => {
  const [userData, userLoading] = useAuthState(auth)

  return (
    <Layout>
      <Header user={userData} />
      <div>
        {!userData && !userLoading && <Intro />}
        {userData && !userLoading && (
          <User userData={userData} />
        )}
      </div>
      <Footer user={userData} />
    </Layout>
  )
}

export default Home

import React, { useState } from 'react'
import Login from './login/Login'
import SignUp from './login/SignUp'
import styles from '../styles/Intro.module.scss'

const Intro = ({ setName }) => {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className={'centeredVertContainer ' + styles.introContainer}>
      {
        isSignUp
          ? <SignUp setIsSignUp={setIsSignUp} setName={setName} />
          : <Login setIsSignUp={setIsSignUp} />
      }
    </div>
  )
}

export default Intro

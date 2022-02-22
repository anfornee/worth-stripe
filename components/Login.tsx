import React, { ReactElement } from 'react'
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth"
import { auth } from '../firebase/firebaseClient'
import Button from '@mui/material/Button'

interface Props {}

const Login = ({}: Props): ReactElement => {

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  return (
    <div>
      <Button
        variant='contained'
        onClick={() => signInWithGoogle()}
      >
        Sign in with Google
      </Button>
    </div>
  )
}

export default Login

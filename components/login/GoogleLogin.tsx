import React from 'react'
import {
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import { doc, setDoc, collection } from 'firebase/firestore'
import { auth, firestore } from '../../firebase/firebaseClient'
import Button from '@mui/material/Button'

const GoogleLogin = ({ styles }) => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(auth, provider)
    const userDetails = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL
    }
    await setDoc(doc(firestore, 'users', user.uid), userDetails) 
  }

  return (
    <Button
      variant='contained'
      onClick={() => signInWithGoogle()}
      fullWidth
    >
      Sign in with Google
    </Button>
  )
}

export default GoogleLogin

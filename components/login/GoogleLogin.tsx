import React from 'react'
import Image from 'next/image'
import {
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, firestore } from '../../firebase/firebaseClient'
import Button from '@mui/material/Button'
import googleIcon from '../../public/icons/google-icon.png'

const GoogleLogin = ({ styles, isSignUp = false }) => {
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
      className={styles.externalAuthButton}
      onClick={() => signInWithGoogle()}
      startIcon={<Image src={googleIcon} width='25' height='25' />}
      fullWidth
    >
      {
        isSignUp
          ? 'Sign Up With Google'
          : 'Log in with Google'
      }
    </Button>
  )
}

export default GoogleLogin

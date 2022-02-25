import React, { ReactElement, useState } from 'react'
import {
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth"
import { doc, setDoc, collection } from 'firebase/firestore'
import { auth, firestore } from '../firebase/firebaseClient'
import Button from '@mui/material/Button'

interface Props { }

const Login = ({ }: Props): ReactElement => {
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  // const signUpWithEmail = async () => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(userCredentials => {
  //       const { user } = userCredentials
  //       console.log(user)
  //     })
  // }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    // signInWithRedirect(auth, provider)

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
    <div>
      {/* <form>
        <input 
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='name'
        />
        <input 
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='email'
        />
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='password'
        />
      </form>
      <Button
        variant='contained'
        onClick={() => signUpWithEmail()}
      >
        Sign Up
      </Button>
      <br /> */}
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

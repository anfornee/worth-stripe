import React, { ReactElement } from 'react'
import firebase from '../firebase/firebaseClient'

interface Props {}

const Login = ({}: Props): ReactElement => {
  const signInWithGithub = async () => {
    const userCredentials = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())

    firebase.firestore()
      .collection('users')
      .doc(userCredentials.user.uid)
      .set({
        uid: userCredentials.user.uid,
        name: userCredentials.user.displayName,
        provider: userCredentials.user.providerData[0].providerId,
        photoUrl: userCredentials.user.photoURL
      })
  }

  const signInWithGoogle = async () => {
    const userCredentials = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())

    firebase.firestore()
      .collection('users')
      .doc(userCredentials.user.uid)
      .set({
        uid: userCredentials.user.uid,
        name: userCredentials.user.displayName,
        provider: userCredentials.user.providerData[0].providerId,
        photoUrl: userCredentials.user.photoURL
      })
  }

  return (
    <div>
      <button onClick={() => signInWithGithub()}>
        Sign in with Github
      </button>
      <button onClick={() => signInWithGoogle()}>
        Sign in with Google
      </button>
    </div>
  )
}

export default Login

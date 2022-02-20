import React, { ReactElement } from 'react'
import firebase from '../firebase/firebaseClient'

interface Props {}

const Logout = ({}: Props): ReactElement => {
  const handleLogoutClicked= async () => {
    return await firebase
      .auth()
      .signOut()
  }

  return (
    <div>
      <button onClick={handleLogoutClicked}>
        Log Out
      </button>
    </div>
  )
}

export default Logout

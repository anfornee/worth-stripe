import React, { ReactElement } from 'react'
import { auth } from '../firebase/firebaseClient'

interface Props {}

const Logout = ({}: Props): ReactElement => {
  const handleLogoutClicked= async () => {
    return await auth.signOut()
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

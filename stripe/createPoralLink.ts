import { firestore } from '../firebase/firebaseClient'
import { getFunctions, httpsCallable } from 'firebase/functions'

export async function createPortalLink(uid: string) {
  console.log(uid)
  const functions = getFunctions(firestore.app, 'us-central1')

  const functionRef = httpsCallable(functions, 'ext-firestore-stripe-payments-createPortalLink')
  console.log(functionRef)
  console.log('location origin: ', window.location.origin)
  const { data } = await functionRef({ returnUrl: window.location.origin })
  console.log('data: ', data)
  // window.location.assign(data.url);

  return 'hello'
}

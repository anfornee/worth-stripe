import firebase, { firestore } from '../firebase/firebaseClient'
import { getFunctions } from 'firebase/functions'

export async function createPortalLink(uid: string) {
  const functions = getFunctions(firestore.app, "us-central1")
  console.log(functions)

  const { data } = await functionRef({
    returnUrl: window.location.origin,
    locale: "us-central1", // Optional, defaults to "auto"
    configuration: 'bpc_1JSEAKHYgolSBA358VNoc2Hs', // Optional ID of a portal configuration: https://stripe.com/docs/api/customer_portal/configuration
  })
  window.location.assign(data.url)

  return 'hello'
}

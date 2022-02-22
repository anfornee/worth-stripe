import firebase, { firestore } from '../firebase/firebaseClient'

export async function createPortalLink(uid: string) {
  const functionRef = firebase
    .app()
    .functions('us-central1')
    .httpsCallable('ext-firestore-stripe-payments-createPortalLink')

  const { data } = await functionRef({
    returnUrl: window.location.origin,
    locale: "auto", // Optional, defaults to "auto"
    configuration: 'bpc_1JSEAKHYgolSBA358VNoc2Hs', // Optional ID of a portal configuration: https://stripe.com/docs/api/customer_portal/configuration
  })
  window.location.assign(data.url)

  return 'hello'
}

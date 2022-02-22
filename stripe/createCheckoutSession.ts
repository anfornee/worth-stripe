import { firestore } from '../firebase/firebaseClient'
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore'
import getStripe from './initializeStripe'

export async function createCheckoutSession(uid: string, price: string) {
  // Create a new checkout session in the subcollection inside users document
  // const newUserSession = await doc(firestore, 'users', uid)
  // const checkoutSessionRef = await setDoc(
  //   collection()
  // )

  const docRef = await setDoc(doc(firestore, `users/${uid}/checkout_sessions`), {
    price: 'price_1GqIC8HYgolSBA35zoTTN2Zl',
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })

  onSnapshot(docRef, (snap) => {
  const { error, url } = snap.data();
    if (error) {
      // Show an error to your customer and
      // inspect your Cloud Function logs in the Firebase console.
      alert(`An error occured: ${error.message}`);
    }
    if (url) {
      // We have a Stripe Checkout URL, let's redirect.
      window.location.assign(url);
    }
  })

  // Wait for the CheckoutSession to get attached by the extension
  // checkoutSessionRef.onSnapshot(async snap => {
  //   const { sessionId } = snap.data()
  //   if (sessionId) {
  //     // We have a session. let's redirect to Checkout
  //     // Init Stripe
  //     const stripe = await getStripe()
  //     stripe.redirectToCheckout({ sessionId })
  //   }
  // })
}

import { firestore } from '../firebase/firebaseClient'
import { collection, addDoc, onSnapshot, getDoc, doc,getDocs } from 'firebase/firestore'
import { stripe } from '../stripe/stripe'

export async function createPortalLink(email: string, uid: string) {
  // const customer = await stripe.customers.list({ email })
  // if (!customer) throw Error('Could not get customer')

  // const { url } = await stripe.billingPortal.sessions.create({
  //   customer: customer.data[0].id,
  //   return_url: `http://localhost:3000`
  // })

  const subColRef = collection(firestore, 'users', `${uid}`, 'subscriptions')
  const userSubscription = await getDocs(subColRef)
  console.log('Subscription ID: ', userSubscription.docs[0].id)

  return 'hello there'

  // const docRef = await addDoc(collection(firestore, `users/${uid}/subscriptions`), {
  //   price,
  //   success_url: window.location.origin,
  //   cancel_url: window.location.origin,
  // });

  // onSnapshot(docRef, (snap) => {
  //   const { error, url } = snap.data();
  //   if (error) {
  //     // Show an error to your customer and
  //     // inspect your Cloud Function logs in the Firebase console.
  //     alert(`An error occured: ${error.message}`);
  //   }
  //   if (url) {
  //     // We have a Stripe Checkout URL, let's redirect.
  //     window.location.assign(url);
  //   }
  // })

  // return window.location.assign(url)
}

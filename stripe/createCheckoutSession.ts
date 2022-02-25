import { firestore } from '../firebase/firebaseClient'
import { collection, addDoc, onSnapshot } from 'firebase/firestore'

export async function createCheckoutSession(uid: string, price: string) {
  const docRef = await addDoc(collection(firestore, `users/${uid}/checkout_sessions`), {
    price,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

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
}

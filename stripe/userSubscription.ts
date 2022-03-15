import { auth } from '../firebase/firebaseClient'

export default async function userSubscription(): Promise<string> {
  await auth.currentUser?.getIdToken(true)

  const decodedToken = await auth.currentUser?.getIdTokenResult()

  const subscription: any = decodedToken?.claims?.stripeRole

  return subscription
}

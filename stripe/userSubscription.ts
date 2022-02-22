import { auth } from '../firebase/firebaseClient'

export default async function userSubscription(): Promise<string> {
  await auth.currentUser?.getIdToken(true)

  const decodedToken = await auth.currentUser?.getIdTokenResult()

  return decodedToken?.claims?.stripeRole
}

import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Stripe | null

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      process.env.STRIPE_SECRET_KEY_TEST
    )
  }
  return stripePromise
}

export default initializeStripe

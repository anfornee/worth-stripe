import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Stripe | null

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_test_7LxXo0RV9TXL1LwzV4MuPF9h"
    )
  }
  return stripePromise
}

export default initializeStripe

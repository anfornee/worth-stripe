import { stripe } from '../../stripe/stripe'
import { createOrRetrieveCustomer } from '../../utils/helpers'
import { getURL } from '../../utils/helpers'
import { NextApiRequest, NextApiResponse } from 'next'
import initializeStripe from '../../stripe/initializeStripe'

const createPortalLink = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { user } = req.body
      if (!user) throw Error('Could not get user')
      const customer = await stripe.customers.create({
        metadata: {
          firebaseUID: user.uid,
          email: user.email
        }
      })

      if (!customer) throw Error('Could not get customer')
      const { url } = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `http://localhost:3000`
      })

      return res.status(200).json({ url })
    } catch (err: any) {
      console.log(err)
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default createPortalLink

import { stripe } from '../../stripe/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

const createPortalLink = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email } = req.body
      if (!email) throw Error('Could not get email')

      const customer = await stripe.customers.list({ email })

      const { url } = await stripe.billingPortal.sessions.create({
        customer: customer.data[0].id,
        return_url: process.env.URL
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

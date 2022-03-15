import { stripe } from '../../stripe/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

const getNextPaymentDate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const email = req.body
      if (!email) throw Error('Could not get user\'s email')

      const customer = await stripe.customers.list({ email })
      if (!customer) throw Error('Could not get Stripe customer data.')

      const data = await stripe.invoices.retrieveUpcoming({
        customer: customer.data[0].id,
      })

      return res.status(200).json( data.next_payment_attempt )
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

export default getNextPaymentDate

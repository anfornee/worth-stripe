import { stripe } from '../../stripe/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

const getNextPaymentDate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, subId } = req.body
      if (!email) throw Error('Could not get user\'s email')

      let subData, customerData, customer, differentEmail
      if (subId) {
          subData = await stripe.subscriptions.retrieve(subId)
          customerData = await stripe.customers.retrieve(subData.customer)
          customer = await stripe.customers.list({ email: customerData.email })
      }

      if (customer.data[0].email !== email) differentEmail = customer.data[0].email 

      // let customer = await stripe.customers.list({ email })
      // if (!customer) {
      //   try {
      //     const sub = await stripe.subscriptions.retrieve(subId)
      //     customer = await stripe.customers.list(sub.customer)
      //   } catch (error) {
      //     throw Error('Could not get Stripe customer data.' + error)
      //   }
      // }

      const data = await stripe.invoices.retrieveUpcoming({
        customer: customer.data[0].id
      })

      return res.status(200).json({
        nextPaymentUnix: data.next_payment_attempt,
        differentEmail
      })
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

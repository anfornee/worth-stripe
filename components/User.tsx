import React from 'react'
import Logout from './Logout'
import { createCheckoutSession } from '../stripe/createCheckoutSession'
import { createPortalLink } from '../stripe/createPoralLink'
import usePremiumStatus from '../stripe/usePremiumStatus'
import Button from '@mui/material/Button'
import userStyles from '../styles/User.module.scss'

const products = [
  {
    title: 'Premium',
    price: 'price_1KUnMHGcvZKv3JxvlOgnzXIP',
  },
  {
    title: 'One Bag Per Month',
    price: 'price_1KUn4eGcvZKv3JxvgaWSJwZO'
  },
  {
    title: 'Two Bags Per Month',
    price: 'price_1KUn5VGcvZKv3Jxv0eiKFPOM'
  },
  {
    title: 'Four Bags Per Month',
    price: 'price_1KUn6mGcvZKv3JxvYFJ33rNz'
  }
]

const productButton = (userData: Object, product: Object, i: Number) => (
  <Button
    key={i.toString()}
    variant='contained'
    className={userStyles.optionButtons}
    onClick={() => createCheckoutSession(userData.uid, product.price)}
  >
    {product.title}
  </Button>
)

const User = ({ userData }) => {
  const userIsSubscribed = usePremiumStatus(userData)
  return (
    <div className='centeredVertContainer text-center'>
      <div>
        <h1>Hello, {userData.displayName}</h1>
        {!userIsSubscribed ? (
          <div className='centeredVertContainer'>
            {products.map((product, i) => productButton(userData, product, i))}
          </div>
        ) : (
          <div>
            <h2>Have a cooke, Premium guy!</h2>
            <Button
              variant='contained'
              onClick={async () => {
                const data = await createPortalLink(userData.uid)
                console.log(data)
              }}
            >
              Manage Subscription
            </Button>
          </div>
        )}
        <Logout />
      </div>
    </div>
  )
}

export default User

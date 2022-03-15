import React from 'react'
import SubscriptionCard from '../subscriptions/SubscriptionCard'
import userStyles from './User.module.scss'
import products from '../../utils/productsData.json'

const UserNotSubscribed = ({ userData }) => (
  <div className='centeredVertContainer'>
    <p className={userStyles.notSubscribedIntro}>
      <span className='block'>
        You are not currently subscribed
      </span>
      <span className='block'>
        to any monthly coffee plans.
      </span>
      <span className='block'>
        Take a look at our offerings below
      </span>
      <span className='block'>
       and see if anything fits your needs.
      </span>
    </p>
    {products.map((productData, i) => (
      <SubscriptionCard
        userData={userData}
        productData={productData}
        key={i}
      />
    ))}
  </div>
)

export default UserNotSubscribed

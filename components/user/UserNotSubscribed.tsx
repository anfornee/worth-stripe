import React from 'react'
import SubscriptionCard from '../subscriptions/SubscriptionCard'
import products from '../../utils/productsData.json'

const UserNotSubscribed = ({ userData, setIsStripeLoading, styles }) => (
  <div className={'centeredVertContainer ' + styles.userNotSubscribedContainer}>
    <p className={styles.notSubscribedIntro}>
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
        setIsStripeLoading={setIsStripeLoading}
        key={i}
      />
    ))}
  </div>
)

export default UserNotSubscribed

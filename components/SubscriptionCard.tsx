import React from 'react'
import { createCheckoutSession } from '../stripe/createCheckoutSession'
import Spacer from '../components/layout/Spacer'
import Button from '@mui/material/Button'
import styles from '../styles/SubscriptionCard.module.scss'

const SubscriptionCard = ({ userData, productData }) => (
  <div className={styles.subscriptionCard}>
    <p>
      <span className={'block ' + styles.subTitle}>
        {productData.title}
      </span>
      <Spacer height='.25em' />
      <span className={'block ' + styles.subDesc}>
        {productData.description}
      </span>
      <Spacer height='.25em' />
      <span className={'block ' + styles.subCost}>
        {productData.cost}
        <span className={styles.monthText}>
          /month
        </span>
      </span>
    </p>
    <Button
      variant='contained'
      className={styles.optionButton}
      onClick={() => createCheckoutSession(userData.uid, productData.price)}
    >
      SUBSCRIBE
    </Button>
  </div>
)

export default SubscriptionCard

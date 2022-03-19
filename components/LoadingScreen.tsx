import React from 'react'
import styles from '../styles/LoadingScreen.module.scss'

const LoadingScreen = ({ isStripeLoading }) => (
  <div style={isStripeLoading ? { display: 'flex' } : { display: 'none' }} className={styles.loadingScreen}>
    <div className={styles.loadingSpinner}>
      <div className={styles.loadingSpinnerInner}>
        <div />
      </div>
    </div>
  </div>
)

export default LoadingScreen

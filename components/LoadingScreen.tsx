import React from 'react'
import styles from '../styles/LoadingScreen.module.scss'

const LoadingScreen = () => (
  <div className={styles.loadingScreen}>
    <div className={styles.loadingSpinner}>
      <div className={styles.loadingSpinnerInner}>
        <div />
      </div>
    </div>
  </div>
)

export default LoadingScreen

import React from 'react'
import styles from './Menu.module.scss'

const Menu = ({ menuIsActive, setMenuIsActive, isUserAccount, setIsUserAccount, setLoggedIn }) => {
  const handleUserAccountClicked = () => {
    setMenuIsActive(false)
    setIsUserAccount(!isUserAccount)
  }

  const handleLogoutClicked = () => {
    setMenuIsActive(false)
    setLoggedIn(false)
  }

  const handleCloseClicked = () => setMenuIsActive(false)

  return (
    <div
      style={menuIsActive ? { top: 0 } : { top: '-12.5em' }}
      className={styles.menuContainer}
    >
      <div
        style={menuIsActive ? { display: 'block' } : { display: 'none' }}
        className={styles.exitMenuContainer} onClick={() => setMenuIsActive(false)}
      />
      <div className={styles.menuItemsContainer}>
        {
          isUserAccount
            ? <p onClick={handleUserAccountClicked} className={styles.menuItem}>SUBSCRIPTION</p>
            : <p onClick={handleUserAccountClicked} className={styles.menuItem}>ACCOUNT DETAILS</p>
        }
        <p className={styles.menuItem} onClick={handleLogoutClicked}>LOGOUT</p>
        <p className={styles.menuItem} onClick={handleCloseClicked}>CLOSE</p>
      </div>
    </div>
  )
}

export default Menu

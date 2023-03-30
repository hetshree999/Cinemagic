import React, { Component } from 'react'
import styles from './Footer.module.css'
export default class extends Component {
  render() {
    return (
      <div className={styles.footermain}>
<footer className={styles.footer}>
  <div className={styles.footer__addr}>
    <h1 className={styles.footer__logo}>CINEMAGIC</h1>
  </div>
  
  <ul className={styles.footer__nav}>
    <div className={styles.navdiv1}>
    <li className="nav__item nav__item--extra">
      <h2 className={styles.nav__title}>Customer Care</h2>
      
      <ul className="nav__ul nav__ul--extra">
        <li>
          <a href="#">24/7 Customer Care </a>
        </li>
		<li> 
          <a href="#">Resend Booking Confirmation</a>
        </li>
		<li>
          <a href="#">Subscribe to Newsletter</a>
        </li>
      </ul>
    </li>
    </div>
    <div className={styles.navdiv2}>
    <li className={styles.nav__item}>
      <h2 className={styles.nav__title}>Cinemagic Exclusive</h2>
      
      <ul className={styles.nav__ul}>
        <li>
          <a href="#">Corporate Vouchers </a>
        </li>
        
        <li>
          <a href="#">Gitf Cards</a>
        </li>
      </ul>
    </li>
    </div>
    <div className={styles.navdiv3}>
	<li className="nav__item nav__item--extra">
      <h2 className={styles.nav__title}>Trending articles</h2>
      
      <ul className="nav__ul nav__ul--extra">
        <li>
          <a href="#">Trending Articles </a>
        </li>
		<li>
          <a href="#">Latest News</a>
        </li>
		<li>
          <a href="#">Magazines</a>
        </li>
      </ul>
    </li>
    </div>
  </ul>

</footer>
 
    
      </div>
    )
  }
}
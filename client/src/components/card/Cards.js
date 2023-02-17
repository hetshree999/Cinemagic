import React, { Component } from 'react'
import styles from "./Cards.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class Cards extends Component {
  render() {
    return (
      <div className={styles.grid}>
        <div className={styles.griditem}>
          <div className={styles.card}>
            <img className={styles.cardimg} src="./images/c2.jpg"/>
            <div className={styles.cardcontent}>
              <h2 className={styles.cardheader}>Ek Villian</h2>
              <p className={styles.cardtext}>Genre: Romantic</p>
              {/* <p className={styles.cardtext}>This is my fav</p> */}
              <button className={styles.cardbtn}>View More<span>&rarr;</span></button>
            </div>
          </div>
        </div>
        <div className={styles.griditem}>
          <div className={styles.card}>
            <img className={styles.cardimg} src="./images/c3.jpg"/>
            <div className={styles.cardcontent}>
              <h2 className={styles.cardheader}>Ek Villian</h2>
              <p className={styles.cardtext}>Genre: Romantic</p>
              {/* <p className={styles.cardtext}>This is my fav</p> */}
              <button className={styles.cardbtn}>View More<span>&rarr;</span></button>
            </div>
          </div>
        </div>
        <div className={styles.griditem}>
          <div className={styles.card}>
            <img className={styles.cardimg} src="./images/c4.jpg"/>
            <div className={styles.cardcontent}>
              <h2 className={styles.cardheader}>Ek Villian</h2>
              <p className={styles.cardtext}>Genre: Romantic</p>
              {/* <p className={styles.cardtext}>This is my fav</p> */}
              <button className={styles.cardbtn}>View More<span>&rarr;</span></button>
            </div>
          </div>
        </div>
        <div className={styles.griditem}>
          <div className={styles.card}>
            <img className={styles.cardimg} src="./images/c2.jpg"/>
            <div className={styles.cardcontent}>
              <h2 className={styles.cardheader}>Bahubali</h2>
              <p className={styles.cardtext}>Genre: Romantic</p>
              {/* <p className={styles.cardtext}>this is my fav</p> */}
              <button className={styles.cardbtn}>View More<span>&rarr;</span></button>
            </div>
          </div>
        </div>
        <div className={styles.griditem}>
          <div className={styles.card}>
            <img className={styles.cardimg} src="./images/c2.jpg"/>
            <div className={styles.cardcontent}>
              <h2 className={styles.cardheader}>Bahubali</h2>
              <p className={styles.cardtext}>Genre: Romantic</p>
              {/* <p className={styles.cardtext}>this is my fav</p> */}
              <button className={styles.cardbtn}>View More<span>&rarr;</span></button>
            </div>
          </div>
        </div>
        <div className={styles.griditem}>
          <div className={styles.card}>
            <img className={styles.cardimg} src="./images/c3.jpg"/>
            <div className={styles.cardcontent}>
              <h2 className={styles.cardheader}>Bahubali</h2>
              <p className={styles.cardtext}>Genre: Romantic</p>
              {/* <p className={styles.cardtext}>this is my fav</p> */}
              <button className={styles.cardbtn}>View More<span>&rarr;</span></button>
            </div>
          </div>
        </div>
        <div className={styles.griditem}>
          <div className={styles.card}>
            <img className={styles.cardimg} src="./images/c4.jpg"/>
            <div className={styles.cardcontent}>
              <h2 className={styles.cardheader}>Bahubali</h2>
              <p className={styles.cardtext}>Genre: Romantic</p>
              {/* <p className={styles.cardtext}>this is my fav</p> */}
              <button className={styles.cardbtn}>View More<span>&rarr;</span></button>
            </div>
          </div>
        </div>
        <div className={styles.griditem}>
          <div className={styles.card}>
            <img className={styles.cardimg} src="./images/c2.jpg"/>
            <div className={styles.cardcontent}>
              <h2 className={styles.cardheader}>Bahubali</h2>
              <p className={styles.cardtext}>Genre: Romantic</p>
              {/* <p className={styles.cardtext}>this is my fav</p> */}
              <button className={styles.cardbtn}>View More<span>&rarr;</span></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cards;
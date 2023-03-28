import React, { Component } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './Carousell.module.css'

export default function Carousell() {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
      <div>
        <h4 className={styles.ur}>Upcoming Releases</h4>
        <Carousel responsive={responsive}>
            <div className={styles.cmain}>
                <div className={styles.cimage}>
                <img src='./images/u3.jpg'/>
                </div>
                <h6 className={styles.cheading}>RRRR</h6>
            </div>
            <div className={styles.cmain}>
                <div className={styles.cimage}>
                <img className={styles.cimage} src='./images/c1.jpg'/>
                </div>
                <h6 className={styles.cheading}>Ek Villian 2</h6>
            </div>
            <div className={styles.cmain}>
                <div className={styles.cimage}>
                <img className={styles.cimage} src='./images/c2.jpg'/>
                </div>
                <h6 className={styles.cheading}>Bahubali 3</h6>
            </div>
            <div className={styles.cmain}>
                <div className={styles.cimage}>
                <img className={styles.cimage} src='./images/u1.jpg'/>
                </div>
                <h6 className={styles.cheading}>Dhoom 4</h6>
            </div>
            <div  className={styles.cmain}>
                <div className={styles.cimage}>
                <img className={styles.cimage} src='./images/u2.jpg'/>
                </div>
                <h6 className={styles.cheading}>Fitoor 2</h6>
            </div>
        </Carousel>;
      </div>
    )
  
}
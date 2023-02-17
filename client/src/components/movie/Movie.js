import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./movie.module.css"
import Description from './Description';

const Movie = () => {
    const name = "isha"
    const[movie,setMovie] = useState([''])
    const displayFun = async () => {
        const res = await fetch("http://localhost:5000/movies", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await res.json();
        if(data.status === 201){
            setMovie(data.movies)
        }
        // console.log(movie)
        console.log(data)
    }
    

    useEffect(() => {
        setTimeout(() => {
            displayFun();
        }, 1000)
    
    }, [])

    const display = movie.map((item) => {
        return(
            <div>
        <div className={styles.grid}>
            <div className={styles.griditem}>
                <div className={styles.griditem}>
                    <div className={styles.card}>
                        <img className={styles.cardimg} src="./images/c2.jpg" alt="No"/>
                        <div className={styles.cardcontent}>
                        <h2 className={styles.cardheader}>{item.movieName}</h2>
                        <p className={styles.cardtext}>{item.genre}</p>
                        <Description name={name} />
              {/* <p className={styles.cardtext}>This is my fav</p> */}
                        <NavLink to="/description" className={styles.cardbtn}>View More<span>&rarr;</span></NavLink>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
        )
    })

  return (
    <div>
        {display}
    </div>
  )
}

export default Movie

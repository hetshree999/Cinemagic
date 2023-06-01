import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./movie.module.css"
import Description from './Description';
import Navbar from '../navbar/Navbar';

const Movie = () => {
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
            displayFun();
    }, [])

    const display = movie.map((item) => {
        return(
            <div>
        <div className={styles.grid}>
            <div className={styles.griditem}>
                <div className={styles.griditem}>
                    <div className={styles.card}>
                        <img className={styles.cardimg} src={`http://localhost:5000/image/${item?.image}`} alt="Not Supported"/>
                        <div className={styles.cardcontent}>
                        <h2 className={styles.cardheader}>{item.movieName}</h2>
                        <p className={styles.cardtext}>{item.genre}</p>
                        {/* <p className={styles.cardtext}>{item.duration}</p> */}
                        {/* <Description name="pathan" /> */}
              {/* <p className={styles.cardtext}>This is my fav</p> */}
                        <NavLink to={`/description/${item._id}`} className={styles.cardbtn}>View More<span>&rarr;</span></NavLink> 
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
        )
    })

  return (
    <>
    <Navbar />
    <div className="movieCard" style={{ display: "flex", flexWrap:"wrap", marginLeft:"8rem", overflow:"hidden", marginTop:"2rem"}}>
        {display}
    </div>
    </>
  )
}

export default Movie

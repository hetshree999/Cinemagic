import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/Context'
import { useLocation } from 'react-router-dom';

const AddShow = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    console.log(logindata)
    const [user, setUser] = useState('')
    const [data, setData] = useState(false);
    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("tadmindatatoken");
    
        const res = await fetch("http://localhost:5000/validadmin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();
        console.log(data)
        if (data.status === 401 || !data) {
          console.log("error page")
          history("*");
        } else {
          console.log("user verify");
          setLoginData(data)
          setUser(data.ValidUserOne.tname)
        }    
    }
    const[movie,setMovie] = useState([''])
    const[show, setShow] = useState({
        movie: "",
        timing: "",
        price: "",
    })

    const setValue = ({currentTarget: input}) => {
        setShow({...show, [input.name]:input.value})
    }
    const[selectedMovie, setSelectedMovie] = ('')

    const displayFun = async () => {
        const res = await fetch("http://localhost:5000/options", {
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

    const submit = async(e) => {
        e.preventDefault();

        const {movie, timing, price} = show;
        console.log(show)
        console.log(user)
        const url = "http://localhost:5000/addShow"
        const data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body:JSON.stringify({
                movie, timing, price, user
            })
        })
        const res = await data.json();
        console.log(res)
    }
    // displayFun()
    // useEffect(() => {
    //     setTimeout(() => {
    //         displayFun();
    //     })
    
    // }, [])

    const display = movie.map((item, i) => {
        return(
            <option key={i} value={item.movieName}>{item.movieName}</option>
        )}
    )
    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        })
    
    }, [])

  return (
    <div>
        <form className="row g-3">
            <select name="movie" onClick={displayFun} value={show.movie} onChange={setValue}>
                <option value="">Select movie</option>
		        {display}
	        </select>
            
            <label htmlFor="timing" className="form-label">Timing</label>
            <input type="time" name='timing' value={show.timing} onChange={setValue}/>
            <label htmlFor="price" className="form-label">Price</label>
            <input type="text" name='price' value={show.price} onChange={setValue}/>
            <button type='submit' onClick={submit}>Submit</button>
        </form>
    </div>
  )
}

export default AddShow

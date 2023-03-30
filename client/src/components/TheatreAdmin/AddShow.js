import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/Context'
import { ToastContainer, toast } from 'react-toastify';
// import {DayPicker} from 'react-day-picker'
// import 'react-day-picker/dist/style.css'
// import 'react-toastify/dist/ReactToastify.css';
import styles from './AddShow.module.css'

const AddShow = () => {
    // useEffect(() => {
    //     var today = new Date().toISOString().split('T')[0];
    //     console.log(today);
    //     document.getElementsByName("date")[0].setAttribute('min', today);
    // })
    const { logindata, setLoginData } = useContext(LoginContext);
    // console.log(logindata)
    const [theatreName, setTheatreName] = useState('')
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
        //   console.log("error page")
          history("*");
        } else {
        //   console.log("user verify");
          setLoginData(data)
          setTheatreName(data.ValidUserOne.tname)
        }    
    }
    const[movie,setMovie] = useState([''])
    const[show, setShow] = useState({
        movie: "",
        timing: "",
        normalPrice: "",
        executivePrice: "",
        premiumPrice: "",
        date: ""
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

        const {movie, timing, normalPrice, executivePrice, premiumPrice, date} = show;
        if(movie==="" || timing==="" || normalPrice==="" || executivePrice==="" || premiumPrice==="" || date===""){
            toast.error('Please fill required field!', {
                position: "top-center"
            })
        }
        else{
        console.log(show)
        // console.log(theatreName)
        const url = "http://localhost:5000/addShow"
        const data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body:JSON.stringify({
                movie, timing, normalPrice, executivePrice, premiumPrice, theatreName, date
            })
        })

        const res = await data.json();
        console.log(res)

        if(res.status === 201){
            toast.success('Show added successfuly!', {
                position: "top-center"
              })
            
            setShow({
                movie: "",
        timing: "",
        normalPrice: "",
        executivePrice: "",
        premiumPrice: "",
        date: ""
            })

        }
        else if(res.status === 422 ){
            toast.warning('This movie already exist!', {
              position: "top-center"
            })
        }
    }
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
        var today = new Date().toISOString().split('T')[0];
        console.log(today);
        document.getElementsByName("date")[0].setAttribute('min', today);
    }, [])
// const today = new Date()
// const disablePastDate = () => {
//     const today = new Date();
//     const dd = String(today.getDate() ).padStart(2, "0");
//     const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
//     const yyyy = today.getFullYear();
//     return yyyy + "-" + mm + "-" + dd;
// };
  return (
    <div>
        <center>
        <form className="row g-3">
            <h3>Add Show</h3>
            <select name="movie" onClick={displayFun} value={show.movie} onChange={setValue}>
                <option value="">Select movie</option>
		        {display}
	        </select>
            <label htmlFor="date" className="form-label">Date</label>
            {/* <DayPicker /> */}
            {/* <input type="date" name="date" value={show.date} onChange={setValue} /> */}
            <input name="date" value={show.date} onChange={setValue} type="date"/>
            <label htmlFor="timing" className="form-label">Timing</label>
            <input type="time" name='timing' value={show.timing}  onChange={setValue}/>
            <label htmlFor="price" className="form-label">Normal Price</label>
            <input type="text" name='normalPrice' value={show.normalPrice} onChange={setValue}/>
            <label htmlFor="price" className="form-label">Executive Price</label>
            <input type="text" name='executivePrice' value={show.executivePrice} onChange={setValue}/>
            <label htmlFor="price" className="form-label">premium Price</label>
            <input type="text" name='premiumPrice' value={show.premiumPrice} onChange={setValue}/>
            
            <button type='submit' onClick={submit}>Submit</button>
        </form>
        </center>
        <ToastContainer />
    </div>
  )
}

export default AddShow

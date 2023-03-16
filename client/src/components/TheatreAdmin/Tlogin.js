import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tlogin = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email:"",
    password:"", 
  })

  const setValue = ({currentTarget: input}) => {
    setUser({...user, [input.name]:input.value})
  }

  const userLogin = async(e) => {
    e.preventDefault()

    const {email, password}  = user;

    if(password === "" || email === ""){
        toast.error("Please enter required field!", {
            position: 'top-center'
        });
    }
    else if(!email.includes("@")){
        toast.error("Please enter valid email address!", {
            position: 'top-center'
        });
    }
    else if(password.length < 6){
        toast.warning("Password length must be greater or equal to 6!", {
            position: 'top-center'
        });
    }
    else{
        // console.log("done!!");
        const data = await fetch("http://localhost:5000/theatreadminlogin", {
            method: "POST",
            withCredentials: true,
            Credentials:"include",
            headers:{
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({
                email, password
            })
        });
        console.log("done!!");
        const res = await data.json();
        console.log(res.status)
        if(res.status === 201){
            localStorage.setItem("tadmindatatoken",res.result.token);
            navigate("/thome")
            setUser({...user,email:"",password:""});
        } 
        else if(res.status === 401){
            toast.error(res.error, {
                position: 'top-center'
            });
        }
        else if(res.error === "invalid details"){
            toast.error("Invalid password!", {
                position: 'top-center'
            });
        }
        else if(res.error === "email doesn't exist"){
            toast.error("Email does not exist!", {
                position: 'top-center'
            });
        }
    }
}

  return (
    <div>
      <img className="wave" src="./images/bg.png" alt='wave'/>
            <div className="container">
                <div className="img">
                    <img src="./images/img.webp" alt='bg'/>
                </div>
                <div className="login-content">
                    <form action="index.html">
                        <img src="./images/avt.png" alt='avatar'/>
                        <h4 className="title">Theatre Admin Login</h4>

                        <div className="input-div one">
                           <div className="i">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="div">
                                <input type="text" className="input" value={user.email} onChange={setValue} placeholder="Email" name='email'/>
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i"> 
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                <input type="password" className="input" value={user.password} onChange={setValue} placeholder="Password" name='password'/>
                            </div>
                        </div>
                        
                        <input type="submit" className="btn" value="Login" onClick={userLogin} />
                        <h6>Don't have an account?<NavLink to='/req'>SignUp</NavLink></h6>
                    </form>
                    <ToastContainer />
                </div>
            </div>
    </div>
  )
}

export default Tlogin

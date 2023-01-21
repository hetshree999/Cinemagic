import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {

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
        alert("Please enter required field!");
    }
    else if(!email.includes("@")){
        alert("Please enter valid email address!");
    }
    else if(password.length < 6){
        alert("Password length must be greater or equal to 6!");
    }
    else{
        // console.log("done!!");
        const data = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email, password
            })
        });

        const res = await data.json();
        console.log(res)
        if(res.status === 201){
            localStorage.setItem("usersdatatoken",res.result.token);
            // navigate("/dash")
            setUser({...user,email:"",password:""});
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
                        <h2 className="title">Welcome</h2>

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
                        <p>Don't have an account?<NavLink to='/signin'>SignUp</NavLink></p>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default Login

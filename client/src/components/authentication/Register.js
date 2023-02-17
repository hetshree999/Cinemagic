import React, {useState} from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './main'
import "./style.css"

// import styles from "./style.css";

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:"",
    })
// console.log(user)
    const setValue = ({currentTarget: input}) => {
        setUser({...user, [input.name]:input.value})
    }

    const addUserData = async(e) => {
        e.preventDefault()

        const {name, email, password, cpassword}  = user;

        if(name === "" || password === "" || email === "" || cpassword === ""){
            toast.warning("Please enter required field!", {
                position: "top-center"
            });
        }
        else if(!email.includes("@")){
            toast.warning("Please enter valid email address!", {
                position: "top-center"
            });
        }
        else if(password.length < 6){
            toast.warning("Password length must be greater or equal to 6!", {
                position: "top-center"
            });
        }
        else if(password !== cpassword){
            toast.warning("Password and confirm password should be same!", {
                position: "top-center"
            });
        }
        else{
            // console.log("Registration done!!");
            console.log(user)
            const url = "http://localhost:5000/register"
            const data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body:JSON.stringify({
                    name, email, password, cpassword
                })
            })

            const res = await data.json();
            console.log(res.error)
            if (res.status === 201) {
                toast.success('Registration done!', {
                    position: "top-center"
                })
                // navigate('/')
                setUser({ ...user, name: "", email: "", password: "", cpassword: "" });
            } 
            else if(res.error === "This Email is Already Exist"){
                toast.warning("Email address already exist!", {
                    position: "top-center"
                })
            }
        }
    }

    return(
        <>
        <div className="forms">
        <img className="wave" src="./images/bg.png" alt="wave"/>
            <div className="container">
                <div className="img">
                    <img src="./images/img.webp" alt="bg"/>
                </div>
                <div className="login-content">
                    <form action="">
                        <img src="./images/avt.png" alt="avatar"/>
                        <h2 className="title">Sign Up</h2>
                        <div className="input-div one">
                           <div className="i">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="div">
                                <input type="text" className="input" value={user.name} onChange={setValue} placeholder="Username" name="name"/>
                            </div>
                        </div>
                        <div className="input-div one">
                           <div className="i">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="div">
                                <input type="text" className="input" value={user.email} onChange={setValue} placeholder="Email" name="email"/>
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i"> 
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                <input type="password" className="input" value={user.password} onChange={setValue} placeholder="Password" name="password"/>
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i"> 
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                <input type="password" className="input" value={user.cpassword} onChange={setValue} placeholder="Confirm password" name="cpassword"/>
                            </div>
                        </div>
                        
                        <input type="submit" className="btn" value="Register" onClick={addUserData} />
                        <h6>Already have an account?<NavLink to='/'>Login</NavLink></h6>
                    </form>
                    <ToastContainer />
                </div>
            </div>
            </div>
        </>
    )
}

export default Register
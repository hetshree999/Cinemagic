import React, {useEffect, useState} from "react"
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './main'

const Profile = () => {
    const id = localStorage.getItem("userid");
    // const [userEmail, setUserEmail] = useState("")
    // const [userName, setUserName] = useState("")
    const [user, setUser] = useState({
        email:"",
        name:"", 
      })

      const setValue = ({currentTarget: input}) => {
        setUser({...user, [input.name]:input.value})
    }

    useEffect(() => {
        
        const fetchData = async () => {
            // const id = localStorage.getItem("userid");
            const res = await fetch("http://localhost:5000/findUser/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            console.log(data)
            setUser({name:data.user.name, email:data.user.email})
        }
        fetchData()

    }, [user])

    const userUpdate = async(e) => {
        e.preventDefault()
        
        const {email, name}  = user;
        console.log(email, name);
        if(name === "" || email === ""){
            toast.error("Please enter required field!", {
                position: 'top-center'
            });
        }
        else if(!email.includes("@")){
            toast.error("Please enter valid email address!", {
                position: 'top-center'
            });
        }
        else{
            // console.log("done!!");
            const data = await fetch("http://localhost:5000/updateUser/"+id , {
                method: "PUT",
                withCredentials: true,
                Credentials:"include",
                headers:{
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body:JSON.stringify({
                    email, name
                })
            });
            const res = await data.json();
            console.log(res.status);
            if(res.status===200)
            {
                toast.success("Uppdated Successfully", {
                    position: 'top-center'
                });
            }
            else if(res.status === 500)
            {
                toast.error("Something went wrong!", {
                    position: 'top-center'
                });
            }
        // console.log(res)
        }
    }

    
    return(
        <>
        <center>
        <div className="forms" style={{marginLeft:"37%"}}>
        {/* <img className="wave" src="./images/bg.png" alt="wave"/> */}
            <div className="container">
                {/* <div className="img">
                    <img src="./images/img.webp" alt="bg"/>
                </div> */}
                <div className="login-content">
                    <form action="">
                        <img src="./images/avt.png" alt="avatar"/>
                        <h3 className="title">Update Profile</h3>
                        <div className="input-div one">
                           <div className="i">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="div">
                                <input type="text" className="input" defaultValue={user.name}  onChange={setValue} placeholder="Username" name="name"/>
                            </div>
                        </div>
                        <div className="input-div one">
                           <div className="i">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="div">
                                <input type="text" className="input" defaultValue={user.email} onChange={setValue}  placeholder="Email" name="email"/>
                            </div>
                        </div>
                        
                        <input type="submit" className="btn" value="Update" onClick={userUpdate} />
                        <h6><NavLink to='/home'>Back</NavLink></h6>
                    </form>
                    <ToastContainer />
                </div>
            </div>
            </div>
            </center>
        </>
    )
}
export default Profile
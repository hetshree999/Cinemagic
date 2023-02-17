import React, {useState} from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../authentication/style.css"

const Request = () => {
    const [TAdmin, setTAdmin] = useState({
        tname:"",
        temail:"",
        tpassword:"",
        cpassword:"",
    })
    const setValue = ({currentTarget: input}) => {
        setTAdmin({...TAdmin, [input.name]:input.value})
    }

    const addTAdminData = async(e) => {
        e.preventDefault()

        const {tname, temail, tpassword, cpassword}  = TAdmin;

        if(tname === "" || tpassword === "" || temail === "" || cpassword === ""){
            toast.warning("Please enter required field!", {
                position: "top-center"
            });
        }
        else if(!temail.includes("@")){
            toast.warning("Please enter valid email address!", {
                position: "top-center"
            });
        }
        else if(tpassword.length < 6){
            toast.warning("Password length must be greater or equal to 6!", {
                position: "top-center"
            });
        }
        else if(tpassword !== cpassword){
            toast.warning("Password and confirm password should be same!", {
                position: "top-center"
            });
        }
        else{
            // console.log("Registration done!!");
            // console.log(TAdmin)
            // const url = "http://localhost:5000/request"
            const data = await fetch("http://localhost:5000/request", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body:JSON.stringify({
                    tname, temail, tpassword, cpassword
                })
            })
            const res = await data.json();
            // console.log(res.error)
            if (res.status === 201) {
                toast.success('Request sent successfully!', {
                    position: "top-center"
                })
                setTAdmin({ ...TAdmin, tname: "", temail: "", tpassword: "", cpassword: "" });
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
        <div className="container">
        <div className="img">
        <img src="./images/admin.jpeg" alt="bg"/>
        <br></br>             
        </div>
        <div className="login-content">
            <form action="">
                <img src="./images/avt.png" alt="avatar"/>
                <h2 className="title">Request</h2>
                <div className="input-div one">
                    <div className="i">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                        <input type="text" className="input" value={TAdmin.tname} onChange={setValue} placeholder="Theatername" name="tname"/>
                    </div>
                </div>
                <div className="input-div one">
                    <div className="i">
                        <i className="fas fa-envelope"></i>
                    </div>
                    <div className="div">
                        <input type="text" className="input" value={TAdmin.temail} onChange={setValue} placeholder="Email" name="temail"/>
                    </div>
                </div>
                <div className="input-div pass">
                    <div className="i"> 
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="div">
                        <input type="password" className="input" value={TAdmin.tpassword} onChange={setValue} placeholder="Password" name="tpassword"/>
                    </div>
                </div>
                <div className="input-div pass">
                    <div className="i"> 
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="div">
                        <input type="password" className="input" value={TAdmin.cpassword} onChange={setValue} placeholder="Confirm password" name="cpassword"/>
                    </div>
                </div>
                <input type="submit" className="btn" value="Request" onClick={addTAdminData} />
                {/* <p>Already have an account?<NavLink to='/'>Login</NavLink></p> */}
            </form>
        <ToastContainer />
    </div>
    </div>
        </>
    )
}

export default Request
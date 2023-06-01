import React, {useEffect, useState} from "react"
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import styles from '../movie/description.module.css'
import 'react-toastify/dist/ReactToastify.css';

const Customer = () => {
    const id = localStorage.getItem("userid");
    const [user, setUser] = useState([{
        name:"",
        email:"",
        role:""
    }])

      const setValue = ({currentTarget: input}) => {
        setUser({...user, [input.name]:input.value})
    }

    const fetchData = async () => {
        // const id = localStorage.getItem("userid");
        const res = await fetch("http://localhost:5000/users/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await res.json();
        console.log(data.users)
        // setUser({name:data.user.name, email:data.user.email})
        setUser(data.users)
    }

    const display = user.map((m)=>{
        console.log(m);
        return(
          <>
            <tbody style={{border:'1px solid black'}}>
              <tr key={m._id} style={{border:'1px solid black'}}>
                  <td style={{border:'1px solid black', color:'black'}}>{m.name} </td>
                  <td style={{border:'1px solid black', color:'black'}}>{m.email}</td>
                  <td style={{border:'1px solid black', color:'black'}}>{m.role}</td>
                 
              </tr>
            </tbody>
          </>
        )
      })


    useEffect(() => {
        fetchData()
    }, [])

    return(
        <>
        <div>
          <center><h1>Users</h1></center>
        </div>
        {/* <input type="submit" className="btn" value="View Theater Admin requets"/> */}
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{border:'1px solid black', color:'black'}} scope="col">Username</th>
                  <th style={{border:'1px solid black', color:'black'}} scope="col">Email</th>
                  <th style={{border:'1px solid black', color:'black'}} scope="col">Role</th>
                </tr>
              </thead>
              {display}
            </table>
            <center>
            <NavLink to='/adminDash' className={styles.descbtn}>Back</NavLink> 
            </center>  
        </>
    )
}

export default Customer
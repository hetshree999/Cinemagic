import React, {useState, useEffect} from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./req.module.css"

const Request = () => {
    useEffect(() => {
        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("inspectionDate")[0].setAttribute('min', today);
      });

    const [TAdmin, setTAdmin] = useState({
        tname:"",
        temail:"",
        tpassword:"",
        cpassword:"",
        gstNum:"",
        address:"",
        city:"",
        state:"",
        pincode:"",
        inspectionDate:""
    })
    const setValue = ({currentTarget: input}) => {
        setTAdmin({...TAdmin, [input.name]:input.value})
    }

    const addTAdminData = async(e) => {
        e.preventDefault()

        const {tname, temail, tpassword, cpassword, gstNum, address, city, state, pincode, inspectionDate}  = TAdmin;

        if(tname === "" || tpassword === "" || temail === "" || cpassword === ""|| gstNum==="" || address==="" || city==="" || state==="" || city==="" || pincode==="" || inspectionDate===""){
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
        else if(gstNum.length > 16 || gstNum.length < 15 || gstNum[13] !== 'Z'){
            toast.warning("Please Enter Valid GST number!", {
                position: "top-center"
            });
        }
        else if(pincode.length > 7 || pincode.length<6){
            toast.warning("Please Enter Valid Pincode!", {
                position: "top-center"
            });
        }
        else{
            const url = "http://localhost:5000/request"
            console.log(TAdmin)
            const data = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body:JSON.stringify({
                    tname, temail, tpassword, cpassword, gstNum, address, city, state, pincode, inspectionDate
                })
            })
            const res = await data.json();
            console.log(res.status)
            if (res.status === 201) {
                toast.success('Request sent successfully!', {
                    position: "top-center"
                })
                setTAdmin({ ...TAdmin, tname: "", temail: "", tpassword: "", cpassword: "", gstNum:"", address:"", city:"", state:"", pincode:"", inspectionDate:"" });
            }
            else if(res.error === "Something went wrong"){
                toast.warning("Something went wrong!", {
                    position: "top-center"
                })
            }
        }
    }

    return(
        <>
        <div className={styles.a}>
        <div className={styles.container}>
        {/* <div className="img">
        <img src="./images/admin.jpeg" alt="bg"/>
        <br></br>             
        </div> */}
        <div className={styles.loginContent}>
            <form action="">
                <img src="./images/avt.png" alt="avatar"/>
                <h2 className={styles.title}>Request</h2>
                <div className={styles.inputdiv}>
                    <div className={styles.inputdivOne}>
                    <div className={styles.i}>
                        <i className="fas fa-user"></i>
                    </div>
                    </div>
                    <div className={styles.div} style={{overflow:"hidden"}}>
                        <input type="text" className={styles.input} value={TAdmin.tname} onChange={setValue} placeholder="Theatername" name="tname"/>
                    </div>
                    
                </div>
                <div className={styles.inputdiv} style={{overflow:"hidden"}}>
                    <div className={styles.inputdivTwo}>
                    <div className={styles.i} style={{overflow:"hidden"}}>
                        <i className="fas fa-envelope"></i>
                    </div>
                    </div>
                    <div className={styles.div} style={{overflow:"hidden"}}>
                        <input type="text" className={styles.input} value={TAdmin.temail} onChange={setValue} placeholder="Email" name="temail"/>
                    </div>
                </div>
                <div className={styles.inputdiv} style={{overflow:"hidden"}}>
                    <div className={styles.inputdivOne} style={{overflow:"hidden"}}>
                    <div className={styles.i} style={{overflow:"hidden"}}>
                        <i className="fa fa-key"></i>
                    </div>
                    </div>
                    <div className={styles.div} style={{overflow:"hidden"}}>
                        <input type="text" className={styles.input} value={TAdmin.gstNum} onChange={setValue} placeholder="GST Number" name="gstNum"/>
                    </div>
                </div>
                <div className={styles.inputdiv}>
                    <div className={styles.inputdivOne}>
                    <div className={styles.i}> 
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                        
                    </div>
                    </div>
                    <div className="div">
                        <input type="text" className="input" value={TAdmin.address} onChange={setValue} placeholder="Address" name="address"/>
                    </div>
                </div>
                <div className={styles.inputdiv}>
                    <div className={styles.inputdivOne}>
                    <div className={styles.i}>
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    {/* <i class="fa fa-address-card-o" style={{color:"#858c99"}}></i> */}
                        
                    </div>
                    </div>
                    <div className="div">
                        <input type="text" className="input" value={TAdmin.city} onChange={setValue} placeholder="City" name="city"/>
                    </div>
                </div>
                <div className={styles.inputdiv}>
                    <div className={styles.inputdivOne}>
                    <div className={styles.i}> 
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    {/* <i class="fa fa-address-card-o" style={{color:"#858c99"}}></i> */}
                        
                    </div>
                    </div>
                    <div className="div">
                        <input type="text" className="input" value={TAdmin.state} onChange={setValue} placeholder="State" name="state"/>
                    </div>
                </div>
                <div className={styles.inputdiv} style={{overflow:"hidden"}}>
                    <div className={styles.inputdivOne} style={{overflow:"hidden"}}>
                    <div className={styles.i} style={{overflow:"hidden"}}> 
                    <i className="fa fa-key"></i>
                    {/* <i class="fa fa-address-card-o" style={{color:"#858c99"}}></i> */}
                        
                    </div>
                    </div>
                    <div className="div" style={{overflow:"hidden"}}>
                        <input type="number" className="input" value={TAdmin.pincode} onChange={setValue} placeholder="Pincode" name="pincode" style={{overflow:"hidden"}}/>
                    </div>
                </div>
                <label style={{color:"#999"}}>Date Of Inspection</label>
                <input name="inspectionDate" value={TAdmin.inspectionDate} onChange={setValue} type="date" style={{color:"#999"}}/>  
                <div className={styles.inputdiv}>
                    <div className={styles.inputdivOne}>
                    <div className={styles.i}> 
                        <i className="fas fa-lock"></i>
                    </div>
                    </div>
                    <div className="div">
                        <input type="password" className="input" value={TAdmin.tpassword} onChange={setValue} placeholder="Password" name="tpassword"/>
                    </div>
                </div>
                <div className={styles.inputdiv}>
                    <div className={styles.inputdivOne}>
                    <div className={styles.i}> 
                        <i className="fas fa-lock"></i>
                    </div>
                    </div>
                    <div className="div">
                        <input type="password" className="input" value={TAdmin.cpassword} onChange={setValue} placeholder="Confirm password" name="cpassword"/>
                    </div>
                </div>
                <input type="submit" className="btn" value="Request" onClick={addTAdminData} />
            </form>
        <ToastContainer />
    </div>
    </div>
    </div>
        </>
    )
}

export default Request
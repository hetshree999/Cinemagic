import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from "./finalPay.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FinalPay = () => {
    const navigate = useNavigate()
	const location = useLocation()
	const userid = localStorage.getItem("userid")
	console.log(location)
    const handleCancle = () => {
        navigate(-1)
    }

	const handlePay = async() => {
		// console.log("pay")
		const seat = location.state.seat
		const movie = location.state.movie
		const theatre = location.state.theatre
		const time = location.state.time
		const showdate = location.state.showdate
		const normalPrice = location.state.normalPrice
		const executivePrice = location.state.executivePrice
		const premiumPrice = location.state.premiumPrice
		const total = location.state.total

		const data = await fetch("http://localhost:5000/addBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          seat, movie, theatre, time, normalPrice, executivePrice, premiumPrice, total, showdate, userid
        })
      })

      const res = await data.json()
      console.log(res)

      if(res.status === 201){
        toast.success("Booking confirmed!", {
          position: 'top-center'
      	});
		
      }
	  navigate(-2)
		
	} 
  return (
    <div>
      <header className={styles.pheader}>
	<div className={styles.formcontainer}>
		<div className={styles.pleft}>
			<h3>BILL</h3>
			<form>
				Full name
				<input type="text" name="name" placeholder="Enter name" />
				Email
				<input type="text" name="email" placeholder="Enter email" />

				{/* Address
				<input type="text" name="" placeholder="Enter address" /> */}
				
				City
				<input type="text" name="city" placeholder="Enter City" />
				<div id="zip">
					<label>
						State
						<select>
							<option>Choose State..</option>
							<option>Gujarat</option>
							<option>Rajasthan</option>
							<option>Hariyana</option>
							<option>Uttar Pradesh</option>
							<option>Madhya Pradesh</option>
						</select>
					</label>
						<label>
						Zip code
						<input type="number" name="zip" placeholder="Zip code"></input>
					</label>
				</div>
			</form>
            <input type="submit" name="" value="Pay" onClick={handlePay}/>
		</div>
		<div className={styles.pright}>
			<h3>PAYMENT</h3>
			<form>
				Accepted Card <br />
				<img src="images/card1.png" width="100" />
				<img src="images/card2.png" width="50" />
				<br /><br />

				Card number
			<input type="text" name="cardnumber" placeholder="Enter card number" />
				
				Exp month
				<input type="text" name="month" placeholder="Enter Month" />
				<div id="zip">
					<label>
						Exp year
						<select>
							<option>Choose Year..</option>
							<option>2022</option>
							<option>2023</option>
							<option>2024</option>
							<option>2025</option>
						</select>
					</label>
						<label>
						CVV
						<input type="number" name="cvv" placeholder="CVV" />
					</label>
				</div>
			</form>
			<input type="submit"  value="Cancel" onClick={handleCancle} />
		</div>
	</div>
</header>
<ToastContainer />
    </div>
  )
}

export default FinalPay

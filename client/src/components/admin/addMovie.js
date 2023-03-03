import React from "react"
import { useState } from "react";
import "./astyle.module.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddMovie = () => {

  const [movie,setMovie] = useState({
    movieName:"",
    date:"",
    duration:"",
    description:"",
    genre:"",
    certificate:"",
    dimensions:""
  })

  const [image, setImage] = useState("")

  const setValue = ({currentTarget: input}) => {
      setMovie({...movie, [input.name]:input.value})
  }

  const imageUpload = (e) =>{
    setImage(e.target.files[0])
  }

  const addMovieData = async(e) => {
    e.preventDefault()
    const {movieName,releaseDate,duration,description,genre,certificate,dimensions} = movie;

    if(movieName === "" || releaseDate === "" || duration === "" || description === "" || genre === "" || certificate === "" || dimensions === "" || image === ""){
      toast.warning("Please enter required field!", {
        position: "top-center"
      });
    }
    else{
      console.log(movie)
      console.log(image)
      const url = "http://localhost:5000/addMovie"
      const formdata = new FormData();
      formdata.append('movieName', movie.movieName)
      formdata.append('dimensions', movie.dimensions)
      formdata.append('releaseDate', movie.releaseDate)
      formdata.append('description', movie.description)
      formdata.append('certificate', movie.certificate)
      formdata.append('duration', movie.duration)
      formdata.append('genre', movie.genre)
      formdata.append('poster', image)
      
      const data = await fetch(url, {
        method: "POST",
        body: formdata
      })
      
      const res = await data.json()
      console.log(res.status)
      if(res.status === 201){
        toast.success('Movie added successfuly!', {
          position: "top-center"
        })
      } 
      else if(res.status === 422 ){
        toast.warning('This movie already exist!', {
          position: "top-center"
        })
      }
    }
  }

    return(
        <>
            {/* <button onClick={handleClick}>Add</button>
                {Array.from(Array(counter)).map((c, index) => {
                return <>
                <br></br>
                  <label for="castname" className="form-label">Name</label>
                  <input key={c} type="text"></input>
                  <br></br>
                  <label for="castname" className="form-label">Image</label>
                  <input key={c} type="file"></input>
                        </>;
                })} */}
                {/* <div classNameName="Container">
            <form action="">
                MovieName : <input type="text" name="movieName" placeholder="Movie Name"/>
                
                Relase Date : <input type="date" id="release" name="releaseDate"/>
                <br></br>
                Choose a Certificate : <select name="certificate" id="certificate">
                    <option value="U/A">U/A</option>
                    <option value="U">U</option>
                    <option value="A">A</option>
                    <option value="filmdirector">Film director S</option>
                </select>
                
                Duration : <input type="text" name="Duration" placeholder="03h 20m"/>
                
                Dimensions : <select name="dimensions" id="d">
                    <option value="2D">2D</option>
                    <option value="3D">3D</option>
                </select>
                <br></br>
                Movie Poster :<input type="file" name="image" id="image"/>
                
                Price : <input type="text" name="price" placeholder="Enter Price"/>
                
                Description :<textarea type="text" rows="4" cols="50" name="description" placeholder="Enter description"/>
                
                Genre : <input type="text" name="genre" Placeholder="Genre"/>
                <br></br>
                Cast Members: <br></br>
                CastName : <input type="text" name="castName" Placeholder="Cast Name"/>
                CastImage : <input type="file" name="castImage" id="castImage"/>
                CastProf : <input type="text" name="castProf" placeholder="castProf"/>

            </form>
            </div> */}
            <form className="row g-3" method="post" >
  <div className="col-md-6">
    <label htmlFor="movieName" className="form-label">Movie name</label>
    <input type="text" name="movieName" className="form-control" onChange={setValue} value={movie.movieName}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="releaseDate" className="form-label">Date</label>
    <input type="date" name="releaseDate" className="form-control" onChange={setValue} value={movie.releaseDate}/>
  </div>
  <div className="col-12">
    <label htmlFor="duration" className="form-label">Duration</label>
    <input type="text" name="duration" className="form-control" id="duration" onChange={setValue} value={movie.duration} placeholder="2 hr 10 min"/>
  </div>
  <div className="col-12">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" name="description" className="form-control" onChange={setValue} value={movie.description} placeholder="About the movie"/>
  </div>
  <div className="col-12">
    <label htmlFor="genre" className="form-label">Genre</label>
    <input type="text" name="genre" className="form-control" onChange={setValue} value={movie.genre} placeholder="Comdey, Action"/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputCity" className="form-label">Certificate</label>
     <select name="certificate" id="certificate" className="form-select" onChange={setValue} value={movie.certificate}>
                    <option selected>Choose...</option>
                    <option value="U/A">U/A</option>
                    <option value="U">U</option>
                    <option value="A">A</option>
                    <option value="filmdirector">Film director S</option>
      </select>
    {/* <input type="text" className="form-control" id="inputCity"/> */}
  </div>
  <div className="col-md-4">
    <label htmlFor="inputState" className="form-label">Dimensions</label>
    <select id="inputState" name="dimensions" className="form-select" onChange={setValue} value={movie.dimensions}>
      <option selected>Choose...</option>
      <option>2D</option>
      <option>3D</option>
    </select>
  </div>
  <div className="col-md-12" >
  Movie Image : <input type="file" name="uploaded_file" id="castImage" onChange={imageUpload} />
  </div>
  {/* <div className="col-md-2">
    <label for="inputZip" className="form-label">Zip</label>
    <input type="text" className="form-control" id="inputZip"/>
  </div> */}
  <div className="col-12">
    {/* <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div> */}
  </div>
    
  <div className="col-12">
    <button type="submit" className="btn btn-primary" onClick={addMovieData}>Add Movie</button>
  </div>
</form>
<ToastContainer />
        </>
    )
}

export default AddMovie
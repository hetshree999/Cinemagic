import React from 'react'

const Description = (props) => {
  console.log(props.name)
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}

export default Description

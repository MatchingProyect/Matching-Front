import React from 'react'

const DetailClub = ({detailClub, setDetailClub, club}) => {

    if(!detailClub) return null
  return (
    <div>
        <p>{club.showers}</p>
        <p>{club.grills}</p>
        <p>{club.parking}</p>
        <p>{club.security}</p>
        <button onClick={()=>{
            setDetailClub(false)
        }}>x</button>
    </div>
  )
}

export default DetailClub
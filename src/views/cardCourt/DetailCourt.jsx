import React from 'react'

const DetailCourt = ({court ,detail, setDetail}) => {

    if(!detail) return null
  return (
    <div>
        <p>{court.description}</p>
        <p>{court.priceFee}</p>
        <p>{court.warrantyReservation}</p>
        <p>{court.grassType}</p>
        <p>{court.lighting}</p>
        <p>{court.doorsType}</p>
        <p>{court.wallsType}</p>
        <p>{court.reputation}</p>
        <button onClick={()=>{
            setDetail(false)
        }}>x</button>
    </div>
  )
}

export default DetailCourt
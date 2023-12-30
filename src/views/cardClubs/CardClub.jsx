import React, { useState } from 'react'
import AdminFunction from './AdminFunction'


const CardClub = ({club}) => {

  const [editClub, setEditClub] = useState(false)

  return (
    <div>
      <h2>{club.name}</h2>
      <button onClick={()=>{
        setEditClub(true)
      }}>editar club</button>
      <AdminFunction editClub={editClub} setEditClub={setEditClub} club={club}/>
      </div>
  )
}

export default CardClub
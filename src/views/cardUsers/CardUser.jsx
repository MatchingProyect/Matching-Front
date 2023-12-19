import React from 'react'
import {Link} from 'react-router-dom'

const CardUser = ({user}) => {
  return (
    <div>
      <Link to={`/user/${user.id}`}>
      <h2>{user.name}</h2>
      </Link>
    </div>
  )
}

export default CardUser
import React from 'react'
import crearReserva from '../reserva/crearReserva'

const CardCourt = ({court}) => {
    const [reserva, setReserva] = useState(false)
  return (
    <div>
        <h2>{court.name}</h2>
        <button onClick={()=>{setReserva(true)}}>reservar</button>
        <crearReserva reserva={reserva} setReserva={setReserva} court={court} />
    </div>
  )
}

export default CardCourt


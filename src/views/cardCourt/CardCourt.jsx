import React, { useState } from 'react'
import crearReserva from '../reserva/crearReserva'
import { fetchCourts } from '../../redux/reducer'
import { useDispatch } from 'react-redux'
import AdminFunction from './AdminFunction'
import DetailCourt from './DetailCourt'

const CardCourt = ({court}) => {
    const [reserva, setReserva] = useState(false)
    const [update, setUpdate] = useState(false)
    const [detail, setDetail] = useState(false)

    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch()

    const deleted = async()=>{
        try {
            const deleted = await axios.delete(`/Courts/${court.id}`)
            if(deleted.status)  dispatch(fetchCourts());
        } catch (error) {
            alert(error.message)
        }
    }

    if(user.admin){
        return (
            <div>
                <button onClick={deleted}>x</button>
                <h2>{court.name}</h2>
                <button onClick={()=>{setReserva(true)}}>reservar</button>
                <button onClick={()=>{setUpdate(true)}}>update</button>
                <button onClick={()=>{setDetail(true)}} >detail</button>
                <crearReserva reserva={reserva} setReserva={setReserva} court={court} />
                <AdminFunction court={court} update={update} setUpdate={setUpdate} />
                <DetailCourt court={court} detail={detail} setDetail={setDetail} />
            </div>
          )
    }

  return (
    <div>
       
        <h2>{court.name}</h2>
        <button onClick={()=>{setReserva(true)}}>reservar</button>
        <button onClick={()=>{setDetail(true)}} >detail</button>
        <crearReserva reserva={reserva} setReserva={setReserva} court={court} />
        
        <DetailCourt court={court} detail={detail} setDetail={setDetail} />
    </div>
  )
}

export default CardCourt


import React, { useState } from 'react'
import styles from './CardCourt.module.css';
import { fetchCourts } from '../../redux/reducer'
import { useDispatch, useSelector } from 'react-redux'
import AdminFunction from './AdminFunction'
import DetailCourt from './DetailCourt'
import axios from 'axios'

const CardCourt = ({court}) => {
    let exampleImg = 'https://www.italgreen.es/computedimage/campi-da-padel.i13627-kQvmQQH-w1000-h1000-l1-n1.jpg';
    // const [reserva, setReserva] = useState(false)
    // const [update, setUpdate] = useState(false)
    // const [detail, setDetail] = useState(false)

    // const user = useSelector((state) => state.user.user);

    // const dispatch = useDispatch()

    // const deleted = async()=>{
    //     try {
    //         const deleted = await axios.delete(`/Courts/${court.id}`)
    //         if(deleted.status)  dispatch(fetchCourts());
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }

    // if(user.admin){
    //     return (
    //         <div>
    //             <button onClick={deleted}>x</button>
    //             <h2>{court.name}</h2>
    //             <button onClick={()=>{setReserva(true)}}>reservar</button>
    //             <button onClick={()=>{setUpdate(true)}}>update</button>
    //             <button onClick={()=>{setDetail(true)}} >detail</button>
    //             <crearReserva reserva={reserva} setReserva={setReserva} court={court} />
    //             <AdminFunction court={court} update={update} setUpdate={setUpdate} />
    //             <DetailCourt court={court} detail={detail} setDetail={setDetail} />
    //         </div>
    //       )
    // }
    const deleted = async()=>{
        try {
            const deleted = await axios.delete(`/Courts/${court.id}`)
            if(deleted.status)  dispatch(fetchCourts());
        } catch (error) {
            alert(error.message)
        }
    }
console.log("holi",user.admin)
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
    <div className = {styles.cardCourtContainer}>       
        {/* <h2>{court.name}</h2>
        <button onClick={()=>{setReserva(true)}}>reservar</button>
        <button onClick={()=>{setDetail(true)}} >detail</button>
        <crearReserva reserva={reserva} setReserva={setReserva} court={court} />        
        <DetailCourt court={court} detail={detail} setDetail={setDetail} /> */}
            <div className = {styles.courtInfo}>
            <h2 className = {styles.courtTitle}>{court.name}</h2>
            <h4 className = {styles.courtText}>Reputation: {court.reputation}</h4>
            <h3 className = {styles.courtText}>{court.priceFee}$</h3>
            </div>
            <img src = {exampleImg} alt = {court.name} className = {styles.img}/>
    </div>
  )
}

export default CardCourt


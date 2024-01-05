import React, { useState } from 'react';
import styles from './CardCourt.module.css';
import { fetchCourts } from '../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import AdminFunction from './AdminFunction';
import DetailCourt from './DetailCourt';
import axios from 'axios';
import CrearReserva from '../reserva/CrearReserva';

const CardCourt = ({ court }) => {
  const [reserva, setReserva] = useState(false);
  const [update, setUpdate] = useState(false);
  const [detail, setDetail] = useState(false);

  const userLogeado = useSelector((state) => state.user.user.user);
  const dispatch = useDispatch();

  const deleted = async () => {
    try {
      const deleted = await axios.delete(`/Courts/${court.id}`);
      if (deleted.status) dispatch(fetchCourts());
    } catch (error) {
      alert(error.message);
    }
  };

  console.log("holi", userLogeado?.admin);

  if (userLogeado?.admin) {
    return (
      <div className={styles.cardCourtContainer}>
        <button onClick={deleted}>Eliminar</button>
        <h2 className={styles.courtTitleAdm}>{court.name}</h2>
        <button onClick={() => { setReserva(true) }}>reservar</button>
        <button onClick={() => { setUpdate(true) }}>update</button>
        <button onClick={() => { setDetail(true) }}>detail</button>
        <CrearReserva reserva={reserva} setReserva={setReserva} court={court} />
        <AdminFunction court={court} update={update} setUpdate={setUpdate} />
        <DetailCourt court={court} detail={detail} setDetail={setDetail} />
      </div>
    )
  }

 

  return (
    <div className={styles.cardCourtContainer}>
      <div className={styles.courtInfo}>
        <h2 className={styles.courtTitle}>{court.name}</h2>
        <h4 className={styles.courtText}>Reputation: {court.reputation}</h4>
        <h3 className={styles.courtText}>{court.priceFee}$</h3>
      </div>
      <img src={court.imgClub} alt={court.name} className={styles.img} />
    </div>
  )
}

export default CardCourt;

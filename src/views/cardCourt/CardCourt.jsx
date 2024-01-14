import React, { useState } from 'react';
import styles from './CardCourt.module.css';
import { fetchCourts } from '../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import AdminFunction from './AdminFunction';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DetailCourt from './DetailCourt';
import axios from 'axios';
import Button from '@mui/material/Button';
import CrearReserva from '../../components/crear-reserva/CrearReserva';

const CardCourt = ({ court }) => {
  const [reserva, setReserva] = useState(false);
  const [update, setUpdate] = useState(false);
  const [detail, setDetail] = useState(false);

  const userLogeado = useSelector((state) => state.user?.dataUser?.user);
  const dispatch = useDispatch();



  const deleted = async () => {
    try {
      const deleted = await axios.put(`/courtEstado/${court.id}`, { estado: false });
      if (deleted.status) dispatch(fetchCourts());
    } catch (error) {
      alert(error.message);
    }
  };


  if (userLogeado?.admin) {
    return (
      <div className={styles.cardCourtAdmin}>
        <div className={styles.cardBody}>
          <div className={styles.courtTitleAdm}><p className={styles.textTxt}>{court.name}</p></div>
          <div className={styles.divButtons}>
            <Button
              sx={{
                'borderStyle': 'solid',
                'borderWidth': '4px',
                'borderColor': '#203144',
                'backgroundColor': '#203144',
                'borderRadius': '5px',
                'fontSize': '12px',
                'fontWeight': '700',
                'color': 'white',
                'height': '30px',
                'width': '10%',
                'boxShadow': '0px 0px 4px 0px rgb(0, 0, 0)',
                'marginRight': '5px',


              }}
              variant="outlined" onClick={() => { setUpdate(true) }}>Update</Button>
            <Button
              sx={{
                'backgroundColor': 'white',
                'borderRadius': '5px',
                'borderStyle': 'none',
                'fontSize': '12px',
                'fontWeight': '700',
                'color': '#203144',
                'height': '30px',
                'width': '10%',
                'boxShadow': '0px 0px 4px 0px rgb(0, 0, 0)',
                'marginRight': '5px',

              }}
              variant="outlined" onClick={() => { setDetail(true) }}>Detail</Button>
            <Button
              onClick={deleted}
              sx={{
                'backgroundColor': 'rgb(178, 0, 0)',
                'borderRadius': '5px',
                'borderStyle': 'none',
                'fontSize': '12px',
                'fontWeight': '700',
                'color': 'white',
                'height': '30px',
                'width': '10%',
                'boxShadow': '0px 0px 4px 0px rgb(0, 0, 0)',
                'marginRight': '5px',

              }}
            >
              Delete
            </Button>
          </div>
        </div>
        <AdminFunction court={court} update={update} setUpdate={setUpdate} />
        <DetailCourt court={court} detail={detail} setDetail={setDetail} />
      </div>
    )
  }

  return (
    <div className={styles.cardCourtContainer}>
      <img src={court.imgClub} alt={court.name} className={styles.img} />
      <div className={styles.courtInfo}>
        <h2 className={styles.courtTitle}>{court.name}</h2>
        <h2 className={styles.courtTitle}>{court.horarioInicio} - {court.horarioCierre}</h2>
        <h4 className={styles.courtText}>Reputacion: {court.reputation}</h4>
        <h3 className={styles.courtText}>{court.priceFee}$</h3>
      </div>      
      <CrearReserva court={court} reserva={reserva} setReserva={setReserva} />
      <button onClick={() => setReserva(true)} className = {styles.openModalBtn}>Reservar</button>
    </div>
  )
}

export default CardCourt;

import React from 'react';
import styles from './DetailCourt.module.css';

const DetailCourt = ({court ,detail, setDetail}) => {

    if(!detail) return null
  return (
    <div className = {styles.holeModal}>
      <div className = {styles.cuadroModal}>
      <div className={styles.modalHeader}>
                    <label className={styles.labelTop}>Información {court.name}</label>
                    <button onClick={()=>{
            setDetail(false)
        }} className={styles.closeBtn}>x</button>
                </div>
        <div className={styles.modalContainer}>
          <p>Descripción</p>
        <p>{court.description}</p>
        </div>
        <div className={styles.modalContainer}>
        <p>Precio</p>
        <p>{court.priceFee}</p>
        </div>
        <div className={styles.modalContainer}>
        <p>Garantía</p>
        <p>{court.warrantyReservation}</p>
        </div>
        
        <div className={styles.modalContainer}>
        <p>Tipo Grass</p>
        <p>{court.grassType}</p>
        </div>
        
        <div className={styles.modalContainer}>
        <p>Iluminación</p>
        <p>{court.lighting}</p>
        </div>
        
        <div className={styles.modalContainer}>
        <p>Puertas</p>
        <p>{court.doorsType}</p>
        </div>
        
        <div className={styles.modalContainer}>
        <p>Paredes</p>
        <p>{court.wallsType}</p>
        </div>
        
        <div className={styles.modalContainer}>
        <p>Rating</p>
        <p>{court.reputation}</p>
        </div>
        </div>
    </div>
  )
}

export default DetailCourt
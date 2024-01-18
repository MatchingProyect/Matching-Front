import React from 'react'
import styles from './DetailClub.module.css';
const DetailClub = ({detailClub, setDetailClub, club}) => {
  console.log(club);

    if(!detailClub) return null
  return (
    <div className = {styles.holeModal}>
      <div className = {styles.holeComp}>
      <div className={styles.modalHeader}>
                    <label className={styles.labelTop}>Informacion del Club</label>
                    <button onClick={()=>{setDetailClub(false)}} className={styles.closeBtn}>x</button>
                </div>
                <div className={styles.modalContainer}>
          <label>Nombre</label>
        <p>{club.name}</p>
        </div>
        <div className={styles.modalContainer}>
          <label>Duchas</label>
        <p>{club.showers}</p>
        </div>
        <div className={styles.modalContainer}>
        <label>Parrillas</label>
        <p>{club.grills}</p>
        </div>        
        <div className={styles.modalContainer}>
        <label>Parking</label>
        <p>{club.parking}</p>
        </div>
        <div className={styles.modalContainer}>
        <label>Seguridad</label>
        <p>{club.security}</p>
        </div>
        </div>
    </div>
  )
}

export default DetailClub
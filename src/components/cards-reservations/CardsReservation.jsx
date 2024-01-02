import React from 'react';
import styles from './CardsReservation.module.css'

export default function CardsReservation({reservations}){
    return(
        <div className = {styles.reservationContainer}>
            <h2 className = {styles.reservTitle}>{reservations.club}</h2>
            <h4 className = {styles.reservSubTitle}>{reservations.sport}</h4>
            <p className = {styles.reservInfo}>{reservations.ciudad}</p>
            <p className = {styles.reservInfo}>{reservations.dateTimeStart[1]} - {reservations.dateTimeEnd[1]}</p>
            <p className = {styles.reservInfo}>${reservations.totalCost}</p>
        </div>
    );
};
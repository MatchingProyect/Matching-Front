import React from 'react';
import styles from './CardsReservation.module.css'

export default function CardsReservation({reservations}){
    return(
        <div>
            <h2>{reservations.club}</h2>
            <h4>{reservations.sport}</h4>
            <p>{reservations.ciudad}</p>
            <p>{reservations.dateTimeStart[1]} - {reservations.dateTimeEnd[1]}</p>
            <p>${reservations.totalCost}</p>
            
        </div>
    )
}

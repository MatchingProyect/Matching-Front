import React from 'react';
import styles from './CardReservation.module.css';
import CardsReservation from '../cards-reservations/CardsReservation';

export default function CardReservation({reservations}){
    console.log(reservations);
    return(
        <div className = {styles.divCardReservation}>
            <h1 className = {styles.compTitle}>Reservaciones</h1>
            {reservations?.map((element) => <CardsReservation reservations = {element}/>)}
        </div>
    )
}
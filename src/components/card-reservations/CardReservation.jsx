import React from 'react';
import styles from './CardReservation.module.css';
import CardsReservation from '../cards-reservations/CardsReservation';

export default function CardReservation({reservations}){
    console.log(reservations);
    return(
        <div>
            <h1>Reservaciones</h1>
            {reservations?.map((element) => <CardsReservation reservations = {element}/>)}
        </div>
    )
}
import React from 'react';
import styles from './CardReservation.module.css';
import CardsReservation from '../cards-reservations/CardsReservation';
import { useSelector } from 'react-redux';

export default function CardReservation({reservations}){
    const courts = useSelector( state => state.user.allCourts);    
    return(
        <div className = {styles.divCardReservation}>
            <h1 className = {styles.compTitle}>Reservaciones</h1>
            <div className = {styles.divCards}>
            {reservations?.map((element) => <CardsReservation reservations = {element} courts = {courts} key = {element.id}/>)}
            </div>
        </div>
    );
};
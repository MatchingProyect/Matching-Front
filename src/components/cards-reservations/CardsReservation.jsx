import React, { useState } from 'react';
import styles from './CardsReservation.module.css';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


export default function CardsReservations({reservations}){

    let [preferenceId, setPreferenceId] = useState('');
    
    initMercadoPago('TEST-ac197b9a-ae79-436d-9bdd-4bd088de5c27');

    const createOrder = async(idReservation) => { 
        try {
            const endpoint = '/createOrder';
            const response = await axios.post(endpoint, {id: idReservation});
            setPreferenceId(response.data.id);
        } catch (error) {
            throw error.message;
        }
    }
    
    return(
        <div className = {styles.reservationContainer}>
            <h2>{reservations.club}</h2>
            <h4>{reservations.sport}</h4>
            <p>{reservations.ciudad}</p>
            <p>{reservations.dateTimeStart[1]} - {reservations.dateTimeEnd[1]}</p>
            <p>${reservations.totalCost}</p>
            <button onClick={() => createOrder(reservations.id)}>Reservar</button>
            {preferenceId && <Wallet initialization={{preferenceId: preferenceId}}/>}

        </div>
    )

}
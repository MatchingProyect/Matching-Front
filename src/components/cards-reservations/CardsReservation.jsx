import React, { useEffect, useState } from 'react';
import styles from './CardsReservation.module.css';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';

export default function CardsReservations({ reservations, courts }) {
    const userLogeado = useSelector((state) => state.user?.user?.user);
    let [preferenceId, setPreferenceId] = useState('');
    initMercadoPago('TEST-ac197b9a-ae79-436d-9bdd-4bd088de5c27');
    const createOrder = async (idReservation) => {
        try {
            const endpoint = '/createOrder';
            const response = await axios.post(endpoint, { id: idReservation });
            setPreferenceId(response.data.id);
        } catch (error) {
            throw error.message;
        }
    };
    const sendEmail = () => {
        const defaultValues = {
            user_name: `${userLogeado.displayName}`,
            user_email: `${userLogeado.email}`,
            message:
                `${userLogeado.displayName},
                
                Hemos detectado que quieres realizar la reserva de una cancha.
                ** RESERVA: ${reservations.dateTimeStart} -- ${reservations.dateTimeEnd}
                ** COSTO TOTAL: ${reservations.totalCost}
                
                Al completarse el pago, verás reflejada en tu bandeja de entrada la información del mismo.
                Muchas gracias!`,
        };
        emailjs
            .send('service_dfonkqh', 'template_j9l4qgp', defaultValues, 'AOct4aYGtYkYpPDCn')
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    const bringCourtName = function(){
            let courtToSearch = reservations?.CourtId;
            let theOne = courts?.find((element) => element.id == courtToSearch);
            return theOne.name;
    }

    return (
        <div className={styles.reservationContainer}>
            <div>
                <p>{courts.length > 0 && bringCourtName()}</p>
                <p>
                {reservations.dateTimeStart} - {reservations.dateTimeEnd}
            </p>
            <p>${reservations.totalCost}</p>
            </div>            
            <button
                onClick={() => {
                    createOrder(reservations.id);
                    sendEmail();
                }}
                className = {styles.btnReservar}
            >
                Reservar
            </button>
            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        </div>
    );
}

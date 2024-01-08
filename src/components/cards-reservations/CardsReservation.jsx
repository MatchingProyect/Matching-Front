import React, { useEffect, useState } from 'react';
import styles from './CardsReservation.module.css';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';

export default function CardsReservations({ reservations }) {
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
                
                Hemos detectado que quieres realizar una reserva de una cancha.
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

    return (
        <div className={styles.reservationContainer}>
            <p>
                {reservations.dateTimeStart} - {reservations.dateTimeEnd}
            </p>
            <p>${reservations.totalCost}</p>
            <button
                onClick={() => {
                    createOrder(reservations.id);
                    sendEmail();
                }}
            >
                Reservar
            </button>
            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        </div>
    );
}

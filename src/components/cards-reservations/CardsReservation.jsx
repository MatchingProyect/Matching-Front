import React, { useEffect, useState } from 'react';
import styles from './CardsReservation.module.css';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import emailjs from '@emailjs/browser';

export default function CardsReservations({ reservations }) {
    let [preferenceId, setPreferenceId] = useState('');
    console.log(reservations);

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
            user_name: 'Lucas',
            user_email: 'mellalucas.v@gmail.com',
            message:
                'Hemos detectado que quieres realizar una reserva. Al completarse el pago, verás en tu bandeja de entrada la información del mismo.',
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
            <h2>{reservations.club}</h2>
            <h4>{reservations.sport}</h4>
            <p>{reservations.ciudad}</p>
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

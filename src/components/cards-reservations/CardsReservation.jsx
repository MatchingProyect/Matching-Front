import React, { useEffect, useState } from 'react';
import styles from './CardsReservation.module.css';

export default function CardsReservations({ reservations, courts }) {
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
        </div>
    );
}

import React from 'react';
import styles from './CardPublicMatch.module.css';
import { useSelector } from 'react-redux';

export default function CardPublicMatch({partidoPublico, unirmeReserva}){
    const courts = useSelector((state) => state.user?.allCourts);
    const locations = useSelector((state) => state.user?.allLocations);
    const LaCourt = function(){
        let theCourtOne = courts.find((element) => element.id == partidoPublico.CourtId);
        console.log(partidoPublico, theCourtOne);
        return theCourtOne.name;
    };


    return(
        <div>
            <h3>{LaCourt()}</h3>
            <label>Inicio: {partidoPublico.dateTimeStart}</label>
            <label>Termino: {partidoPublico.dateTimeEnd}</label>
            <label>Precio: {partidoPublico.totalCost}</label>
        </div>
    )
}
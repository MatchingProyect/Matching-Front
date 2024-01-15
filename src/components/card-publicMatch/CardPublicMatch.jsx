import React from 'react';
import styles from './CardPublicMatch.module.css';

export default function CardPublicMatch({partidoPublico, unirmeReserva, courts, locations, clubs, sports}){
    console.log(partidoPublico);

    const laCourta = function (){
        let theCourtOne = courts?.find((element) => element.id == partidoPublico.CourtId);
        return  theCourtOne?.name;
    }

    const laLocation = function(){
        let theCourtOne = courts?.find((element) => element.id == partidoPublico.CourtId);
        let value = theCourtOne?.LocationId;
        let result = locations?.find((element) => element.id == value);
        return result?.name;
    }
    const laClub = function(){
        let theCourtOne = courts?.find((element) => element.id == partidoPublico.CourtId);
        let value = theCourtOne?.ClubId;
        let result = clubs?.find((element)=> element.id == value);
        return result?.name;
    }

    const laSport = function(){
        let theCourtOne = courts?.find((element) => element.id == partidoPublico.CourtId);
        let value = theCourtOne?.SportId;
        let result = sports?.find((element) => element.id == value);
        return result?.name;
    }

    const laImagen = function(){
        let theCourtOne = courts?.find((element) => element.id == partidoPublico.CourtId);
        return theCourtOne.imgClub;
    }

    return(
        <div>
            <img src = {laImagen()} alt = 'Imagen Court'/>
            <h3>{laCourta()}</h3>
            <h5>{laLocation()}</h5>
            <h5>{laClub()}</h5>
            <h5>{laSport()}</h5>
            <label>Inicio: {partidoPublico.dateTimeStart}</label>
            <label>Termino: {partidoPublico.dateTimeEnd}</label>
            <label>Precio: {partidoPublico.totalCost}</label>
            <button onClick = {unirmeReserva}>Unirme</button>
        </div>
    )
}
import React from 'react';
import axios from 'axios';
import styles from './CardPublicMatch.module.css';

export default function CardPublicMatch({partidoPublico, courts, locations, clubs, sports, userLogeado}){
    console.log(partidoPublico);

    const unirmeReserva = async()=>{
        try {
            const {data} = await axios.post(`/addUserInTeam?UserId=${userLogeado.id}&TeamMatchId=${partidoPublico.TeamMatchId}`)
            console.log(data);
            if(data.status) alert('te uniste con exito')
        } catch (error) {
            throw error.message
        };
      };

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
        <div className = {styles.cardDiv}>
            <img src = {laImagen()} alt = 'Imagen Court' className = {styles.img}/>
            <div className = {styles.dataReserva}>
            <h1 className = {styles.nombreCancha}>{laCourta()}</h1>
            <h2 className = {styles.infoCard}>{laLocation()}</h2>
            <h2 className = {styles.infoCard}>{laClub()}</h2>
            <h2 className = {styles.infoCard}>{laSport()}</h2>
            </div>
            <div className = {styles.infoComp}>
            <label className = {styles.valueCard}>Inicio</label>
            <label className = {styles.valueCard}>{partidoPublico.dateTimeStart}</label>
            </div>
            <div className = {styles.infoComp}>
            <label className = {styles.valueCard}>Término</label>
            <label className = {styles.valueCard}>{partidoPublico.dateTimeEnd}</label>
            </div>
            <div className = {styles.infoComp}>
            <label className = {styles.valueCard}>Precio</label>
            <label className = {styles.valueCard}>${partidoPublico.totalCost}</label>
            </div>
            <button onClick = {unirmeReserva} className = {styles.btnUnirme}>Unirme</button>
        </div>
    )
}
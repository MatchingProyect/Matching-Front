import React from 'react';
import styles from './StatsPerfilDepor.module.css';

export default function StatsPerfilDepor(props){
    const { stats } = props;
    return(
        <div className = {styles.statsPerfilDeportDiv}>
            <div className = {styles.divRow}>
                <p className = {styles.text}>Ganadas: {stats.ganadas}</p>
                <p className = {styles.text}>Perdidas: {stats.perdidas}</p>
                <p className = {styles.text}>Jugadas: {stats.jugadas}</p>
            </div>
            <div className = {styles.divRow}>
            <p className = {styles.text}>Asistencias: {stats.asistencias}</p>
                <p className = {styles.text}>Canceladas: {stats.canceladas}</p>
                <p className = {styles.text}>Organizadas: {stats.organizadas}</p>
            </div>            
        </div>
    );
};
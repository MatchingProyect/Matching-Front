
import styles from './EditDepor.module.css'
import { Link } from 'react-router-dom';
import NavbarLow from '../../../components/navbarLow/navbarLow';
import CardsEditPref from '../../../components/editPreferencias/cardsEditPref/CardsEditPref'


export default function EditDepor(){

    const preferencias = [
        {
            name: "Mano preferida",
            logo : "https://res.cloudinary.com/dbffmtz0y/image/upload/v1702833298/mano_tvuyx6.svg",
            options: [
                "Ambas",
                "Derecha",
                "Izquierda"
            ]
        },
        {
            name: "Posición de la pista",
            logo : "https://res.cloudinary.com/dbffmtz0y/image/upload/v1702833298/position_pkleio.svg",
            options: [
                "Ambas",
                "Derecha",
                "Revés"
            ]
        },
        {
            name: "Tipo de partido",
            logo : "https://res.cloudinary.com/dbffmtz0y/image/upload/v1702833298/tipoPartido_rh5647.svg",
            options: [
                "Competitivo",
                "amistoso"
            ]
        },
        {
            name: "Días de juego",
            logo : "https://res.cloudinary.com/dbffmtz0y/image/upload/v1702833298/calender_omsjik.svg",
            options: [
                "Lunes",
                "Martes"
            ]
        },
        {
            name: "Horario de juego",
            logo : "https://res.cloudinary.com/dbffmtz0y/image/upload/v1702833298/hora_jx7m55.svg",
            options: [
                "Por la tarde",
                "Por la mañana"
            ]
        },
        {
            name: "Categoría",
            logo : "",
            options: [
                "5ta",
                "4ta",
                "3ra"
            ]
        },
        
      ]

    return(
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <div className={styles.containerTitleImg}>
                    <Link to = '/profile'><img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702573291/return_w8ycd2.svg" alt="Return" /></Link>
                </div>
                <div className={styles.containerTitleText}>
                    <p>Editar mis preferencias</p>
                </div>
            </div>

            <CardsEditPref preferencias ={preferencias} ></CardsEditPref>

            <div className={styles.containerButtons}>
                <button className={styles.saveButton}> Guardar </button>
                <button className={styles.cancelButton}> Cancelar</button>

            </div>


            <NavbarLow></NavbarLow>

        </div>
    )
}

import CardsHistorial from "../../components/cards-historial/CardsHistorial"
import styles from './historial.module.css'
import NavbarLow from '../../components/navbarLow/navbarLow';

export default function Historial(){
    const historial = [
        {
            fecha: "12/12",
            hora: "15:00", 
            equipo: ["diego", "jose", "maria"],
            resultado:[ "4-5", "6-7", "8-9"],
            club: "club1"
        },
        {
            fecha: "13/12",
            hora: "16:30", 
            equipo: ["Ana", "Carlos", "Juan"],
            resultado: ["2-2", "3-1", "0-2"],
            club: "club2"
        },
        {
            fecha: "14/12",
            hora: "18:45", 
            equipo: ["Elena", "Francisco", "Gabriel"],
            resultado: ["1-0", "2-4", "3-3"],
            club: "club3"
        },
        {
            fecha: "15/12",
            hora: "14:00", 
            equipo: ["Luis", "Isabel", "Pedro"],
            resultado: ["3-2", "1-1", "4-3"],
            club: "club4"
        },
        {
            fecha: "16/12",
            hora: "17:15", 
            equipo: ["Marta", "Sergio", "Pablo"],
            resultado: ["2-1", "5-4", "3-3"],
            club: "club5"
        },
      ]

    return(
        <div className={styles.containerHistorial}>
            <div className={styles.containerTitle}>
                <div className={styles.containerTitleImg}>
                    <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702573291/return_w8ycd2.svg" alt="Return" />
                </div>
                <div className={styles.containerTitleText}>
                    <h2>Historial </h2>
                </div>
            </div>
           <CardsHistorial historial={historial}></CardsHistorial>
           <NavbarLow></NavbarLow>
        </div>
    )
} 
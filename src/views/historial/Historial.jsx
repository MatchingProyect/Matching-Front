
import CardsHistorial from "../../components/cards-historial/CardsHistorial"
import styles from './historial.module.css'
import NavbarLow from '../../components/navbarLow/navbarLow';

export default function Historial(){
    const historial = [
        {
            fecha: "16/12 15:00",
            equipo: ["diego", "jose", "maria"],
            resultado:[ "4-5", "6-7", "8-9"],
            club: "club1"
        },
        {
            fecha: "13/12 18:45",
            equipo: ["Ana", "Carlos", "Juan"],
            resultado: ["2-2", "3-1", "0-2"],
            club: "club2"
        },
        {
            fecha: "14/12 18:45",
            equipo: ["Elena", "Francisco", "Gabriel"],
            resultado: ["1-0", "2-4", "3-3"],
            club: "club3"
        },
        {
            fecha: "15/12 17:15",
            equipo: ["Luis", "Isabel", "Pedro"],
            resultado: ["3-2", "1-1", "4-3"],
            club: "club4"
        },
        {
            fecha: "16/12 17:15",
            equipo: ["Marta", "Sergio", "Pablo"],
            resultado: ["2-1", "5-4", "3-3"],
            club: "club5"
        },
        {
            "fecha": "19/12 16:45",
            "equipo": ["Alejandro", "Valeria", "Gonzalo"],
            "resultado": ["1-0", "2-2", "3-1"],
            "club": "club8"
        },
        {
            "fecha": "20/12 18:30",
            "equipo": ["Sofía", "Diego", "Marina"],
            "resultado": ["3-2", "4-4", "2-1"],
            "club": "club9"
        },
        {
            "fecha": "21/12 20:15",
            "equipo": ["Hugo", "Camila", "Daniel"],
            "resultado": ["2-1", "1-3", "4-2"],
            "club": "club10"
        },
        {
            "fecha": "22/12 14:30",
            "equipo": ["Lucía", "Felipe", "Adriana"],
            "resultado": ["0-1", "2-2", "3-0"],
            "club": "club11"
        }
        
      ]

    return(
        <div className={styles.containerHistorial}>
            <div className={styles.containerTitle}>
                <div className={styles.containerTitleImg}>
                    <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702573291/return_w8ycd2.svg" alt="Return" />
                </div>
                <div className={styles.containerTitleText}>
                    <p>Historial </p>
                </div>
            </div>
           <CardsHistorial historial={historial}></CardsHistorial>
           <NavbarLow></NavbarLow>
        </div>
    )
} 
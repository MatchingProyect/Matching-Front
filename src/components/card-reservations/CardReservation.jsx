import styles from './CardReservation.module.css';
import CardsReservation from '../cards-reservations/CardsReservation';
import PropTypes from 'prop-types';

export default function CardReservation({reservations, courts}){
    return(
        <div className = {styles.reservationsContainer}>
            <h1 className = {styles.compTitle}>Reservaciones</h1>
            <div className = {styles.divCards}>
            {reservations?.map((element) => <CardsReservation reservations = {element} courts = {courts} key = {element.id}/>)}
            </div>
        </div>
    );
}

CardReservation.propTypes = {
    reservations: PropTypes.object.isRequired,
    courts: PropTypes.object.isRequired,

  };
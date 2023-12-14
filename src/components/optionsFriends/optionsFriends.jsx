
// import { Link } from 'react-router-dom';
import styles from './optionsFriends.module.css'
import PropTypes from 'prop-types';

export default function OptionsFriends({name}){


    return(
        <div className={styles.containerOptions}>
           <div className={styles.options}>
                <div className={styles.optionsImg}>
                    <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702576188/iconamoon_profile-bold_xoimai.svg" alt="Bloquear" />
                </div>
                <div className={styles.optionsDescription}>
                    <h4>Bloquear a {name}</h4>
                    <p>{name} no podrá verte ni ponerse en contacto contigo en Match. </p>
                </div>
           </div>
           <div className={styles.options}>
                <div className={styles.optionsImg}>
                    <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702576214/solar_user-block-linear_qooug4.svg" alt="Eliminar" />
                </div>
                <div className={styles.optionsDescription}>
                    <h4>Eliminar a {name}</h4>
                    <p>{name} no podrá verte ni ponerse en contacto contigo en Match. </p>
                </div>

           </div>

        </div>
    )
} 

OptionsFriends.propTypes = {

    name: PropTypes.string.isRequired, 

};
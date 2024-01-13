import styles from './profile.module.css';
import { useState } from 'react';
import StatsPerfilDepor from '../../components/statsPerfilDepor/StatsPerfilDepor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

export default function ProfileDeportivo({perfilDeportivo, sports}) {

    const  [ depProfile, setDepProfile ] = useState(perfilDeportivo);
    const stats = null;//Aca puede ir un hardcodeo
    console.log(sports);

    function handlerProfileChange (event){
        let buttonValue = event.target.value;
        let selectedProfile = perfilDeportivo.find((element) => element.sport == buttonValue);
        setDepProfile(selectedProfile);
    };

    return(
        <div className = {styles.perfilesDeportivosContainer}>
            <div className = {styles.divOne}>
        {perfilDeportivo?.map((element) => <button key = {element.SportId} onClick = {handlerProfileChange} className = {styles.sportText} value = {element.SportId}>{element.SportId}</button>)}
        </div>
        <div className = {styles.statsDiv}>
            <StatsPerfilDepor stats = {stats}/>
        </div>
        <div className = {styles.DivTwo}>
            <p className = {styles.textOne}>Mis Puntos</p>
            <div className = {styles.pointsContainer}>
            <div>
                Puntos Acumulados: 
            </div>
            <div>
                <Link to = '/canjearPuntos'>
            <button className = {styles.pointsBtn}>Canjear Puntos</button>
            </Link>
            </div>
            </div>

        </div>
        <div className = {styles.divThree}>
                <div className = {styles.divThree2}>
                    <p>Mis Preferencias</p>
                    <Link to = {`/profile/editDepor/`}>Editar</Link>
                </div>
                <div className = {styles.divThreeProfile}>
                    <div className = {styles.info}>
                        <p className = {styles.dato}>{depProfile?.laterality}</p>
                        <p className = {styles.nombreDelDato}>Lateralidad</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.dato}>{depProfile?.categoryLvl}</p>
                        <p className = {styles.nombreDelDato}>Categoria</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.dato}>{depProfile?.courtSide}</p>
                        <p className = {styles.nombreDelDato}>Posicion</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.dato}>{depProfile?.dayPreference}</p>
                        <p className = {styles.nombreDelDato}>Dia Preferido</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.dato}>{depProfile?.matchType}</p>
                        <p className = {styles.nombreDelDato}>Tipo de partida</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.dato}>{depProfile?.timePreference}</p>
                        <p className = {styles.nombreDelDato}>Hora Preferida</p>
                    </div>
                </div>
        </div>
        </div>
    )
}

// ProfileDeportivo.propTypes = {
//     userProfile: PropTypes.object.isRequired,
//   };
  
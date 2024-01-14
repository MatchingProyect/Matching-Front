import styles from './profile.module.css';
import { useEffect, useState } from 'react';
import StatsPerfilDepor from '../../components/statsPerfilDepor/StatsPerfilDepor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function ProfileDeportivo({perfilDeportivo, sports, userProfile}) {
    const  [ depProfile, setDepProfile ] = useState(perfilDeportivo[0]);
    const [valoraciones, setValoraciones] = useState();
    // const stats = null;
    console.log(perfilDeportivo, sports);
    
    function handlerProfileChange (event){
        let buttonValue = event.target.value;
        let findedProfile = perfilDeportivo.find((element) => element.SportId == buttonValue);
        setDepProfile(findedProfile);
    };
    
    function justBtnsOfProfilesBrought (id) {
        let selectedSport = sports.find((element) => element.id == id)
        return selectedSport.name;
    };
    
    useEffect(() => {
        
        const fetchValoraciones = async() => {
            try {
                const endpoint = `/valoraciones/${userProfile.id}`;
                const {data} = await axios(endpoint);
                
                if(data.status) setValoraciones(data.valoraciones);
            } catch (error) {
                throw error.message;
            }
        }
        fetchValoraciones();
    }, [userProfile])
console.log('a', valoraciones)
    return(
                <div className = {styles.perfilesDeportivosContainer}> 
                    <div className = {styles.divOne}>
        {perfilDeportivo?.map((element) => <button key = {element.SportId} onClick = {handlerProfileChange} className = {styles.sportText} value = {element.SportId}>{justBtnsOfProfilesBrought(element.SportId)}</button>)}
        </div>
        <div className = {styles.statsDiv}>
            {/* <StatsPerfilDepor stats = {stats}/> */}
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

        <div className={styles.valoracionesContainer}>
            {valoraciones?.map((reseña) => (
                <div key={reseña.id}>
                    <br />
                    <h2>Reseña:</h2>
                    <h2>"{reseña.valoracion}"</h2>
                </div>
            ))}
        </div>
                </div>
    )
}

// ProfileDeportivo.propTypes = {
//     userProfile: PropTypes.object.isRequired,
//   };
  
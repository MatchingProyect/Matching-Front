import styles from './profile.module.css';
import NavbarLow from '../../components/navbarLow/navbarLow';
import { useState, useEffect } from 'react';
import ProfileDeportivo from './ProfileDeportivo'
import MiPerfil from './MiPerfil'
import {  useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../../redux/reducer';

export default function Profile() {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user?.datauser?.user);
    const sports = useSelector((state) => state.user?.allSports);
    const [botonSeleccionado, setBotonSeleccionado] = useState('miPerfil');


    useEffect(() => {

        dispatch(fetchProfile(userProfile?.id));
    }, []);

    const perfilDeportivo = useSelector((state) => state.user?.allProfiles);
    const [ profileOrSportProfile, setProfile ] = useState(true);
    function miperfilHandler(){
        setProfile(true)
        setBotonSeleccionado('miPerfil');

    }
    function perfilesdeportivosHandler(){
        setProfile(false)
        setBotonSeleccionado('perfilesDeportivos');

    }



  

    return(
        <div className = {styles.completeComponent}>
             <div className={styles.divButtons}>
                <div className={styles.divButtons1}>
                <button
                    className={styles.miPerfilBtn}
                    onClick={miperfilHandler}
                >
                    Mi Perfil
                </button>
                {botonSeleccionado === 'miPerfil' && <div className={styles.bloqueAmarillo}></div>}
                </div>
                <div className={styles.divButtons1}>
                <button
                    className={styles.perfilDeportivoBtn}
                    onClick={perfilesdeportivosHandler}
                >
                    Perfiles Deportivos
                </button>
                {botonSeleccionado === 'perfilesDeportivos' && <div className={styles.bloqueAmarillo}></div>}
                </div>
            </div>

        {profileOrSportProfile? <MiPerfil user = {userProfile}/> : <ProfileDeportivo perfilDeportivo = {perfilDeportivo} sports = {sports} userProfile={userProfile} />}
        <NavbarLow></NavbarLow>
        </div>

    );
}
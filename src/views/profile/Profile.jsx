import styles from './profile.module.css';
import NavbarLow from '../../components/navbarLow/navbarLow';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileDeportivo from './ProfileDeportivo'
import MiPerfil from './MiPerfil'

export default function Profile() {
    const userProfile = useSelector((state) => state.user.user.user);
    const [ profileOrSportProfile, setProfile ] = useState(true);

    function miperfilHandler(){
        setProfile(true)
    }
    function perfilesdeportivosHandler(){
        setProfile(false)
    }

//Componente final
    return(
        <div className = {styles.completeComponent}>
            <div className = {styles.divButtons}>
            <div className = {styles.divButtons1}>
                <button className = {styles.miPerfilBtn} onClick = {miperfilHandler}>Mi Perfil</button>
                
            </div>
            <div className = {styles.divButtons2}>
                <button className = {styles.perfilDeportivoBtn} onClick = {perfilesdeportivosHandler}>Perfiles Deportivos</button>
            </div>
            </div>

        {profileOrSportProfile? <MiPerfil user = {userProfile}/> : <ProfileDeportivo userProfile = {userProfile}/>}
        <NavbarLow></NavbarLow>
        </div>

    );
}
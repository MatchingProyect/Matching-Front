import styles from './profile.module.css';
import NavbarLow from '../../components/navbarLow/navbarLow';
import { useState } from 'react';
import ProfileDeportivo from './ProfileDeportivo'
import MiPerfil from './MiPerfil'
import {  useSelector } from 'react-redux';

export default function Profile() {
    const userProfile = useSelector((state) => state.user?.datauser?.user);
    const [ profileOrSportProfile, setProfile ] = useState(true);

    console.log(userProfile)
    function miperfilHandler(){
        setProfile(true)
    }
    function perfilesdeportivosHandler(){
        setProfile(false)
    }



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
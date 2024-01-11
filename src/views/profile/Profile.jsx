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
    useEffect(() => {
        dispatch(fetchProfile(userProfile?.id));
    }, []);

    const perfilDeportivo = useSelector((state) => state.user?.datauser?.profile);    
    const [ profileOrSportProfile, setProfile ] = useState(true);
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

        {profileOrSportProfile? <MiPerfil user = {userProfile}/> : <ProfileDeportivo perfilDeportivo = {perfilDeportivo}/>}
        <NavbarLow></NavbarLow>
        </div>

    );
}
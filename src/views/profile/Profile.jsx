import styles from './profile.module.css';
import NavbarLow from '../../components/navbarLow/navbarLow';
import { useState } from 'react';
import ProfileDeportivo from './ProfileDeportivo'
import MiPerfil from './MiPerfil'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDataUser } from '../../redux/reducer';
export default function Profile() {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user?.datauser?.user);
    const [ profileOrSportProfile, setProfile ] = useState(true);

    console.log(userProfile)
    function miperfilHandler(){
        setProfile(true)
    }
    function perfilesdeportivosHandler(){
        setProfile(false)
    }

    useEffect(() => {
        console.log("PROFILEEEEEEEEEEEE")
        const storedUserData = localStorage.getItem('userData');
        const userDataObject = JSON.parse(storedUserData);
        console.log("userDataObject", userDataObject)
        dispatch(setDataUser({
            user: userDataObject
        }));

    }, []);

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
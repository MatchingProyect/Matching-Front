import React from 'react';
import styles from './Profile.module.css';
import FriendsContainer from '../../components/friendsContainer/FriendsContainer';
import NavbarLow from '../../components/navbarLow/navbarLow';
import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function Profile(props) {
    //Info hardcodeada que traeria llamada al back por el user logueado;
    const user = {
        name: 'Leonardo',
        lastname: 'Risco',
        gender: 'Masculino',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem accusamus iure asperiores? Ea magni, expedita nam placeat minima dolorem ab blanditiis.',
        dayBirth: '27/01/1999',
        email: '123321@gmail.com',
        phone:'+69 69696969',
        avatarImg: 'https://es.dblegends.net/assets/card_icons/BChaIco_0468_GokuSSGSSKAIOU_468.webp',
    };
    //Estado para cambiar entre Mi Perfil y Perfiles Deportivos
    const [ profileOrSportProfile, setProfile ] = useState(true);



    function MiPerfil(props){
        const { user } = props;
        return(
            <div className = {styles.divProfile}>
            <div className = {styles.divOneProfile}>
                <img src = {user.avatarImg} alt = {user.name} className = {styles.profileImg}/>
                <h1 className = {styles.name}>{user.name}</h1>
                <h3 className = {styles.description}>{user.description}</h3>
            </div>
            <div className = {styles.divTwoProfile}>
                <FriendsContainer />
            </div>
            <div className = {styles.divThreeProfile}>
                <Link to = "/profile/edit">Editar</Link>
                <div className = {styles.info}>
                    <p className = {styles.dato}>{user.name + ' ' + user.lastname}</p>
                    <p className = {styles.nombreDelDato}>Nombre y Apellido</p>
                </div>
                <div className = {styles.info}>
                    <p className = {styles.dato}>{user.gender}</p>
                    <p className = {styles.nombreDelDato}>Genero</p>
                </div>
                <div className = {styles.info}>
                    <p className = {styles.dato}>{user.dayBirth}</p>
                    <p className = {styles.nombreDelDato}>Fecha de Nacimiento</p>
                </div>
                <div className = {styles.info}>
                    <p className = {styles.dato}>{user.email}</p>
                    <p className = {styles.nombreDelDato}>Correo Electronico</p>
                </div>
                <div className = {styles.info}>
                    <p className = {styles.dato}>{user.phone}</p>
                    <p className = {styles.nombreDelDato}>Numero</p>
                </div>
            </div>
        </div>
        )
    };

    function PerfilesDeportivos(props){
        const { user } = props;
        return(
            <div>
            <h1>Perfiles Deportivos</h1>
            <h3>{user.name}</h3>
            </div>
        );
    };

    function miperfilHandler(){
        setProfile(true)
    };
    function perfilesdeportivosHandler(){
        setProfile(false)
    };

    



    return(
        <div className = {styles.completeComponent}>
            <div className = {styles.divButtons}>
                <button onClick = {miperfilHandler}>Mi Perfil</button>
                <button onClick = {perfilesdeportivosHandler}>Perfiles Deportivos</button>

            </div>
        {profileOrSportProfile? <MiPerfil user = {user}/> : <PerfilesDeportivos user = {user}/>}
        <NavbarLow />
        </div>

    )
}
import React from 'react';
import styles from './profile.module.css';
import FriendsContainer from '../../components/friendsContainer/friendsContainer';
import { Link } from 'react-router-dom'

export default function Profile(props) {
    //Info de tabla User
    const { name, lastname, gender, description, avatarImg, dayBirth, email, phone  } = props;
    //Info de tabla Profile
    const { laterality, courtSide, matchType, dayPreference, } = props;

    return(
        <div className = {styles.divProfile}>
            <div className = {styles.divOneProfile}>
                <img src = {avatarImg} alt = {name}/>
                <h1>{name}</h1>
                <h3>{description}</h3>
            </div>
            <div className = {styles.divTwoProfile}>
                <FriendsContainer />
            </div>
            <div className = {styles.divThreeProfile}>
                <Link to = "/profile/edit">Editar</Link>
                <div className = {styles.info}>
                    <p>{name + ' ' + lastname}</p>
                    <p>Nombre y Apellido</p>
                </div>
                <div className = {styles.info}>
                    <p>{gender}</p>
                    <p>Genero</p>
                </div>
                <div className = {styles.info}>
                    <p>{dayBirth}</p>
                    <p>Fecha de Nacimiento</p>
                </div>
                <div className = {styles.info}>
                    <p>{email}</p>
                    <p>Correo Electronico</p>
                </div>
                <div className = {styles.info}>
                    <p>{phone}</p>
                    <p>Numero</p>
                </div>
            </div>
        </div>
    )
}
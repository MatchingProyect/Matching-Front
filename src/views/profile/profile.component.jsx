import React from 'react';
import styles from './profile.module.css';
// import FriendsContainer from '../../components/friendsContainer/FriendsContainer';
import { Link } from 'react-router-dom'
// import { Typography } from '@mui/material';

export default function Profile(props) {

    //Info que traeria llamada al back por el user logueado
    const user = {
        name: 'Leonardo',
        lastname: 'Risco',
        gender: 'Masculino',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem accusamus iure asperiores? Ea magni, expedita nam placeat minima dolorem ab blanditiis.',
        dayBirth: '27/01/1999',
        email: '123321@gmail.com',
        phone:'+69 69696969',
        avatarImg: 'https://depor.com/resizer/25quKBxP8Ti7cjCcmnR887FHER0=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/DAYT2F5NUNB7VPAFKUPHNDXVQA.jpg',
    };

    return(
        <div className = {styles.divProfile}>
            <div className = {styles.divOneProfile}>
                <img src = {user.avatarImg} alt = {user.name}/>
                <h1>{user.name}</h1>
                <h3>{user.description}</h3>
            </div>
            <div className = {styles.divTwoProfile}>
                {/* <FriendsContainer /> */}
            </div>
            <div className = {styles.divThreeProfile}>
                <Link to = "/profile/edit">Editar</Link>
                <div className = {styles.info}>
                    <p>{user.name + ' ' + user.lastname}</p>
                    <p>Nombre y Apellido</p>
                </div>
                <div className = {styles.info}>
                    <p>{user.gender}</p>
                    <p>Genero</p>
                </div>
                <div className = {styles.info}>
                    <p>{user.dayBirth}</p>
                    <p>Fecha de Nacimiento</p>
                </div>
                <div className = {styles.info}>
                    <p>{user.email}</p>
                    <p>Correo Electronico</p>
                </div>
                <div className = {styles.info}>
                    <p>{user.phone}</p>
                    <p>Numero</p>
                </div>
            </div>
        </div>
    )
}
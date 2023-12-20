import React from 'react';
import styles from './profile.module.css';
import FriendsContainer from '../../components/friendsContainer/FriendsContainer';
import NavbarLow from '../../components/navbarLow/navbarLow';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import StatsPerfilDepor from '../../components/statsPerfilDepor/StatsPerfilDepor';

export default function Profile(props) {
    //Info hardcodeada que traeria llamada al back por el user logueado;
    const user = {
        id: 123,
        name: 'Leonardo',
        lastname: 'Risco',
        gender: 'Masculino',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem accusamus iure asperiores? Ea magni, expedita nam placeat minima dolorem ab blanditiis.',
        dayBirth: '27/01/1999',
        email: '123321@gmail.com',
        phone:'+123456789',
        avatarImg: 'https://i.scdn.co/image/ab6761610000e5eb275c91cb36d4206bc657c07c',
        points: 489,
        friends: [
            {
                image: 'https://yt3.googleusercontent.com/dL1jj3OLGsO5K_Y9kr49l_7J-4vAyFZOD4B4LXTI4ZoFJ2893arCH7JXfbY6JxmiIytgCWEZ2zc=s900-c-k-c0x00ffffff-no-rj',
                isAvailable: true
            },
            {
                image: 'https://facts.net/wp-content/uploads/2023/09/22-facts-about-kyle-broflovski-south-park-1694601417.jpg',
                isAvailable: false
            },
            {
                image: 'https://pbs.twimg.com/profile_images/858013258870964224/Otio6D4P_400x400.jpg',
                isAvailable: true
            },
            {
                image: 'https://tvmedia.ign.com/tv/image/article/107/1076864/80-gogodgo_1268346866.jpg?fit=bounds&width=1280&height=720',
                isAvailable: true
            }
        ],
        perfilesDeportivos:[
            {
                sport: 'Padel',
                laterality: 'Ambidiestro',
                courtSide: 'Puntero Izquierdo',
                matchType: 'Competitivo',
                dayPreference: 'Lunes - Miercoles',
                timePreference: '7:00 pm - 11:00 pm',
                categorylvl: 'Rango 4',
                historial: {
                    jugadas: 15,
                    ganadas: 10,
                    perdidas: 5,
                    organizadas: 4,
                    asistencias: 14,
                    canceladas:1
                }
            },
            {
                sport: 'Soccer',
                laterality: 'Diestro',
                courtSide: 'Puntero Izquierdo',
                matchType: 'Competitivo',
                dayPreference: 'Lunes - Viernes',
                timePreference: '6:00 pm - 12:00 pm',
                categorylvl: 'Rango 7',
                historial: {
                    jugadas: 20,
                    ganadas: 10,
                    perdidas: 10,
                    organizadas: 3,
                    asistencias: 15,
                    canceladas:2
                }
            },
            {
                sport: 'League of Legends',
                laterality: 'Diestro',
                courtSide: 'ADC, MID',
                matchType: 'Competitivo',
                dayPreference: 'Lunes - Domingo',
                timePreference: 'Todo el dia',
                categorylvl: 'Challenger 789 PL',
                historial: {
                    jugadas: 40,
                    ganadas: 28,
                    perdidas: 12,
                    organizadas: 20,
                    asistencias: 15,
                    canceladas:5
                }
            },
        ],
    };
    //Estado para cambiar entre Mi Perfil y Perfiles Deportivos
    const [ profileOrSportProfile, setProfile ] = useState(true);

    //Componente Mi Perfil
    function MiPerfil(props){
        const { user } = props;
        return(
            <div className = {styles.divProfile}>
            <div className = {styles.divOneProfile}>
                <img src = {user.avatarImg} alt = {user.name} className = {styles.profileImg}/>
                <h1 className = {styles.name}>{user.name} {user.lastname}</h1>
                <h3 className = {styles.description}>{user.description}</h3>
            </div>
            <div className = {styles.divTwoProfile}>
                <FriendsContainer friends = {user.friends} />
            </div>
            <div className = {styles.divThreeProfile}>
                <Link to = {`/profile/edit/${user.id}`}><p>Editar</p></Link>
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

    //Componente Perfiles Deportivos
    function PerfilesDeportivos(props){
        const { user } = props;
        const firstProfile = user.perfilesDeportivos[0];
        const toRender = user.perfilesDeportivos;
        const  [ depProfile, setDepProfile ] = useState(firstProfile);
        const stats = depProfile.historial;

    function handlerProfileChange (event){
        let buttonValue = event.target.value;
        let selectedProfile = toRender.find((element) => element.sport == buttonValue);
        setDepProfile(selectedProfile);
    }

        return(
            <div className = {styles.perfilesDeportivosContainer}>
                <div className = {styles.divOne}>
            {toRender.map((element) => <button key = {element.sport} onClick = {handlerProfileChange} className = {styles.sportText} value = {element.sport}>{element.sport}</button>)}
            </div>
            <div className = {styles.statsDiv}>
                <StatsPerfilDepor stats = {stats}/>
            </div>
            <div className = {styles.DivTwo}>
                <p className = {styles.textOne}>Mis Puntos</p>
                <div className = {styles.pointsContainer}>
                <div>
                    Puntos Acumulados: {user.points}
                </div>
                <div>
                    <Link to = 'canjearPuntos'>
                <button className = {styles.pointsBtn}>Canjear Puntos</button>
                </Link>
                </div>
                </div>

            </div>
            <div className = {styles.divThree}>
                    <div className = {styles.divThree2}>
                        <p>Mis Preferencias</p>
                        <Link to = {`/profile/editDepor/${user.id}`}>Editar</Link>
                    </div>
                    <div className = {styles.divThreeProfile}>
                        <div className = {styles.info}>
                            <p className = {styles.dato}>{depProfile.laterality}</p>
                            <p className = {styles.nombreDelDato}>Lateralidad</p>
                        </div>
                        <div className = {styles.info}>
                            <p className = {styles.dato}>{depProfile.categorylvl}</p>
                            <p className = {styles.nombreDelDato}>Categoria</p>
                        </div>
                        <div className = {styles.info}>
                            <p className = {styles.dato}>{depProfile.courtSide}</p>
                            <p className = {styles.nombreDelDato}>Posicion</p>
                        </div>
                        <div className = {styles.info}>
                            <p className = {styles.dato}>{depProfile.dayPreference}</p>
                            <p className = {styles.nombreDelDato}>Dia Preferido</p>
                        </div>
                        <div className = {styles.info}>
                            <p className = {styles.dato}>{depProfile.matchType}</p>
                            <p className = {styles.nombreDelDato}>Tipo de partida</p>
                        </div>
                        <div className = {styles.info}>
                            <p className = {styles.dato}>{depProfile.timePreference}</p>
                            <p className = {styles.nombreDelDato}>Hora Preferida</p>
                        </div>
                    </div>
            </div>
            </div>
        )
    };

    //Funciones para cambiar entre Mi Perfil y Perfil Deportivo
    function miperfilHandler(){
        setProfile(true)
    };
    function perfilesdeportivosHandler(){
        setProfile(false)
    };

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

        {profileOrSportProfile? <MiPerfil user = {user}/> : <PerfilesDeportivos user = {user}/>}
        <NavbarLow></NavbarLow>
        </div>

    );
};
// import React from 'react';
import styles from './home.module.css';
import CardUser from '../cardUsers/CardUser';
import CardSport from '../cardSports/CardSport';
import CardClub from '../cardClubs/CardClub';
import SearchBar from '../searchBar/SearchBar';
import CardCourt from '../cardCourt/CardCourt';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarLow from '../../components/navbarLow/navbarLow';

export default function Home() {
    const users = [
        {
            name: "John Smith",
            description: "Apasionado por el deporte en Argentina, disfruta del pádel y el fútbol.",
            pais: "Argentina",
            deportes: ["padel", "futbol"]
        },
        {
            name: "Maria García",
            description: "Fanática del baloncesto en España, practica baloncesto y atletismo con gran entusiasmo.",
            pais: "España",
            deportes: ["baloncesto", "atletismo"]
        },
        {
            name: "Carlos Rodríguez",
            description: "Amante del tenis en México, su pasión incluye el tenis y la natación.",
            pais: "México",
            deportes: ["tenis", "natación"]
        },
        {
            name: "Laura Pérez",
            description: "Entusiasta del ciclismo en Colombia, encuentra alegría en el ciclismo y el yoga.",
            pais: "Colombia",
            deportes: ["ciclismo", "yoga"]
        },
        {
            name: "Elena Torres",
            description: "Aficionada al surf en España, disfruta de las olas y practica yoga para mantenerse en forma.",
            pais: "España",
            deportes: ["surf", "yoga"]
        },
        {
            name: "Ricardo Navarro",
            description: "Entrenador de fútbol en Argentina, apasionado por desarrollar habilidades en jóvenes futbolistas.",
            pais: "Argentina",
            deportes: ["fútbol", "entrenamiento"]
        },
        {
            name: "Isabel Jiménez",
            description: "Amante del senderismo en México, encuentra paz y aventura explorando la naturaleza.",
            pais: "México",
            deportes: ["senderismo", "camping"]
        },
        {
            name: "Diego Herrera",
            description: "Entusiasta del fitness en Colombia, combina entrenamientos intensos con una dieta equilibrada.",
            pais: "Colombia",
            deportes: ["fitness", "nutrición"]
        }
    ];
    const ciudades = ['La Paz', 'Santiago de Chile', 'Rio de Janeiro', 'Buenos Aires', 'Cordova', 'Lima', 'Trujillo', 'Bogota', 'Cali'];

    const sports = [
        {
            name: "Padel",
            clubs: ["club1", "club2", "club3", "club4"]
        },
        {
            name: "Fútbol",
            clubs: ["Club A", "Club B", "Club C", "Club D"]
        },
        {
            name: "Baloncesto",
            clubs: ["Club X", "Club Y", "Club Z"]
        },
        {
            name: "Tenis",
            clubs: ["Club 1", "Club 2", "Club 3"]
        },
        {
            name: "Ciclismo",
            clubs: ["Club Cyclist", "Bike Club", "Pedal Power"]
        }

    ];

    const clubs = [
        {
            name: "Marriot Tennis",
            sport: ['Tenis'],
        },
        {
            name: "The Courtyard",
            sport: ['Fútbol', 'Baloncesto'],
        },
        {
            name: "Country Club",
            sport: ['Baloncesto'],
        },
        {
            name: "Regis Club",
            sport: ['Padel'],
        },
        {
            name: "Big Smoke Club",
            sport: ['Tenis'],
        }

    ];

    const [selectedOption, setSelectedOption] = useState('users');

    const handleButtonClick = (option) => {
        setSelectedOption(option);
    };


    return (
        <div className={styles.containerHome}>
            <div className={styles.header}>
                <h1 className={styles.title}>matching</h1>
                <Link to='/profile'><div className={styles.icon}>
                    <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1704001242/iconjpeg_icix8f.jpg" alt="icono" className={styles.imgIcon} />
                </div></Link>
            </div>
            <div className={styles.homeComponent}>
                <div className={styles.buscarReserva}>
                    <h1 className = {styles.compTitle}>Encuentra una partida</h1>
                    <div className = {styles.filters}>
                        <div className = {styles.filter}>
                        <label>Ciudad</label>
                            <select>
                                <option disabled></option>
                                {ciudades?.map((ciudad) => <option value={ciudad}>{ciudad}</option>)}
                            </select>
                        </div>
                        <div className = {styles.filter}>
                            <label>Deporte</label>
                            <select>
                            <option disabled></option>
                                {sports?.map((deporte) => <option value={deporte.name}>{deporte.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <button className = {styles.buscarBtn}>Buscar</button>
                </div>
                <div className={styles.newReserva}>
                    <button className = {styles.btnNuevaReserva}>Nueva Reserva</button>
                </div>

            </div>
            <div className={styles.containerTitle}>
                <button onClick={() => handleButtonClick('users')} className={styles.NavBtn}>Users</button>
                <button onClick={() => handleButtonClick('sports')} className={styles.NavBtn}>Sports</button>
                <button onClick={() => handleButtonClick('clubs')} className={styles.NavBtn}>Clubs</button>
            </div>
            <div >
                {selectedOption === 'users' && (
                    <div className={styles.containerCards}>
                        {users?.map((user) => (
                            <CardUser key={user.name} user={user} />
                        ))}
                    </div>
                )}

                {selectedOption === 'sports' && (
                    <div>
                        {sports?.map((sport) => (
                            <CardSport key={sport.name} sport={sport} />
                        ))}
                    </div>
                )}
                {selectedOption === 'clubs' && (<div>
                    {clubs?.map((club) => {
                        return (
                            <CardClub club={club} />
                        )
                    })}
                </div>)}
            </div>
            <NavbarLow />
        </div>
    );
};
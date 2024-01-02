// import React from 'react';
import styles from './home.module.css';
import CardUser from '../cardUsers/CardUser';
import CardSport from '../cardSports/CardSport';
import CardClub from '../cardClubs/CardClub';
import SearchBar from '../searchBar/SearchBar';
import CardCourt from '../cardCourt/CardCourt';
import CardReservation from '../../components/card-reservations/CardReservation';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarLow from '../../components/navbarLow/navbarLow';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchClubs, fetchLocations, fetchUsers } from '../../redux/reducer';
import Solicitudes from '../solucitudes/Solicitudes';

export default function Home({ users, sports, clubs, courts, reservations }) {
    const [selectedOption, setSelectedOption] = useState('users');
    const [selectedSection, setSelectedSection] = useState('users');
    const [actualPageUsers, setActualPageUsers] = useState(1);
    const [actualPageCourts, setActualPageCourts] = useState(1);
    const [actualPageClubs, setActualPageClubs] = useState(1);
    const [solicitudes, setSolicitudes] = useState(false);
    const [reservToRender, setReservToRender] = useState(reservations);

    const dispatch = useDispatch();

    // const courts = [
    //     {
    //         name: 'Cancha 1',
    //         club: 'Palmeras',
    //         description: 'Cancha para futbol 7.',
    //         sport: 'Fútbol',
    //         priceFee: 50,
    //         warrantyReservation: 'Card',
    //         grassType: 'Grass Alto',
    //         lighting: 'Luz Fuerte',
    //         doorsType: 'Reja de metal',
    //         wallsType: 'Malla',
    //         reputation: 'Excelente',
    //     },
    //     {
    //         name: 'Cancha 2',
    //         club: 'Palmeras',
    //         sport: 'Fútbol',
    //         description: 'Cancha para futbol 6.',
    //         priceFee: 50,
    //         warrantyReservation: 'Card',
    //         grassType: 'Grass Alto',
    //         lighting: 'Luz Fuerte',
    //         doorsType: 'Reja de metal',
    //         wallsType: 'Malla',
    //         reputation: 'Buena',
    //     },
    //     {
    //         name: 'Cancha 3',
    //         club: 'Palmeras',
    //         description: 'Cancha para futbol 5',
    //         sport: 'Fútbol',
    //         priceFee: 50,
    //         warrantyReservation: 'Card',
    //         grassType: 'Grass Alto',
    //         lighting: 'Luz Fuerte',
    //         doorsType: 'Reja de metal',
    //         wallsType: 'Malla',
    //         reputation: 'Regular',
    //     },
    //     {
    //         name: 'Tennis Yard 1',
    //         club: 'Marriot Tennis',
    //         description: 'Campo profesional de tennis.',
    //         sport: 'Tenis',
    //         priceFee: 50,
    //         warrantyReservation: 'Card',
    //         grassType: 'No Grass',
    //         lighting: 'Luz Fuerte',
    //         doorsType: 'Reja de metal',
    //         wallsType: 'Concreto',
    //         reputation: 'Excelente',
    //     },
    //     {
    //         name: 'Tennis Yard 2',
    //         club: 'Marriot Tennis',
    //         description: 'Campo amateur de tennis.',
    //         sport: 'Tenis',
    //         priceFee: 30,
    //         warrantyReservation: 'Card',
    //         grassType: 'No Grass',
    //         lighting: 'Luz Fuerte',
    //         doorsType: 'Reja de metal',
    //         wallsType: 'Malla',
    //         reputation: 'Excelente',
    //     },
    //     {
    //         name: 'Futbol Court',
    //         club: "The Courtyard",
    //         description: 'Campo amateur de futbol.',
    //         sport: 'Fútbol',
    //         priceFee: 40,
    //         warrantyReservation: 'Card',
    //         grassType: 'Loza',
    //         lighting: 'Luz Media',
    //         doorsType: 'Entrada directa.',
    //         wallsType: 'Puertas de concreto.',
    //         reputation: 'Mala',
    //     },
    //     {
    //         name: 'Basket Court',
    //         club: "The Courtyard",
    //         sport: 'Baloncesto',
    //         description: 'Campo amateur de basket.',
    //         priceFee: 35,
    //         warrantyReservation: 'Card',
    //         grassType: 'Loza',
    //         lighting: 'Luz Alta',
    //         doorsType: 'Entrada directa.',
    //         wallsType: 'Puertas de concreto.',
    //         reputation: 'Media',
    //     },
    //     {
    //         name: 'Basket Field 1',
    //         club: "Country Club",
    //         description: 'Campo profesional de basket.',
    //         sport: 'Baloncesto',
    //         priceFee: 75,
    //         warrantyReservation: 'Card',
    //         grassType: 'Parquet',
    //         lighting: 'Luz Alta',
    //         doorsType: 'Entrada directa.',
    //         wallsType: 'Puertas de concreto.',
    //         reputation: 'Excelente',
    //     },
    //     {
    //         name: 'Basket Field 2',
    //         club: "Country Club",
    //         description: 'Campo profesional de basket.',
    //         sport: 'Baloncesto',
    //         priceFee: 75,
    //         warrantyReservation: 'Card',
    //         grassType: 'Parquet',
    //         lighting: 'Luz Alta',
    //         doorsType: 'Entrada directa.',
    //         wallsType: 'Puertas de concreto.',
    //         reputation: 'Excelente',
    //     },

    //     {
    //         name: 'Padel Field 1',
    //         club: "Regis Club",
    //         description: 'Campo profesional de padel.',
    //         sport: 'Padel',
    //         priceFee: 80,
    //         warrantyReservation: 'Card',
    //         grassType: 'Parquet',
    //         lighting: 'Luz Alta',
    //         doorsType: 'Entrada indirecta.',
    //         wallsType: 'Puertas de madera.',
    //         reputation: 'Excelente',
    //     },
    //     {
    //         name: 'Padel Field 2',
    //         club: "Regis Club",
    //         description: 'Campo amateur de padel.',
    //         sport: 'Padel',
    //         priceFee: 60,
    //         warrantyReservation: 'Card',
    //         grassType: 'Parquet',
    //         lighting: 'Luz Alta',
    //         doorsType: 'Entrada indirecta.',
    //         wallsType: 'Puertas de madera.',
    //         reputation: 'Excelente',
    //     },
    //     {
    //         name: 'Padel Field 3',
    //         club: "Regis Club",
    //         description: 'Campo profesional de padel.',
    //         sport: 'Padel',
    //         priceFee: 80,
    //         warrantyReservation: 'Card',
    //         grassType: 'Parquet',
    //         lighting: 'Luz media',
    //         doorsType: 'Entrada indirecta.',
    //         wallsType: 'Puertas de madera.',
    //         reputation: 'Excelente',
    //     },



    // ]

    // const reservations = [
    //     {
    //         id: "0001",
    //         dateTimeStart: ["30/12/2023", "18:00:00"],
    //         dateTimeEnd: ["30/12/2023", "19:00:00"],
    //         totalCost: 40,
    //         sport: 'Fútbol',
    //         ciudad: 'La Paz',
    //         club: 'The Courtyard',
    //         court: 'Futbol Court',

    //     },
    //     {
    //         id: "0002",
    //         dateTimeStart: ["31/12/2023", "14:00:00"],
    //         dateTimeEnd: ["31/12/2023", "15:00:00"],
    //         totalCost: 40,
    //         ciudad: 'Santiago de Chile',
    //         club: 'Marriot Tennis',
    //         court: 'Tennis Yard 2',
    //     },
    //     {
    //         id: "0003",
    //         dateTimeStart: ["31/12/2023", "16:00:00"],
    //         dateTimeEnd: ["31/12/2023", "17:00:00"],
    //         totalCost: 75,
    //         ciudad: 'Buenos Aires',
    //         club: 'Country Club',
    //         court: 'Basket Field 1',
    //     },
    //     {
    //         id: "0004",
    //         dateTimeStart: ["31/12/2023", "17:00:00"],
    //         dateTimeEnd: ["31/12/2023", "18:00:00"],
    //         totalCost: 80,
    //         ciudad: 'Lima',
    //         club: 'Regis Club',
    //         court: 'Padel Field 1',
    //     },
    // ]



    // const users = [
    //     {
    //         name: "John Smith",
    //         description: "Apasionado por el deporte en Argentina, disfruta del pádel y el fútbol.",
    //         pais: "Argentina",
    //         deportes: ["padel", "futbol"]
    //     },
    //     {
    //         name: "Maria García",
    //         description: "Fanática del baloncesto en España, practica baloncesto y atletismo con gran entusiasmo.",
    //         pais: "España",
    //         deportes: ["baloncesto", "atletismo"]
    //     },
    //     {
    //         name: "Carlos Rodríguez",
    //         description: "Amante del tenis en México, su pasión incluye el tenis y la natación.",
    //         pais: "México",
    //         deportes: ["tenis", "natación"]
    //     },
    //     {
    //         name: "Laura Pérez",
    //         description: "Entusiasta del ciclismo en Colombia, encuentra alegría en el ciclismo y el yoga.",
    //         pais: "Colombia",
    //         deportes: ["ciclismo", "yoga"]
    //     },
    //     {
    //         name: "Elena Torres",
    //         description: "Aficionada al surf en España, disfruta de las olas y practica yoga para mantenerse en forma.",
    //         pais: "España",
    //         deportes: ["surf", "yoga"]
    //     },
    //     {
    //         name: "Ricardo Navarro",
    //         description: "Entrenador de fútbol en Argentina, apasionado por desarrollar habilidades en jóvenes futbolistas.",
    //         pais: "Argentina",
    //         deportes: ["fútbol", "entrenamiento"]
    //     },
    //     {
    //         name: "Isabel Jiménez",
    //         description: "Amante del senderismo en México, encuentra paz y aventura explorando la naturaleza.",
    //         pais: "México",
    //         deportes: ["senderismo", "camping"]
    //     },
    //     {
    //         name: "Diego Herrera",
    //         description: "Entusiasta del fitness en Colombia, combina entrenamientos intensos con una dieta equilibrada.",
    //         pais: "Colombia",
    //         deportes: ["fitness", "nutrición"]
    //     }
    // ];
    const ciudades = ['La Paz', 'Santiago de Chile', 'Rio de Janeiro', 'Buenos Aires', 'Lima', 'Trujillo'];

    // const sports = [
    //     {
    //         name: "Padel",
    //         clubs: ["club1", "club2", "club3", "club4"]
    //     },
    //     {
    //         name: "Fútbol",
    //         clubs: ["Club A", "Club B", "Club C", "Club D"]
    //     },
    //     {
    //         name: "Baloncesto",
    //         clubs: ["Club X", "Club Y", "Club Z"]
    //     },
    //     {
    //         name: "Tenis",
    //         clubs: ["Club 1", "Club 2", "Club 3"]
    //     },
    //     {
    //         name: "Ciclismo",
    //         clubs: ["Club Cyclist", "Bike Club", "Pedal Power"]
    //     }

    // ];

    // const clubs = [
    //     {
    //         name: "Marriot Tennis",
    //         ciudad: 'Santiago de Chile',
    //         sport: ['Tenis'],
    //     },
    //     {
    //         name: "The Courtyard",
    //         ciudad: 'La Paz',
    //         sport: ['Fútbol', 'Baloncesto'],
    //     },
    //     {
    //         name: "Palmeras",
    //         ciudad: 'Rio de Janeiro',
    //         sport: ['Fútbol'],
    //     },
    //     {
    //         name: "Country Club",
    //         ciudad: 'Buenos Aires',
    //         sport: ['Baloncesto'],
    //     },
    //     {
    //         name: "Regis Club",
    //         ciudad: 'Lima',
    //         sport: ['Padel'],
    //     },
    //     {
    //         name: "Big Smoke Club",
    //         ciudad: 'Trujillo',
    //         sport: ['Tenis'],
    //     }

    // ];

    const handlePaginateUsers = (newPage) => {
        if (newPage > 0) setActualPageUsers(newPage);
    }

    // const handlePaginateCourts = (newPage) => {
    //     if (newPage > 0) setActualPageUsers(newPage);
    // }

    const handlePaginateClubs = (newPage) => {
        if (newPage > 0) setActualPageClubs(newPage);
    }

    const handleButtonClick = (option) => {
        setSelectedOption(option);
        setSelectedSection(option);
    };
    const handleFilterCiudad = (event) => {
        let value = event.target.value;
        let result = reservations.filter((element) => element.ciudad == value);
        setReservToRender(result);
    }

    return (
        <div className={styles.containerHome}>
            <div className={styles.header}>
                <h1 className={styles.title}>matching</h1>
                <Link to='/profile'><div className={styles.icon}>
                    <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1704001242/iconjpeg_icix8f.jpg" alt="icono" className={styles.imgIcon} />
                </div></Link>
                <button onClick={() => {
                    setSolicitudes(true)
                }} >solicitudes</button>
                <Solicitudes solicitudes={solicitudes} setSolicitudes={setSolicitudes} />
            </div>
            <div className={styles.homeComponent}>
                <div className={styles.buscarReserva}>
                    <h1 className = {styles.compTitle}>Encuentra una partida</h1>
                    <div className = {styles.filters}>
                        <div className = {styles.filter}>
                        <label>Ciudad</label>
                            <select onChange = {handleFilterCiudad}>
                                <option disabled></option>
                                {ciudades?.map((ciudad) => <option value={ciudad}>{ciudad}</option>)}
                            </select>
                        </div>
                        <div className={styles.filter}>
                            <label>Deporte</label>
                            <select>
                                <option disabled></option>
                                {sports?.map((deporte) => <option value={deporte.name}>{deporte.name}</option>)}
                            </select>
                        </div>
                        <div className={styles.filter}>
                            <label>Clubs</label>
                            <select>
                                <option disabled></option>
                                {clubs?.map((club) => <option value={club.name}>{club.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <SearchBar users={users} />
                </div>
                <div className={styles.newReserva}>
                    <button className={styles.btnNuevaReserva}>Nueva Reserva</button>
                </div>

            </div>
            <div className = {styles.reservationsContainer}>
                <CardReservation reservations = {reservToRender}/>
            </div>
            <div className={styles.containerTitle}>
                <button onClick={() => handleButtonClick('users')} className={styles.NavBtn}>Users</button>
                <button onClick={() => handleButtonClick('sports')} className={styles.NavBtn}>Sports</button>
                <button onClick={() => handleButtonClick('clubs')} className={styles.NavBtn}>Clubs</button>
                <button onClick={() => handleButtonClick('courts')} className={styles.NavBtn}>Clubs</button>
            </div>
            <div >
                {selectedOption === 'users' && (
                    <div>
                        <div className={styles.containerCards}>
                            {users?.map((user) => (
                                <CardUser key={user.name} user={user} />
                            ))}
                        </div>
                        <div className={styles.buttonUsers}>
                            <button onClick={() => handlePaginateUsers(actualPageUsers - 1)} disabled={actualPageUsers === 1}>Anterior</button>
                            <button onClick={() => handlePaginateUsers(actualPageUsers + 1)} disabled={() => actualPageUsers.length === 0}>Siguiente</button>
                        </div>
                    </div>
                )}

                {selectedOption === 'sports' && (
                    <div>
                        {sports?.map((sport) => (
                            <CardSport key={sport.name} sport={sport} />
                        ))}
                    </div>
                )}
                {selectedOption === 'clubs' && (
                    <div>
                        <div>
                            {clubs?.map((club) => {
                                return (
                                    <CardClub club={club} />
                                )
                            })}
                        </div>
                        <div>
                            <button onClick={() => handlePaginateClubs(actualPageClubs - 1)} disabled={actualPageClubs === 1}>Anterior</button>
                            <button onClick={() => handlePaginateClubs(actualPageClubs + 1)} disabled={() => actualPageClubs.length === 0}>Siguiente</button>
                        </div>
                    </div>
                )}
                {selectedOption === 'courts' && (
                    <div>
                        <div>
                            {courts?.map((court) => {
                                return (
                                    <CardCourt court={court} />
                                )
                            })}
                        </div>
                        <div>
                            {/* <button onClick={() => handlePaginateClubs(actualPageClubs - 1)} disabled={actualPageClubs === 1}>Anterior</button>
                            <button onClick={() => handlePaginateClubs(actualPageClubs + 1)} disabled={() => actualPageClubs.length === 0}>Siguiente</button> */}
                        </div>
                    </div>
                )}

            </div>
            <NavbarLow />
        </div>
    );
};
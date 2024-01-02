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
import { fetchClubs, fetchCourts, fetchLocations, fetchSports, fetchUsers } from '../../redux/reducer';
import Solicitudes from '../solucitudes/Solicitudes';

export default function Home() {
    const [selectedOption, setSelectedOption] = useState('users');
    const [selectedSection, setSelectedSection] = useState('users');
    const [actualPageUsers, setActualPageUsers] = useState(1);
    // const [actualPageCourts, setActualPageCourts] = useState(1);
    const [actualPageClubs, setActualPageClubs] = useState(1);
    const [solicitudes, setSolicitudes] = useState(false);
    
    // const dispatch = useDispatch();
    // const users = useSelector((state) => state.user.allUsers);
    // const sports = useSelector((state) => state.user.allSports);
    // const clubs = useSelector((state) => state.user.allClubs);
    // const courts = useSelector((state) => state.user.allcourts);
    // const reservations = useSelector((state) => state.user.allReservations);
    
  
    // useEffect(() => {
    //   dispatch(fetchUsers(actualPageUsers));
    // }, [actualPageUsers]);
    // useEffect(() => {
    //   dispatch(fetchClubs());
    // }, []);
    // useEffect(() => {
    //   dispatch(fetchCourts());
    // }, []);
    // useEffect(() => {
    //   dispatch(fetchSports());
    // }, []);

    const courts = [
        {
            name: 'Cancha 1',
            club: 'Palmeras',
            description: 'Cancha para futbol 7.',
            sport: 'Fútbol',
            priceFee: 50,
            warrantyReservation: 'Card',
            grassType: 'Grass Alto',
            lighting: 'Luz Fuerte',
            doorsType: 'Reja de metal',
            wallsType: 'Malla',
            reputation: 'Excelente',
        },
        {
            name: 'Cancha 2',
            club: 'Palmeras',
            sport: 'Fútbol',
            description: 'Cancha para futbol 6.',
            priceFee: 50,
            warrantyReservation: 'Card',
            grassType: 'Grass Alto',
            lighting: 'Luz Fuerte',
            doorsType: 'Reja de metal',
            wallsType: 'Malla',
            reputation: 'Buena',
        },
        {
            name: 'Cancha 3',
            club: 'Palmeras',
            description: 'Cancha para futbol 5',
            sport: 'Fútbol',
            priceFee: 50,
            warrantyReservation: 'Card',
            grassType: 'Grass Alto',
            lighting: 'Luz Fuerte',
            doorsType: 'Reja de metal',
            wallsType: 'Malla',
            reputation: 'Regular',
        },
        {
            name: 'Tennis Yard 1',
            club: 'Marriot Tennis',
            description: 'Campo profesional de tennis.',
            sport: 'Tennis',
            priceFee: 50,
            warrantyReservation: 'Card',
            grassType: 'No Grass',
            lighting: 'Luz Fuerte',
            doorsType: 'Reja de metal',
            wallsType: 'Concreto',
            reputation: 'Excelente',
        },
        {
            name: 'Tennis Yard 2',
            club: 'Marriot Tennis',
            description: 'Campo amateur de tennis.',
            sport: 'Tennis',
            priceFee: 30,
            warrantyReservation: 'Card',
            grassType: 'No Grass',
            lighting: 'Luz Fuerte',
            doorsType: 'Reja de metal',
            wallsType: 'Malla',
            reputation: 'Excelente',
        },
        {
            name: 'Futbol Court',
            club: "The Courtyard",
            description: 'Campo amateur de futbol.',
            sport: 'Fútbol',
            priceFee: 40,
            warrantyReservation: 'Card',
            grassType: 'Loza',
            lighting: 'Luz Media',
            doorsType: 'Entrada directa.',
            wallsType: 'Puertas de concreto.',
            reputation: 'Mala',
        },
        {
            name: 'Basket Court',
            club: "The Courtyard",
            sport: 'Baloncesto',
            description: 'Campo amateur de basket.',
            priceFee: 35,
            warrantyReservation: 'Card',
            grassType: 'Loza',
            lighting: 'Luz Alta',
            doorsType: 'Entrada directa.',
            wallsType: 'Puertas de concreto.',
            reputation: 'Media',
        },
        {
            name: 'Basket Field 1',
            club: "Country Club",
            description: 'Campo profesional de basket.',
            sport: 'Baloncesto',
            priceFee: 75,
            warrantyReservation: 'Card',
            grassType: 'Parquet',
            lighting: 'Luz Alta',
            doorsType: 'Entrada directa.',
            wallsType: 'Puertas de concreto.',
            reputation: 'Excelente',
        },
        {
            name: 'Basket Field 2',
            club: "Country Club",
            description: 'Campo profesional de basket.',
            sport: 'Baloncesto',
            priceFee: 75,
            warrantyReservation: 'Card',
            grassType: 'Parquet',
            lighting: 'Luz Alta',
            doorsType: 'Entrada directa.',
            wallsType: 'Puertas de concreto.',
            reputation: 'Excelente',
        },

        {
            name: 'Padel Field 1',
            club: "Regis Club",
            description: 'Campo profesional de padel.',
            sport: 'Padel',
            priceFee: 80,
            warrantyReservation: 'Card',
            grassType: 'Parquet',
            lighting: 'Luz Alta',
            doorsType: 'Entrada indirecta.',
            wallsType: 'Puertas de madera.',
            reputation: 'Excelente',
        },
        {
            name: 'Padel Field 2',
            club: "Regis Club",
            description: 'Campo amateur de padel.',
            sport: 'Padel',
            priceFee: 60,
            warrantyReservation: 'Card',
            grassType: 'Parquet',
            lighting: 'Luz Alta',
            doorsType: 'Entrada indirecta.',
            wallsType: 'Puertas de madera.',
            reputation: 'Excelente',
        },
        {
            name: 'Padel Field 3',
            club: "Regis Club",
            description: 'Campo profesional de padel.',
            sport: 'Padel',
            priceFee: 80,
            warrantyReservation: 'Card',
            grassType: 'Parquet',
            lighting: 'Luz media',
            doorsType: 'Entrada indirecta.',
            wallsType: 'Puertas de madera.',
            reputation: 'Excelente',
        },



    ]

    const reservations = [
        {
            id: "0001",
            dateTimeStart: ["30/12/2023", "18:00:00"],
            dateTimeEnd: ["30/12/2023", "19:00:00"],
            totalCost: 40,
            sport: 'Fútbol',
            ciudad: 'La Paz',
            club: 'The Courtyard',
            court: 'Futbol Court',

        },
        {
            id: "0002",
            dateTimeStart: ["30/12/2023", "18:00:00"],
            dateTimeEnd: ["30/12/2023", "19:00:00"],
            totalCost: 45,
            sport: 'Baloncesto',
            ciudad: 'La Paz',
            club: 'The Courtyard',
            court: 'Cancha Basquet 1',

        },
        {
            id: "0003",
            dateTimeStart: ["30/12/2023", "19:00:00"],
            dateTimeEnd: ["30/12/2023", "20:00:00"],
            totalCost: 40,
            sport: 'Tennis',
            ciudad: 'La Paz',
            club: 'El Rancho',
            court: 'Campo Tennis 1',

        },
        {
            id: "0004",
            dateTimeStart: ["31/12/2023", "14:00:00"],
            dateTimeEnd: ["31/12/2023", "15:00:00"],
            totalCost: 40,
            sport: 'Tennis',
            ciudad: 'Santiago',
            club: 'Marriot Tennis',
            court: 'Tennis Yard 2',
        },
        {
            id: "0005",
            dateTimeStart: ["31/12/2023", "11:00:00"],
            dateTimeEnd: ["31/12/2023", "12:00:00"],
            totalCost: 55,
            sport: 'Baloncesto',
            ciudad: 'Santiago',
            club: 'Baloncesto Unido',
            court: 'Campo Basket 1',
        },
        {
            id: "0008",
            dateTimeStart: ["31/12/2023", "16:00:00"],
            dateTimeEnd: ["31/12/2023", "17:00:00"],
            totalCost: 75,
            sport: 'Baloncesto',
            ciudad: 'Buenos Aires',
            club: 'Country Club',
            court: 'Basket Field 1',
        },
        {
            id: "00012",
            dateTimeStart: ["31/12/2023", "17:00:00"],
            dateTimeEnd: ["31/12/2023", "18:00:00"],
            totalCost: 80,
            sport: 'Padel',
            ciudad: 'Lima',
            club: 'Regis Club',
            court: 'Padel Field 1',
        },
        {
            id: "00013",
            dateTimeStart: ["01/01/2023", "10:00:00"],
            dateTimeEnd: ["01/01/2023", "12:00:00"],
            totalCost: 65,
            sport: 'Fútbol',
            ciudad: 'Lima',
            club: 'Regis Club',
            court: 'Campo 1',
        },
        {
            id: "00014",
            dateTimeStart: ["02/01/2023", "08:00:00"],
            dateTimeEnd: ["03/01/2023", "09:00:00"],
            totalCost: 55,
            sport: 'Fútbol',
            ciudad: 'Lima',
            club: 'Regis Club',
            court: 'Campo 2',
        },
    ]



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
            description: "Amante del tennis en México, su pasión incluye el tennis y la natación.",
            pais: "México",
            deportes: ["tennis", "natación"]
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
    const ciudades = ['La Paz', 'Santiago', 'Rio de Janeiro', 'Buenos Aires', 'Lima', 'Trujillo'];
    

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
            name: "Tennis",
            clubs: ["Club 1", "Club 2", "Club 3"]
        }
    ];

    const clubs = [
        {
            name: "Marriot Tennis",
            ciudad: 'Santiago',
            sport: ['Tennis'],
        },
        {
            name: "The Courtyard",
            ciudad: 'La Paz',
            sport: ['Fútbol', 'Baloncesto'],
        },
        {
            name: "Palmeras",
            ciudad: 'Rio de Janeiro',
            sport: ['Fútbol'],
        },
        {
            name: "Country Club",
            ciudad: 'Buenos Aires',
            sport: ['Baloncesto'],
        },
        {
            name: "Regis Club",
            ciudad: 'Lima',
            sport: ['Padel'],
        },
        {
            name: "Big Smoke Club",
            ciudad: 'Trujillo',
            sport: ['Tennis'],
        }

    ];

    const [reservToRender, setReservToRender] = useState(reservations);
    const [filteredReservs, setFilteredReservs] = useState();

    const handlePaginateUsers = (newPage) => {
        if (newPage > 0) setActualPageUsers(newPage);
    }

    // const handlePaginateCourts = (newPage) => {
    //     if (newPage > 0) setActualPageUsers(newPage);
    // }

    const handlePaginateClubs = (newPage) => {
        if (newPage > 0) setActualPageClubs(newPage);
    };

    let ciudadesToRenderOne = reservations.map((element)=> element.ciudad);
    let ciudadesNoRepeat = new Set(ciudadesToRenderOne);
    let result = Array.from(ciudadesNoRepeat);


    const handleButtonClick = (option) => {
        setSelectedOption(option);
        setSelectedSection(option);
    };
    const handleFilterCiudad = (event) => {
        let value = event.target.value;
        let result = reservations.filter((element) => element.ciudad == value);
        setReservToRender(result);
        setFilteredReservs(result);
    };

        let clubsToRender = reservToRender.map((element) => element.club);
        let clubsNoRepeat = new Set(clubsToRender);
        let arrayClubs = Array.from(clubsNoRepeat);

    const handleFilterClubs = (event) => {
        let value = event.target.value;
        let result = reservToRender.filter((element) => element.club == value);
        setReservToRender(result);
    };

    let sportsToRender = reservToRender.map((element) => element.sport);
    let sportsNoRepeat = new Set(sportsToRender);
    let arraySports = Array.from(sportsNoRepeat);

    const handleFilterDeporte = (event) => {
        let value = event.target.value;
        let result = reservToRender.filter((element) => element.sport == value);
        setReservToRender(result);
    };

    const resetHandler = () => {
        setReservToRender(reservations);
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
                        <button className = {styles.resetButton} onClick = {resetHandler}>💫</button>
                        <div className = {styles.filter}>
                        <label className = {styles.labelFilter}>Ciudad</label>
                            <select onChange = {handleFilterCiudad} className = {styles.selectFilter}>
                            <option disabled>Seleccionar Ciudad</option>
                                {result?.map((ciudad) => <option value={ciudad} key = {ciudad}>{ciudad}</option>)}
                            </select>
                        </div>
                        <div className={styles.filter}>
                            <label className = {styles.labelFilter}>Clubs</label>
                            <select onChange = {handleFilterClubs} className = {styles.selectFilter}>
                            <option disabled>Seleccionar Club</option>
                                {arrayClubs?.map((club) => <option value={club} key = {club}>{club}</option>)}
                            </select>
                        </div>
                        <div className={styles.filter}>
                            <label className = {styles.labelFilter}>Deporte</label>
                            <select onChange = {handleFilterDeporte} className = {styles.selectFilter}>
                                <option disabled>Seleccionar Deporte</option>
                                {arraySports?.map((deporte) => <option value={deporte} key = {deporte}>{deporte}</option>)}
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
                <CardReservation reservations = {reservToRender} />
            </div>
            <div className={styles.containerTitle}>
                <button onClick={() => handleButtonClick('users')} className={styles.NavBtn}>Users</button>
                <button onClick={() => handleButtonClick('sports')} className={styles.NavBtn}>Sports</button>
                <button onClick={() => handleButtonClick('clubs')} className={styles.NavBtn}>Clubs</button>
                <button onClick={() => handleButtonClick('courts')} className={styles.NavBtn}>Courts</button>
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
                            <button onClick={() => handlePaginateUsers(actualPageUsers + 1)} disabled={actualPageUsers.length === 0}>Siguiente</button>
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
                            <button onClick={() => handlePaginateClubs(actualPageClubs + 1)} disabled={actualPageClubs.length === 0}>Siguiente</button>
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
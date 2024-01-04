import React, { useEffect } from 'react';
import styles from './home.module.css';
import CardUser from '../cardUsers/CardUser';
import FriendsContainer from '../../components/friendsContainer/FriendsContainer.jsx';
import CardClub from '../cardClubs/CardClub';
import CardCourt from '../cardCourt/CardCourt';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarLow from '../../components/navbarLow/navbarLow';
import CardReservation from '../../components/card-reservations/CardReservation.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubs, fetchCourts, fetchSports, fetchUsers, fetchReservations, userSlice } from '../../redux/reducer.js';

export default function Home() {
    const dispatch = useDispatch();

    const [selectedOption, setSelectedOption] = useState('users');
    const [selectedSection, setSelectedSection] = useState('users');
    const [actualPageUsers, setActualPageUsers] = useState(1);
    const [actualPageCourts, setActualPageCourts] = useState(1);
    const [actualPageClubs, setActualPageClubs] = useState(1);

    useEffect(()=>{
        dispatch(fetchUsers());
        dispatch(fetchReservations());
        dispatch(fetchClubs());
        dispatch(fetchCourts());
        dispatch(fetchSports());
    }, []);

    const users = useSelector((state) => state.user.allUsers);
    const userLogeado = useSelector((state) => state.user.user);
    const sports = useSelector((state) => state.user.allSports);
    const clubs = useSelector((state) => state.user.allClubs);
    const courts = useSelector((state) => state.user.allCourts);
    const reservations = useSelector((state) => state.user.allReservations);

    const [reservToRender, setReservToRender] = useState(reservations);
    const [filteredReservs, setFilteredReservs] = useState();

    const handlePaginateUsers = (newPage) => {
        if (newPage > 0) setActualPageUsers(newPage);
    }

    const handlePaginateCourts = (newPage) => {
        if (newPage > 0) setActualPageCourts(newPage);
    }
    const courtsPerPage = 5;
    const startCourts = (actualPageCourts - 1) * courtsPerPage;
    const endCourts = startCourts + courtsPerPage;

    const handlePaginateClubs = (newPage) => {
        if (newPage > 0) setActualPageClubs(newPage);
    };

    // console.log(users, userLogeado, sports, clubs, courts, reservations);
    console.log(users);


    return (
       
        <div className={styles.containerHome}>
            {
                userLogeado.admin && <FunctionsAdmin/>
            }
            <div className={styles.header}>
                <h1 className={styles.title}>matching</h1>
                <Link to='/profile'><div className={styles.icon}>
                    <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1704001242/iconjpeg_icix8f.jpg" alt="icono" className={styles.imgIcon} />
                </div></Link>
                <Link to='/solicitudes'><button>solicitudes</button></Link>
                
            </div>
            <FriendsContainer friends = {users}/>
            <div className = {styles.divCourts}>
                <h2>Campos</h2>
            {
                    courts?.map(court => (
                        <CardCourt court={court}/>
                    ))
                }
            <div>
                            <button onClick={() => handlePaginateCourts(actualPageCourts - 1)} disabled={actualPageCourts === 1}>Anterior</button>
                            <button onClick={() => handlePaginateCourts(actualPageCourts + 1)} disabled={actualPageCourts.length === 0}>Siguiente</button>
            </div>
            </div>
            <div className = {styles.reservationsContainer}>
                <CardReservation reservations = {reservations} />
            </div>
            <div className={styles.cardUser}>
                <div className = {styles.userContainer}>
                {
                    users?.map(user => (
                        <CardUser user={user} />
                    ))
                }
                </div>
            </div>
            <NavbarLow />
        </div>
    );
};

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
    //         sport: 'Tennis',
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
    //         sport: 'Tennis',
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
    //         dateTimeStart: ["30/12/2023", "18:00:00"],
    //         dateTimeEnd: ["30/12/2023", "19:00:00"],
    //         totalCost: 45,
    //         sport: 'Baloncesto',
    //         ciudad: 'La Paz',
    //         club: 'The Courtyard',
    //         court: 'Cancha Basquet 1',

    //     },
    //     {
    //         id: "0003",
    //         dateTimeStart: ["30/12/2023", "19:00:00"],
    //         dateTimeEnd: ["30/12/2023", "20:00:00"],
    //         totalCost: 40,
    //         sport: 'Tennis',
    //         ciudad: 'La Paz',
    //         club: 'El Rancho',
    //         court: 'Campo Tennis 1',

    //     },
    //     {
    //         id: "0004",
    //         dateTimeStart: ["31/12/2023", "14:00:00"],
    //         dateTimeEnd: ["31/12/2023", "15:00:00"],
    //         totalCost: 40,
    //         sport: 'Tennis',
    //         ciudad: 'Santiago',
    //         club: 'Marriot Tennis',
    //         court: 'Tennis Yard 2',
    //     },
    //     {
    //         id: "0005",
    //         dateTimeStart: ["31/12/2023", "11:00:00"],
    //         dateTimeEnd: ["31/12/2023", "12:00:00"],
    //         totalCost: 55,
    //         sport: 'Baloncesto',
    //         ciudad: 'Santiago',
    //         club: 'Baloncesto Unido',
    //         court: 'Campo Basket 1',
    //     },
    //     {
    //         id: "0008",
    //         dateTimeStart: ["31/12/2023", "16:00:00"],
    //         dateTimeEnd: ["31/12/2023", "17:00:00"],
    //         totalCost: 75,
    //         sport: 'Baloncesto',
    //         ciudad: 'Buenos Aires',
    //         club: 'Country Club',
    //         court: 'Basket Field 1',
    //     },
    //     {
    //         id: "00012",
    //         dateTimeStart: ["31/12/2023", "17:00:00"],
    //         dateTimeEnd: ["31/12/2023", "18:00:00"],
    //         totalCost: 80,
    //         sport: 'Padel',
    //         ciudad: 'Lima',
    //         club: 'Regis Club',
    //         court: 'Padel Field 1',
    //     },
    //     {
    //         id: "00013",
    //         dateTimeStart: ["01/01/2023", "10:00:00"],
    //         dateTimeEnd: ["01/01/2023", "12:00:00"],
    //         totalCost: 65,
    //         sport: 'Fútbol',
    //         ciudad: 'Lima',
    //         club: 'Regis Club',
    //         court: 'Campo 1',
    //     },
    //     {
    //         id: "00014",
    //         dateTimeStart: ["02/01/2023", "08:00:00"],
    //         dateTimeEnd: ["03/01/2023", "09:00:00"],
    //         totalCost: 55,
    //         sport: 'Fútbol',
    //         ciudad: 'Lima',
    //         club: 'Regis Club',
    //         court: 'Campo 2',
    //     },
    // ];

    // const ciudades = ['La Paz', 'Santiago', 'Rio de Janeiro', 'Buenos Aires', 'Lima', 'Trujillo'];
    

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
    //         name: "Tennis",
    //         clubs: ["Club 1", "Club 2", "Club 3"]
    //     }
    // ];

    // const clubs = [
    //     {
    //         name: "Marriot Tennis",
    //         ciudad: 'Santiago',
    //         sport: ['Tennis'],
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
    //         sport: ['Tennis'],
    //     }

    //  ];
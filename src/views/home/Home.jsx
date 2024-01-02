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
import { fetchClubs, fetchCourts, fetchSports, fetchUsers } from '../../redux/reducer';
import Solicitudes from '../solucitudes/Solicitudes';
import FunctionsAdmin from './FunctionsAdmin'

export default function Home() {
    const [selectedOption, setSelectedOption] = useState('users');
    const [selectedSection, setSelectedSection] = useState('users');
    const [actualPageUsers, setActualPageUsers] = useState(1);
    // const [actualPageCourts, setActualPageCourts] = useState(1);
    const [actualPageClubs, setActualPageClubs] = useState(1);
    const [solicitudes, setSolicitudes] = useState(false);
    const [adm, setAdm] = useState(false)

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const users = useSelector((state) => state.user.allUsers);
    const sports = useSelector((state) => state.user.allSports);
    const clubs = useSelector((state) => state.user.allClubs);
    const courts = useSelector((state) => state.user.allcourts);
    const reservations = useSelector((state) => state.user.allReservations);
    const [reservToRender, setReservToRender] = useState(reservations);
  
    useEffect(() => {
      dispatch(fetchUsers(actualPageUsers));
    }, [actualPageUsers]);
    useEffect(() => {
      dispatch(fetchClubs());
    }, []);
    useEffect(() => {
      dispatch(fetchCourts());
    }, []);
    useEffect(() => {
      dispatch(fetchSports());
    }, []);

    

    
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
    if(user.admin){
        return (
            
            <div className={styles.containerHome}>
                <button onClick={()=> setAdm(true)}>Admin</button>
                <FunctionsAdmin setAdm={setAdm} adm={adm} />
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
                {/* <NavbarLow /> */}
            </div>
        );
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
            {/* <NavbarLow /> */}
        </div>
    );
};
import React, { useEffect } from 'react';
import styles from './home.module.css';
import CardUser from '../cardUsers/CardUser';
import CardSport from '../cardSports/CardSport';
import CardClub from '../cardClubs/CardClub';
import CardCourt from '../cardCourt/CardCourt';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarLow from '../../components/navbarLow/navbarLow';
import CardReservation from '../../components/card-reservations/CardReservation.jsx';
import SearchBarUsers from '../searchBar/SearchBarUsers.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubs, fetchCourts, fetchSports, fetchUser, fetchUsers } from '../../redux/reducer.js';
import FunctionsAdmin from './FunctionsAdmin.jsx';

export default function Home() {
    const dispatch = useDispatch();

    const [selectedOption, setSelectedOption] = useState('users');
    const [selectedSection, setSelectedSection] = useState('users');
    const [actualPageUsers, setActualPageUsers] = useState(1);
    const [actualPageCourts, setActualPageCourts] = useState(1);
    const [actualPageClubs, setActualPageClubs] = useState(1);
    
    
  
     const users = useSelector((state) => state.user.allUsers);
     const userLogeado =useSelector((state) =>state.user.user.user)
    const sports = useSelector((state) => state.user.allSports);
     const clubs = useSelector((state) => state.user.allClubs);
     const courts = useSelector((state) => state.user.allcourts);
    const reservations = useSelector((state) => state.user.allReservations);

    

    useEffect(()=>{
        dispatch(fetchUser())
        dispatch(fetchUsers(actualPageUsers))
        dispatch(fetchClubs());
        dispatch(fetchCourts());
        dispatch(fetchSports());
    }, []);

  

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
    // const courtsToDisplay = courts.slice(startCourts, endCourts);

    const handlePaginateClubs = (newPage) => {
        if (newPage > 0) setActualPageClubs(newPage);
    };
    const clubsPerPage = 5;
    const start = (actualPageClubs - 1) * clubsPerPage;
    const end = start + clubsPerPage;
    //const clubsToDisplay = clubs.slice(start, end);

    let ciudadesToRenderOne = reservations.map((element)=> element.ciudad);
    let ciudadesNoRepeat = new Set(ciudadesToRenderOne);
    let result = Array.from(ciudadesNoRepeat);


    const handleButtonClick = (option) => {
        setSelectedOption(option);
        setSelectedSection(option);
    };
    const handleFilterCiudad = (event) => {
        let value = event.target.value;
        let result = reservations?.filter((element) => element.ciudad == value);
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

   console.log('holi',userLogeado?.admin)
   

    return (
       
        <div className={styles.containerHome}>
            {
                userLogeado?.admin ?  <FunctionsAdmin/> : null
            }
            <div className={styles.header}>
                <h1 className={styles.title}>matching</h1>
                <Link to='/profile'><div className={styles.icon}>
                    <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1704001242/iconjpeg_icix8f.jpg" alt="icono" className={styles.imgIcon} />
                </div></Link>
                <Link to='/solicitudes'><button>solicitudes</button></Link>
                
            </div>
            <div className = {styles.divCourts}>
            {
                    courts?.map(court => (
                        <CardCourt court={court}/>
                    ))
                }
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
                        <div className={styles.filter}>
                            <label>Clubs</label>
                            <select>
                                <option disabled></option>
                                {clubs?.map((club) => <option value={club.name}>{club.name}</option>)}
                            </select>
                        </div> */

                    </div>
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
<SearchBarUsers />
                        {/* <div className={styles.buttonUsers}>
                            <button onClick={() => handlePaginateUsers(actualPageUsers - 1)} disabled={actualPageUsers === 1}>Anterior</button>
                            <button onClick={() => handlePaginateUsers(actualPageUsers + 1)} disabled={actualPageUsers.length === 0}>Siguiente</button>
                        </div> */}
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
                            {/* clubs */}
                            {clubsToDisplay?.map((club) => {
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
                            {/* courts */}
                            {courts?.map((court) => {
                                return (
                                    <CardCourt court={court} />
                                )
                            })}
                        </div>
                        <div>
                            <button onClick={() => handlePaginateCourts(actualPageCourts - 1)} disabled={actualPageCourts === 1}>Anterior</button>
                            <button onClick={() => handlePaginateCourts(actualPageCourts + 1)} disabled={actualPageCourts.length === 0}>Siguiente</button>
                        </div>
                    </div>
                        )}

            </div>
            <div className = {styles.cardUser}>
                {
                    users?.map(user => (
                        <CardUser user={user}/>
                    ))
                }
            </div>
            <NavbarLow />
        </div>
    );
};
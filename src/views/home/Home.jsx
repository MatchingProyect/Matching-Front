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
import { fetchClubs, fetchCourts, fetchSports, fetchUser, fetchUsers, fetchReservations } from '../../redux/reducer.js';
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
     const courts = useSelector((state) => state.user.allCourts);
    const reservations = useSelector((state) => state.user.allReservations);

    console.log(userLogeado);

    

    useEffect(()=>{
        dispatch(fetchUser())
        dispatch(fetchUsers())
        dispatch(fetchClubs());
        dispatch(fetchCourts());
        dispatch(fetchSports());
        dispatch(fetchReservations());
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

    const handlePaginateClubs = (newPage) => {
        if (newPage > 0) setActualPageClubs(newPage);
    };



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
            <div className = {styles.friendsContainer}>
            <FriendsContainer friends = {users}/>
            </div>
            <div className = {styles.divCourts}>
                <h2 className = {styles.courtsTitle}>Campos</h2>
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
            <div className = {styles.clubsContainer}>
                {clubs?.map((club) => <CardClub club = {club} />)}                
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


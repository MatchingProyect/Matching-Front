import React, { useEffect } from 'react';
import styles from './home.module.css';
import CardUser from '../cardUsers/CardUser';
import FriendsContainer from '../../components/friendsContainer/FriendsContainer.jsx';
import CardClub from '../cardClubs/CardClub';
import CardCourt from '../cardCourt/CardCourt';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarLow from '../../components/navbarLow/navbarLow';
import CardReservation from '../../components/card-reservations/CardReservation.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubs, fetchCourts, fetchSports, fetchUser, fetchUsers, fetchReservations, fetchLocations, logout } from '../../redux/reducer.js';


export default function Home() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.allUsers);
    const clubs = useSelector((state) => state.user.allClubs);
    const courts = useSelector((state) => state.user.allCourts);
    const reservations = useSelector((state) => state.user.allReservations);
    const locations = useSelector((state) => state.user.allLocations);
    const estadoFriends = useSelector((state) => state.user.allFriends);
    const userLogeado = useSelector(state =>  state.user?.user?.user);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchClubs());
        dispatch(fetchCourts());
        dispatch(fetchLocations());
        dispatch(fetchReservations());
    }, []);
    
    const [filteredCourts, setFilteredCourts] = useState([]);
    const [filteredClubs, setFilteredClubs] = useState([]);




    const navigate = useNavigate();


    const desloguearte = () => {
       dispatch(logout())
       localStorage.removeItem('userData');
       navigate('/login')
      
        
       
    };

    

  const courtsFilterByLocations = function(event){
    let value = event.target.value;
    let courtsFilteredByLocations = courts.filter((element) => element.LocationId == value);
    return setFilteredCourts(courtsFilteredByLocations);
  };

  const courtsFilterByClubs = function(event){
    let value = event.target.value;
    let courtsFilteredByClubs = courts.filter((element) => element.ClubId == value);
    return setFilteredCourts(courtsFilteredByClubs);
  };

  const clubsFilterByLocations = function(event){
    let value = event.target.value;
    let clubsFilteredByLocations = clubs.filter((element) => element.LocationId == value);
    return setFilteredClubs(clubsFilteredByLocations);
  };

    return (

        <div className={styles.containerHome}>
            {
                userLogeado?.admin ?  <Link to='/functionsAdm'><button >admin</button></Link> : null
            }
            
            <div className={styles.header}>
                <h1 className={styles.title}>matching</h1>
                <Link to='/profile'><div className={styles.icon}>
                    <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1704001242/iconjpeg_icix8f.jpg" alt="icono" className={styles.imgIcon} />
                </div></Link>
                <Link to='/solicitudes'><button>solicitudes</button></Link>
                <button onClick={()=>desloguearte()}>Log Out</button>

            </div>
            <div className={styles.friendsContainer}>
                <FriendsContainer friends={estadoFriends} />
            </div>
            <div className={styles.divCourts}>
                <h2 className={styles.courtsTitle}>Campos</h2>
                <div className = {styles.filtroContainer}>
                <div className = {styles.filtrosDiv}>
                    <label className = {styles.filterLabel}>Ciudades</label>
                    <select onChange = {courtsFilterByLocations} className = {styles.selectFiltros}>
                        <option disabled >Ciudades</option>
                        <option>Todos los Clubes</option>
                        {locations?.filter(location => location.estado == true).map((element) => <option value = {element.id} key = {element.id}>{element.name}</option>)}
                    </select>
                </div>
                <div className = {styles.filtrosDiv}>
                    <label className = {styles.filterLabel}>Clubes</label>
                    <select onChange = {courtsFilterByClubs} className = {styles.selectFiltros}>
                        <option disabled >Clubes</option>
                        <option>Todos los Clubes</option>
                        {clubs?.filter(club => club.estado == true).map((element) => <option value = {element.id} key = {element.id}>{element.name}</option> )}
                    </select>
                </div>
                </div>
                {
                    filteredCourts.length > 0 ? 
                        filteredCourts.filter(court => court.estado === true)
                        .map(filteredCourt => (
                            <CardCourt key={filteredCourt.id} court={filteredCourt} />
                        )) : courts?.filter(court => court.estado === true)
                        .map(filteredCourt => (
                            <CardCourt key={filteredCourt.id} court={filteredCourt} />
                        ))
                }
            </div>
            <div className={styles.clubsContainer}>
                <div className = {styles.divFiltro}>
                    <label>Ciudades</label>
                    <select onChange = {clubsFilterByLocations} className = {styles.selectFiltros}>
                        <option disabled>Ciudades</option>
                        <option>Todos los Clubs</option>
                        {locations?.length > 0 && locations.filter(location => location.estado == true).map((element) => <option value = {element.id} key = {element.id}>{element.name}</option>)}
                    </select>
                </div>
                <div className = {styles.divCards}>
                {
                    filteredClubs.length > 0 ?
                        filteredClubs.filter(club => club.estado === true)
                        .map(filteredClub => (
                            <CardClub key={filteredClub.id} club={filteredClub} />
                        )) : clubs?.filter(club => club.estado === true)
                        .map(filteredClub => (
                            <CardClub key={filteredClub.id} club={filteredClub} />
                        ))
                }
                </div>

            </div>
            <div className={styles.reservationsContainer}>
                <CardReservation reservations={reservations} />
            </div>
            <div className={styles.userContainer}>
                {
                    users?.filter(user => user.estado === true && user.id !== userLogeado?.id)
                        .map(filteredUser => (
                            <CardUser key={filteredUser.id} user={filteredUser} />
                        ))
                }
            </div>
            <NavbarLow />
        </div>
    );
};
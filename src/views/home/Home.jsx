import React, { useEffect } from 'react';
import styles from './home.module.css';
import CardUser from '../cardUsers/CardUser';
import FriendsContainer from '../../components/friendsContainer/FriendsContainer.jsx';
import Button from '@mui/material/Button';
import CardClub from '../cardClubs/CardClub';
import CardCourt from '../cardCourt/CardCourt';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarLow from '../../components/navbarLow/navbarLow';
import CardReservation from '../../components/card-reservations/CardReservation.jsx';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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
                userLogeado?.admin ?
                <div className = {styles.dropdownAdmin}>
                <Link to='/functionsAdm'>
                    <Button startIcon = {<ManageAccountsIcon 
                        sx = {{
                            'color':'black',
                            'width': '80px',
                            'height':'35px',
                            'marginLeft':'-10px'
                            
                        }}
                        />}
                        sx = {{
                            'color':'black',                            
                            'backgroundColor': 'transparent',                            
                            'margin': '10px',
                            'borderStyle' : 'solid',
                            'borderWidth' : '4px',
                            'borderColor': 'black',
                            'borderRadius':'10px',
                            'boxShadow': '0px 0px 8px 0px rgb(0, 0, 0)',
                        }}><h1 className = {styles.btnLabelAdmin}>Admin</h1>
                    </Button>
            </Link>
            </div> : null
            }
            
            <div className={styles.header}>
                <h1 className={styles.title}>matching</h1>
                <div className = {styles.navBarFunctions}>
                <Link to = '/profile'>
                <IconButton
                sx = {{
                    'backgroundColor': 'rgb(26, 26, 26)',
                    'borderRadius': '5px',
                    'marginRight': '10px',
                    'boxShadow': '0px 0px 8px 0px rgb(0, 0, 0)',
                }}
                onClick={()=>desloguearte()}
                >
                <PersonIcon sx = {{
                    'color':'white',
                    'width': '35px',
                    'height':'35px',
                }}>
                </PersonIcon>
                </IconButton>
                </Link>
                <Link to='/solicitudes'>
                <IconButton
                sx = {{
                    'backgroundColor': 'rgb(26, 26, 26)',
                    'borderRadius': '5px',
                    'marginRight': '10px',
                    'boxShadow': '0px 0px 8px 0px rgb(0, 0, 0)',
                }}
                >
                <NotificationsNoneIcon sx = {{
                    'color':'white',
                    'width': '35px',
                    'height':'35px',
                    
                }}>
                
                </NotificationsNoneIcon>                
                </IconButton>
                </Link>
                <IconButton
                sx = {{
                    'backgroundColor': 'rgb(26, 26, 26)',
                    'borderRadius': '5px',
                    'marginRight': '10px',
                    'boxShadow': '0px 0px 8px 0px rgb(0, 0, 0)',
                }}
                onClick={()=>desloguearte()}
                >
                <LogoutIcon sx = {{
                    'color':'white',
                    'width': '35px',
                    'height':'35px',
                }}>
                </LogoutIcon>
                </IconButton>
                </div>
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
                        <option>Todas las Ciudades</option>
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
                    <label className = {styles.labelFiltros}>Ciudades</label>
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
                <CardReservation reservations={reservations} courts = {courts} />
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
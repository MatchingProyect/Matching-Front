import { useEffect } from 'react';
import styles from './home.module.css';
import FriendsContainer from '../../components/friendsContainer/FriendsContainer.jsx';
import { Link } from 'react-router-dom';
import NavbarLow from '../../components/navbarLow/navbarLow';
import CardReservation from '../../components/card-reservations/CardReservation.jsx';
import { useState } from 'react';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubs, fetchCourts, fetchSports, fetchUsers, fetchReservations, fetchLocations } from '../../redux/reducer.js';

import Campos from './CamposComponent/Campos.jsx'
import NavBar from './navBar/navBar.jsx'
import Cards from './Cards/Cards.jsx'

export default function Home() {
    const dispatch = useDispatch();
    const courts = useSelector((state) => state.user.allCourts);
    const reservations = useSelector((state) => state.user.allReservations);
    const estadoFriends = useSelector((state) => state.user.allFriends);
    const userLogeado = useSelector(state =>  state.user?.datauser?.user);

    const [activeComponent, setActiveComponent] = useState('campos');

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchClubs());
        dispatch(fetchCourts());
        dispatch(fetchLocations());
        dispatch(fetchReservations());
        dispatch(fetchSports());

    }, []);
    


    return (

        <div className={styles.containerHome}>
            {
                userLogeado?.admin ?
                <div className = {styles.dropdownAdmin}>
                    <Link to='/functionsAdm'>
                        <div  className = {styles.customButton}>
                            <ManageAccountsIcon className={styles.manageAccountsIcon} />
                            <h1 className={styles.btnLabelAdmin}>Admin</h1>
                        </div>
                    </Link>
                </div> : null
            }
            <div className={styles.navBarContainer}>
                <NavBar/>
            </div>

            <div className={styles.friendsContainer}>
                <FriendsContainer friends={estadoFriends} />
            </div>

            
            <div className={styles.navComponent}>
                <button onClick={() => setActiveComponent('campos')}>Campos</button>
                <button onClick={() => setActiveComponent('reservations')}>Ver Reservaciones</button>
                <button onClick={() => setActiveComponent('user')}>Sugerencias</button>
            </div>


            <div>
                {activeComponent === 'campos' && <Campos />}
                {activeComponent === 'reservations' && (
                    <CardReservation reservations={reservations} courts = {courts} />
                )}
                {activeComponent === 'user' && (
                    <Cards />
                )}
            </div>
         

            <NavbarLow />
        </div>
    );
}




    {/* <div className={styles.clubsContainer}>
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

    </div> */}

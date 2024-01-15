import { useEffect } from 'react';
import styles from './home.module.css';
import FriendsContainer from '../../components/friendsContainer/FriendsContainer.jsx';
import { Link } from 'react-router-dom';
import NavbarLow from '../../components/navbarLow/navbarLow';
import CardReservation from '../../components/card-reservations/CardReservation.jsx';
import { useState } from 'react';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubs, fetchCourts, fetchSports, fetchUsers, fetchReservations, fetchLocations, fetchProfiles } from '../../redux/reducer.js';

import Campos from './CamposComponent/Campos.jsx'
import NavBar from './navBar/navBar.jsx'
import Cards from './Cards/Cards.jsx'

export default function Home() {
    const dispatch = useDispatch();
    const courts = useSelector((state) => state.user.allCourts);
    const estadoFriends = useSelector((state) => state.user.allFriends);
    const userLogeado = useSelector(state =>  state.user?.datauser?.user);
    console.log(courts);

    const [activeComponent, setActiveComponent] = useState('campos');

    useEffect(() => {
        dispatch(fetchUsers());   
        dispatch(fetchClubs());
        dispatch(fetchCourts());
        dispatch(fetchLocations());
        dispatch(fetchSports());
        if(userLogeado) dispatch(fetchProfiles(userLogeado.id));

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
                <div className={styles.divButtons1}>
                    <button
                        className={styles.btnHomeNav}
                        onClick={() => setActiveComponent('campos')}
                    >
                       Campos
                    </button>
                    {activeComponent === 'campos' && <div className={styles.bloqueAmarillo}></div>}
                </div>
                <div className={styles.divButtons1}>
                    <button
                        className={styles.btnHomeNav}
                        onClick={() => setActiveComponent('Sugerencias')}
                    >
                       Sugerencias
                    </button>
                    {activeComponent === 'Sugerencias' && <div className={styles.bloqueAmarillo}></div>}
                </div>
                <div className={styles.divButtons1}>
                    <button
                        className={styles.btnHomeNav}
                        onClick={() => setActiveComponent('Reservas')}
                    >
                       Reservas
                    </button>
                    {activeComponent === 'Reservas' && <div className={styles.bloqueAmarillo}></div>}
                </div>

            </div>


            <div className = {styles.principalDiv}>
                {activeComponent === 'campos' && <Campos />}
                {activeComponent === 'reservations' && (
                    <CardReservation courts = {courts} />
                )}
                {activeComponent === 'user' && (
                    <Cards />
                )}
            </div>
         

            <NavbarLow />
        </div>
    );
}




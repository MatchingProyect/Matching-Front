import { useEffect } from 'react';
import styles from './home.module.css';
import { Link } from 'react-router-dom';
import NavbarLow from '../../components/navbarLow/navbarLow';
import CardReservation from '../../components/card-reservations/CardReservation.jsx';
import { useState } from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubs, fetchCourts, fetchSports, fetchUsers, fetchLocations, fetchProfiles, fetchFriends } from '../../redux/reducer.js';
import Campos from './CamposComponent/Campos.jsx'
import NavBar from './navBar/navBar.jsx'
import Cards from './Cards/Cards.jsx'

export default function Home() {
    const dispatch = useDispatch();
    const courts = useSelector((state) => state.user?.allCourts);
    const userLogeado = useSelector(state =>  state.user?.datauser?.user);
    const clubs = useSelector(state => state.user?.allClubs);
    const locations = useSelector((state) => state.user?.allLocations);


    const [activeComponent, setActiveComponent] = useState('campos');

    useEffect(() => {
        dispatch(fetchUsers());   
        dispatch(fetchClubs());
        dispatch(fetchCourts());
        dispatch(fetchLocations());
        dispatch(fetchSports());
        if(userLogeado) {
            dispatch(fetchProfiles(userLogeado.id));
            dispatch(fetchFriends(userLogeado.id));
        };
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


            {/* <div className={styles.friendsContainer}>
                <FriendsContainer friends={estadoFriends} />
            </div> */}

            
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
                        onClick={() => setActiveComponent('user')}
                    >
                       Sugerencias
                    </button>
                    {activeComponent === 'user' && <div className={styles.bloqueAmarillo}></div>}
                </div>
                <div className={styles.divButtons1}>
                    <button
                        className={styles.btnHomeNav}
                        onClick={() => setActiveComponent('Reservas')}
                    >
                       Mis Reservas
                    </button>
                    {activeComponent === 'Reservas' && <div className={styles.bloqueAmarillo}></div>}
                </div>

            </div>


                {activeComponent === 'campos' && 
                <div className = {styles.principalDiv}>
                <Campos courts = {courts} locations = {locations} clubs = {clubs} />
                </div>
                }
                {activeComponent === 'Reservas' && (
                    <div className = {styles.principalDiv3}>
                    <CardReservation courts = {courts} />
                    </div>
                )}
                {activeComponent === 'user' && (
                    <div className = {styles.principalDiv2}>
                    <Cards />
                    </div>
                )}
            
            {/* <div className = {styles.copyDiv}>
            <label className = {styles.copyright}>© Matching 2024</label>
            </div> */}
            <NavbarLow />
        </div>
    );
}




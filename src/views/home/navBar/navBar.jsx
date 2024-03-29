import styles from './navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import { useDispatch } from 'react-redux';

import {  logout } from '../../../redux/reducer.js';

export default function NavBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const desloguearte = () => {
        dispatch(logout())
        localStorage.removeItem('userData');
        navigate('/login')
     };

    return (
            
        <div className={styles.header}>
            <h1 className={styles.title}>matching</h1>
            <div className = {styles.navBarFunctions}>
                <Link to='/solicitudes'>
                    <div  className={styles.btnIconButton}>
                        <NotificationsNoneIcon  className={styles.btnIcon} />
                    </div>                                             
                </Link>

                <Link to='/partidosPublicos'>
                    <div className={styles.btnIconButton}>
                    <SportsBasketballIcon  className={styles.btnIcon} />
                    </div></Link>
                <button className={styles.btnLogOut} onClick={()=>desloguearte()}>
                    <div  className={styles.btnIconButton}>
                        <LogoutIcon  className={styles.btnIcon} />
                    </div> 
                </button>
            </div>
        </div>

    );
}




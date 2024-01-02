import styles from './navbarLow.module.css';
import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useLocation, Link } from 'react-router-dom';


export default function NavbarLow(){
    const location = useLocation();
    return (
        <div className={styles.containerNavbar}>
            <Link to='/home'>
            <div className={`${styles.icon} ${location.pathname === '/home' ? styles.activeLink : ''}`}>
                <HomeIcon />
            </div>
            </Link>
            <Link to='/help'>
            <div className={`${styles.icon} ${location.pathname === '/help' ? styles.activeLink : ''}`}>
                <QuestionMarkIcon />
            </div>
            </Link>
            <Link to='/profile'>
            <div className={`${styles.icon} ${location.pathname === '/profile' ? styles.activeLink : ''}`}>
                <PersonOutlineIcon />
            </div>
            </Link>
      </div>
    )
} 
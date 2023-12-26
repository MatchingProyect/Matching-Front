import styles from './navbarLow.module.css';

import { Link } from 'react-router-dom';

export default function NavbarLow(){


    return(
        <div className={styles.containerNavbar}>
           
           <Link to='/home'>
                    <div className={styles.icon}>
                        <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702574873/home_wneso4.svg" alt="icono" />
                    </div>
            </Link>
            <Link to='/help'>
                <div className={styles.icon}>
                    <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702574901/help_okgljh.svg" alt="icono" />
                </div>
            </Link>
            <Link to='/profile'>
                <div className={styles.icon}>
                    <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702574922/iconamoon_profile-bold_br6wy2.svg" alt="icono" />
                </div>
            </Link>
            

        </div>
    )
} 
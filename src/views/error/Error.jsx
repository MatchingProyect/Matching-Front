import React from 'react';
import styles from './Error.module.css';
import NavbarLow from '../../components/navbarLow/navbarLow';
import { Link } from 'react-router-dom';

export default function Error() {
    const imageFor404 = 'https://res.cloudinary.com/dbffmtz0y/image/upload/v1703626173/Stan-Marsh_y1t4z7.png';
    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.pageTitle}>Oops!</h1>
            <div className={styles.imageDiv}>
                    <img src={imageFor404} alt='SouthParkN404otFound' className={styles.image} />
                </div>
            <div className={styles.pageInfo}>                
                <h1 className={styles.pageTitle2}>404</h1>
                <h3 className={styles.pageSubTitle}>Página no encontrada</h3>
                <p className={styles.pageText}>Lo sentimos, pero la página que estás buscando no existe en nuestro sitio. Puede deberse a un enlace incorrecto, una página eliminada o un error tipográfico. Si crees que esto es un error del sitio, por favor, ponte en contacto con nuestro equipo de soporte técnico. Lamentamos cualquier inconveniente.</p>
                <div className={styles.buttons}>
                    <Link to='/home'><button className={styles.homeBtn}>Home</button></Link>
                    <Link to='/help'><button className={styles.helpBtn}>Contáctanos</button></Link>
                </div>
            </div>
            <NavbarLow />
        </div>
    )
}
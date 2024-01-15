import React, { useEffect, useState } from 'react'
import NavbarLow from '../../components/navbarLow/navbarLow';
import styles from './ClubsDetail.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ClubsDetail = () => {
    const [clubsDetail, setClubsDetail] = useState([])
    const { id } = useParams();
    const clubs = useSelector((state) => state.user?.allClubs);
    const locations = useSelector((state) => state.user?.allLocations);

    useEffect(() => {
        if (clubs) {
            let result = clubs.find((element) => element.id == id);
            setClubsDetail(result);
        }
    }, []);

    console.log(clubsDetail);

    const laLocation = function () {
        let laClub = clubs.find((element) => element.id == id);
        let neededLocation = locations.find((element) => element.id == laClub.LocationId);
        return neededLocation.name;
    };


    return (
        <div className={styles.holeDetailComp}>
            <div className={styles.viewHeader}>
                <Link to='/home'><button className={styles.backBtn}>Back</button></Link>
            </div>
            <div className={styles.clubProfile}>
                <div className={styles.imagenDiv}>
                    <img src={clubsDetail.imgClub} alt={clubsDetail.name} className = {styles.imagen} />
                </div>
                <div className={styles.clubPrincipalInfo}>
                    <h1 className={styles.principalName}>{clubsDetail.name}</h1>
                    <h2 className={styles.principalText}>{laLocation()}</h2>
                    <h2 className={styles.principalText}>{clubsDetail.estado ? "🟢Habilitado" : "⚫Deshabilitado"}</h2>
                </div>
                <div className={styles.clubSecondaryInfo}>
                    <div className={styles.containerInfo}>
                        <h4 className={styles.text}>Parrillas</h4>
                        <h4 className={styles.text}>{clubsDetail.grills}</h4>
                    </div>
                    <div className={styles.containerInfo}>
                        <h4 className={styles.text}>Parking</h4>
                        <h4 className={styles.text}>{clubsDetail.parking}</h4>
                    </div>
                    <div className={styles.containerInfo}>
                        <h4 className={styles.text}>Seguridad</h4>
                        <h4 className={styles.text}>{clubsDetail.security}</h4>
                    </div>
                    <div className={styles.containerInfo}>
                        <h4 className={styles.text}>Duchas</h4>
                        <h4 className={styles.text}>{clubsDetail.showers}</h4>
                    </div>
                </div>
            </div>
            <NavbarLow />
        </div>

    );
};

export default ClubsDetail
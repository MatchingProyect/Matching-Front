import styles from './profile.module.css';
import FriendsContainer from '../../components/friendsContainer/FriendsContainer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function MiPerfil() {

    const userProfile = useSelector((state) => state.user.datauser?.user);
    const estadoFriends = useSelector((state) => state.user.allFriends);

    return(
        <div className = {styles.divProfile}>
            <div className = {styles.divOneProfile}>
                <img src = {userProfile?.avatarImg} alt = {userProfile?.displayName} className = {styles.profileImg}/>
                <h1 className = {styles.name}>{userProfile?.displayName}</h1>
                <h3 className = {styles.description}>{userProfile?.description}</h3>
            </div>

            <div className={styles.friendsContainer}>
                <FriendsContainer friends={estadoFriends} />
            </div>

            <div className = {styles.divThreeProfile}>
                <div className = {styles.divContainer}>
                    <Link to = {`/profile/edit/${userProfile?.id}`}><p className = {styles.linksTo}>Editar</p></Link>
                    <div className = {styles.info}>
                        <p className = {styles.dato}>{userProfile?.displayName}</p>
                        <p className = {styles.nombreDelDato}>Nombre y Apellido</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.dato}>{userProfile?.gender}</p>
                        <p className = {styles.nombreDelDato}>Genero</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.dato}>{userProfile?.dayBirth}</p>
                        <p className = {styles.nombreDelDato}>Fecha de Nacimiento</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.dato}>{userProfile?.email}</p>
                        <p className = {styles.nombreDelDato}>Correo Electronico</p>
                    </div>
                    <div className = {styles.info}>
                        <p className = {styles.dato}>{userProfile?.phone}</p>
                        <p className = {styles.nombreDelDato}>Numero</p>
                    </div>
                </div>
            </div>
    </div>
    )
}


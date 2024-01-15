import styles from './Cards.module.css';
import { useSelector } from 'react-redux';
import CardUser from '../../cardUsers/CardUser';

export default function Cards() {
    const users = useSelector((state) => state.user.allUsers);
    const userLogeado = useSelector(state =>  state.user?.datauser?.user);

    return (
            
        <div className = {styles.cardsContainer}>
            <div className = {styles.cardsGrid}>
                {users?.filter(user => user.estado === true && user.id !== userLogeado?.id)
                    .map(filteredUser => (
                        <CardUser key={filteredUser.id} user={filteredUser} />
                    ))
                }
            </div>
        </div>

    );
}




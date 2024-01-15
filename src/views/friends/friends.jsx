import  { useState } from 'react';
import styles from './friends.module.css';
import { Link } from 'react-router-dom';

import CardsFriends from '../../components/cards-friends/cards-friends.component';
import NavbarLow from '../../components/navbarLow/navbarLow';
import OptionsFriends from '../../components/optionsFriends/optionsFriends';
import { useSelector } from 'react-redux';


export default function Friends(){

    const friends = useSelector((state) => state.user?.allFriends);



    const [name, setName] = useState('');
    const [showOptions, setShowOptions] = useState(false); 

    const handleCardClick = (friendName) => {
        setName(friendName);
        setShowOptions(true); 
      };

      
    const handleSubmit = (event) => {
        event.preventDefault();
        // onSearch(name);
      };


      const handleChange = (event) => {
        setName(event.target.value);
        console.log(event.target.value);
        if (event.target.value === '') {
        //   onSearch(null); 
        }
      };

    return(
        <div className={styles.containerFriends}>
            <div className={styles.containerTitle}>
                <div className={styles.containerTitleImg}>
                    <Link to = '/home'><img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702573291/return_w8ycd2.svg" alt="Return" /></Link>
                </div>
                <div className={styles.containerTitleText}>
                    <p>Amigos</p>
                </div>
            </div>

            <div  className={styles.searchBar}>
                <form onSubmit={handleSubmit}>
                    <button type='button' onClick={handleSubmit}>
                        <img src={ "https://res.cloudinary.com/dbffmtz0y/image/upload/v1702507247/icono-search_qd0ndi.svg" } alt="Search" />
                    </button>
                    <input className={styles.searchInput} type="text" placeholder='Buscar por nombre o correo' value={name} onChange={handleChange} />
                </form>
            </div>


            <div className={styles.filterFriends}>
                <div><p>{friends.length} amigos.</p></div>
                <div><p>Ordenar</p></div>
            </div>


            <CardsFriends friends ={friends} onCardClick={handleCardClick}></CardsFriends>

            <div className={styles.shareFriends}>
                <Link to='/'>
                    <div className={styles.flexContainer}>
                        <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702508016/ic_baseline-share_pzgv1u.svg" alt="Compartir" />
                        <p>Invitar Amigos</p>
                    </div>
                </Link>
            </div>

            <NavbarLow></NavbarLow>

            {showOptions && <OptionsFriends name={name} setShowOptions={setShowOptions} showOptions={showOptions}/>}
        </div>
    )
} 
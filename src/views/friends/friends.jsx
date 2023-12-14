import  { useState } from 'react';
import CardsFriends from '../../components/cards-friends/cards-friends.component';
import styles from './friends.module.css';

import { Link } from 'react-router-dom';

export default function Friends(){

    const friends = [
        {
            name: "John",
            games: 10
        },
        {
            name: "Adam",
            games: 8
        },
        {
            name: "Peter",
            games: 3
        },
        {
            name: "Diego",
            games: 3
        },
        {
            name: "Daniel",
            games: 0
        },
        {
            name: "Daniel",
            games: 0
        },
        {
            name: "Diego",
            games: 3
        },
      ]

    const [name, setName] = useState('');


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
                    <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702573291/return_w8ycd2.svg" alt="Return" />
                </div>
                <div className={styles.containerTitleText}>
                    <h2>Amigos</h2>
                </div>
            </div>

            <div  className={styles.searchBar}>
                <form onSubmit={handleSubmit}>
                    <button type='button' onClick={handleSubmit}>
                        <img src={ "https://res.cloudinary.com/dbffmtz0y/image/upload/v1702507247/icono-search_qd0ndi.svg" } alt="Search" />
                    </button>
                    <input type="text" placeholder='Buscar por nombre o correo' value={name} onChange={handleChange} />
                </form>
            </div>


            <div className={styles.filterFriends}>
                <div><p>{friends.length} amigos.</p></div>
                <div><p>Ordenar</p></div>
            </div>


            <CardsFriends friends ={friends}></CardsFriends>

            <div className={styles.shareFriends}>
                <Link to='/'>
                    <div className={styles.flexContainer}>
                        <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702508016/ic_baseline-share_pzgv1u.svg" alt="Compartir" />
                        <p>Invitar Amigos</p>
                    </div>
                </Link>
            </div>



        </div>
    )
} 
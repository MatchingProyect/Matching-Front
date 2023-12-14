// import React from 'react';
import styles from './friendsContainer.module.css';
import { Link } from 'react-router-dom';


export default function FriendsContainer(props){

    const friends = [
        {
            image: 'https://i.imgur.com/AzTVKKt.png',
            isAvailable: true
        },
        {
            image: 'https://i.imgur.com/CbpwPx8.png',
            isAvailable: false
        },
        {
            image: 'https://i.imgur.com/TgLh7Es.png',
            isAvailable: false
        }
    ]

    function estadoAvailable(isAvailable){
        if (isAvailable == true){
            return (
                <h1>🟢</h1>
            )
        } else if (isAvailable == false){
            return;
        }
    };

    return(
        <div className = {styles.friendsContainer}>
            <div className = {styles.infoGeneral}>
                <h3>Amigos: {friends.length}</h3>
                <Link to = '/amigos'> <button>Ver Todos</button> </Link>
            </div>
            <div className = {styles.friendsImages}>
                {friends.map((element) => 
                <div className = {styles.friend}>
                    <img src = {element.image} alt = {element.name}/>
                    {estadoAvailable(friends.isAvailable)}
                </div>
                )}
            </div>
        </div>
    )
}
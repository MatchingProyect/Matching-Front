import React from 'react';
import styles from './friendsContainer.module.css';
import { Link } from 'react-router-dom';


export default function FriendsContainer(props){
    //Info hardcodeada que traeria la llamada al back
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
            isAvailable: true
        },
        {
            image: 'https://i.imgur.com/TgLh7Es.png',
            isAvailable: true
        }
    ];

    function estadoAvailable(isAvailable){
        if (isAvailable == true){
            return (
                <h1 className = {styles.status}>🟢</h1>
            )
        } else if (isAvailable == false){
            return(
                <h1 className = {styles.status}></h1>
            )
        }
    };

    return(
        <div className = {styles.friendsContainer}>
            <div className = {styles.infoGeneral}>
                <p className = {styles.text1}>Amigos: {friends.length}</p>
                <Link to = '/friends'> <a>Ver Todos</a> </Link>
            </div>
            <div className = {styles.friendsImages}>
                {friends.map((element) => 
                <div className = {styles.friend} key = {element.name}>
                    <img className = {styles.friendImg} src = {element.image} alt = {element.name} key = {element.name}/>
                    {estadoAvailable(element.isAvailable)}
                </div>
                )}
            </div>
        </div>
    )
}
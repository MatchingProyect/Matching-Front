import React from 'react';
import styles from './FriendsContainer.module.css';
import { Link } from 'react-router-dom';


export default function FriendsContainer({friends}){

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
                <Link to = '/friends'> <a className = {styles.verTodos}>Ver Todos</a> </Link>
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
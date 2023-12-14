// import React from 'react';
import styles from './friendsContainer.module.css';
import { Link } from 'react-router-dom';

export default function FriendsContainer(){
    //Entendiendo que friends es un array de objetos (podria ser todos los users menos el usuario que inicio sesion).
    // const { friends } = props;

    // function estadoAvailable(isAvailable){
    //     if (isAvailable == true){
    //         return (
    //             <h3>🟢</h3>
    //         )
    //     } else if (isAvailable == false){
    //         return;
    //     }
    // };

    //En amigos conectados, seria friends.length pero de colocarlo asi suelta, igualmente en el map paraa los amigos

    return(
        <div className = {styles.friendsContainer}>
            <div className = {styles.infoGeneral}>
                <h3>Amigos Conectados: 21</h3>
                <Link to = '/amigos'> <button>Ver Todos</button> </Link>
            </div>
            <div className = {styles.friendsImages}>
                {/* {friends.map((element) => 
                <div className = {styles.friend}>
                    <img src = {element.image} alt = {element.name}/>
                    {estadoAvailable(friends.isAvailable)}
                </div>
                )} */}
            </div>
        </div>
    )
}
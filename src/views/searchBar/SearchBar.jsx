import axios from 'axios';
import styles from './SearchBar.module.css';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//funcion para buscar usuarios por nombre

const SearchBar = ({users}) => {
    const [userName, setUserName] = useState('')
    const [userNotFound, setUserNotFound] = useState(false)
    const navigate = useNavigate();
    let userByFound = [];


    const searchByCoincidence = async (event) => {
        try {
            const userBySearch = event.target.value.trim().toLowerCase();
            setUserName(userBySearch);
    
    
            if (userBySearch === "") userByFound = users;
            else {
                userByFound = users.filter((user) => {
                    return user.name.toLowerCase().startsWith(userBySearch);
                })
                if(!userByFound.length) setUserNotFound(true);
                else setUserNotFound(false);
            }

            const endpoint = `/users?name=${userByFound}`;
            console.log(userByFound)
            return endpoint;
            
            //users de dataBase
            // const endpoint = `/users?name=${userByFound[0].id}`;
            // const {data} = await axios(endpoint);
            // console.log(userByFound[0].id)
            // console.log(data)
            // if(data.status) return data;
        
    } catch (error) {
        throw error.message
    }
}

const handleClickSearch = async(name) => {
    name.toLowerCase();
    try {
        const {data} = axios(`/users?name=${name}`);
    } catch (error) {
        
    }
}

// const handleSearch = async(name) => {
//     name.toLowerCase();
//     try {
//         const endpoint = `/users?name=${name.id}`;
//         console.log(userByFound)
//             const {data} = await axios(endpoint);
//             if(data.status)
//             navigate(`/user/${data}`);
//             return data;
//         } catch (error) {
//             throw error.message;
//         }
//     }

  return (
    <div className={styles.searchBar}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search User by Name"
          onChange={searchByCoincidence}
          value={userName}
        />
        <button className={styles.buscarBtn}>Buscar</button>
    </div>
  )
}

export default SearchBar
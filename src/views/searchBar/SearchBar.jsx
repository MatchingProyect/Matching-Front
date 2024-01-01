import axios from 'axios';
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
            
            const endpoint = `/users?name=${userByFound[0].id}`;
            const {data} = await axios(endpoint);
            console.log(userByFound[0].id)
            console.log(data)
            if(data.status) return data;
        
    } catch (error) {
        throw error.message
    }
}

const handleSearch = async(name) => {
    name.toLowerCase();
    try {
        const endpoint = `/users?name=${name.id}`;
        console.log(userByFound)
            const {data} = await axios(endpoint);
            if(data.status)
            navigate(`/user/${data}`);
            return data;
        } catch (error) {
            throw error.message;
        }
    }

  return (
    <div>
        <input
          onChange={searchByCoincidence}
          value={userName}
          type="search"
          placeholder="Search User by Name"
        />
        <button onClick={() => handleSearch(userName)}>Search</button>
    </div>
  )
}

export default SearchBar
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

//funcion para buscar usuarios por nombre

const SearchBar = ({users}) => {
    const [userName, setUserName] = useState('')
    const [userNotFound, setUserNotFound] = useState(false)


    const searchByCoincidence = async (event) => {
        try {
            const userBySearch = event.target.value.trim().toLowerCase();
            setUserName(userBySearch);
    
            let userByFound = [];
    
            if (userBySearch === "") userByFound = users;
            else {
                userByFound = users.filter((user) => {
                    return user.name.toLowerCase().startsWith(userBySearch);
                })
                if(!userByFound.length) setUserNotFound(true);
                else setUserNotFound(false);
            }
            //dispatch(searchUserByName(userByFound));
            const endpoint = `/users?name=${userName}`
            const response = axios(endpoint)
            if(response.status) return response
            
        } catch (error) {
            throw error.message
        }

    }

  return (
    <div>
        <input
          onChange={searchByCoincidence}
          value={value}
          type="search"
          placeholder="Search User by Name"
        />
        <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar
import axios from 'axios';
import styles from './SearchBar.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ users, onSearchResult }) => {
  const [userName, setUserName] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const navigate = useNavigate();

  const searchByCoincidence = (event) => {
    const userBySearch = event.target.value;
    setUserName(userBySearch);

    if (userBySearch === '') setUserNotFound(false);
  };

  const handleClickSearch = () => {
      const userBySearch = userName.toLowerCase();
      const userByFound = users.filter((user) =>
        user.name.toLowerCase().startsWith(userBySearch)
      );

      if (!userByFound.length) {
        setUserNotFound(true);
      } else {
        setUserNotFound(false);
        
        console.log('Usuarios encontrados:', userByFound);

        if(onSearchResult) onSearchResult(userByFound);

      }
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search User by Name"
        onChange={searchByCoincidence}
        value={userName}
      />
      <button className={styles.buscarBtn} onClick={handleClickSearch}>
        Buscar
      </button>
      {userNotFound && (
        <p className={styles.errorText}>No se encontraron usuarios.</p>
      )}
    </div>
  );
};

export default SearchBar;

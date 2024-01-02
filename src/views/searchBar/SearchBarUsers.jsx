import axios from 'axios';
import styles from './SearchBarUsers.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardUser from '../cardUsers/CardUser';
import { element } from 'prop-types';

const SearchBarUsers = () => {
  const [actualPageUsers, setActualPageUsers] = useState(1);
  const usuarios = [
    {
      name: "John Smith",
      description: "Apasionado por el deporte en Argentina, disfruta del pádel y el fútbol.",
      pais: "Argentina",
      deportes: ["padel", "futbol"]
    },
    {
      name: "Maria Garcia",
      description: "Fanática del baloncesto en España, practica baloncesto y atletismo con gran entusiasmo.",
      pais: "España",
      deportes: ["baloncesto", "atletismo"]
    },
    {
      name: "Carlos Rodriguez",
      description: "Amante del tennis en México, su pasión incluye el tennis y la natación.",
      pais: "México",
      deportes: ["tennis", "natación"]
    },
    {
      name: "Laura Perez",
      description: "Entusiasta del ciclismo en Colombia, encuentra alegría en el ciclismo y el yoga.",
      pais: "Colombia",
      deportes: ["ciclismo", "yoga"]
    },
    {
      name: "Elena Torres",
      description: "Aficionada al surf en España, disfruta de las olas y practica yoga para mantenerse en forma.",
      pais: "España",
      deportes: ["surf", "yoga"]
    },
    {
      name: "Ricardo Navarro",
      description: "Entrenador de fútbol en Argentina, apasionado por desarrollar habilidades en jóvenes futbolistas.",
      pais: "Argentina",
      deportes: ["fútbol", "entrenamiento"]
    },
    {
      name: "Isabel Jimenez",
      description: "Amante del senderismo en México, encuentra paz y aventura explorando la naturaleza.",
      pais: "México",
      deportes: ["senderismo", "camping"]
    },
    {
      name: "Diego Herrera",
      description: "Entusiasta del fitness en Colombia, combina entrenamientos intensos con una dieta equilibrada.",
      pais: "Colombia",
      deportes: ["fitness", "nutrición"]
    }
  ];
  const [usersToFilter, setUsersToFilter] = useState(usuarios);
  const [userInput, setUserInput] = useState('');
  const handlePaginateUsers = (newPage) => {
    if (newPage > 0) setActualPageUsers(newPage);
  }
  const usersPerPage = 3;
  const startUsers = (actualPageUsers - 1) * usersPerPage;
  const endUsers = startUsers + usersPerPage;
  const usersToDisplay = usersToFilter.slice(startUsers, endUsers);


  const searchByCoincidence = function (event) {
    let value = event.target.value;
    setUserInput(value);
  }

  const handleClickSearch = function () {
    let userLower = userInput.toLowerCase();
    let usersFiltereds = usuarios.filter((element) => element.name.toLowerCase() == userLower);
    setUsersToFilter(usersFiltereds);
  };

  const resetFriends = function () {
    setUsersToFilter(usuarios);
  };


  // const [userName, setUserName] = useState('');
  // const [userNotFound, setUserNotFound] = useState(false);
  // const navigate = useNavigate();

  // const searchByCoincidence = (event) => {
  //   const userBySearch = event.target.value;
  //   setUserName(userBySearch);
  //   if (userBySearch === '') setUserNotFound(false);
  // };

  // const handleClickSearch = () => {
  //     const userBySearch = userName.toLowerCase();
  //     const userByFound = users.filter((user) =>
  //       user.name.toLowerCase().startsWith(userBySearch)
  //     );

  //     if (!userByFound.length) {
  //       setUserNotFound(true);
  //     } else {
  //       setUserNotFound(false);

  //       console.log('Usuarios encontrados:', userByFound);

  //       if(onSearchResult) onSearchResult(userByFound);

  //     }
  // };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search User by Name"
        onChange={searchByCoincidence}
        value={usuarios.name}
      />
      <button className={styles.buscarBtn} onClick={handleClickSearch}>
        Buscar
      </button>
      <button onClick={resetFriends}>💫</button>
      {/* {userNotFound && (
        <p className={styles.errorText}>No se encontraron usuarios.</p>
      )} */}
      <div>
        {/* usersToFilter */}
        {usersToDisplay?.map((user) => (
          <CardUser key={user.name} user={user} />
        ))}
      </div>
      <div>
        <button onClick={() => handlePaginateUsers(actualPageUsers - 1)} disabled={actualPageUsers === 1}>Anterior</button>
        <button onClick={() => handlePaginateUsers(actualPageUsers + 1)} disabled={actualPageUsers.length === 0}>Siguiente</button>
      </div>
    </div>
  );
};

export default SearchBarUsers;

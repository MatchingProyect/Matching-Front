import axios from 'axios';
import styles from './PartidosPublicos.module.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarLow from '../../components/navbarLow/navbarLow';
import { useSelector } from 'react-redux';
import CardPublicMatch from '../../components/card-publicMatch/CardPublicMatch';

const PartidosPublicos = () => {
  const [partidoPublico, setParticoPublico] = useState([]);
  const userLogeado = useSelector(state =>  state.user?.datauser?.user);
  const courts = useSelector((state) => state.user?.allCourts);
  const locations = useSelector((state) => state.user?.allLocations);
  const clubs = useSelector((state) => state.user?.allClubs);
  const sports = useSelector ((state)=> state.user?.allSports);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoCancha = await axios('/reservaByMatchType/d81fe1b8-345a-4b4c-97b9-6e64b1116aec');
        setParticoPublico(infoCancha.data.matchType);

      } catch (error) {
        console.error('Error al obtener información de las canchas:', error);
        Alert(error.message);
      }
    };
    fetchData();
  }, []);

  const unirmeReserva = async(TeamMatchId)=>{
    try {
        const {data} = await axios.post(`/addUserInTeam?UserId=${userLogeado.id}&TeamMatchId=${TeamMatchId}`)
        if(data.status) alert('te uniste con exito')
    } catch (error) {
        throw error.message
    };
  };

  return (
    <div className = {styles.holeComp}>
      <div className = {styles.viewHeader}>
       <Link to = '/home'><label className = {styles.backBtn}>Back</label></Link>
      <h1 className = {styles.viewTitle}>Partidas Públicas</h1>
      </div>
      <div className = {styles.reservasDiv}>
      {partidoPublico.length === 0 ? (
        <p>No hay partidos públicos disponibles.</p>
      ) : 
       partidoPublico.map((element) => <CardPublicMatch unirmeReserva = {unirmeReserva} partidoPublico = {element} courts = {courts} locations = {locations} clubs = {clubs} sports = {sports} key = {element.id}/>)

      }
      </div>
      <NavbarLow />
    </div>
  ); 
};

export default PartidosPublicos;

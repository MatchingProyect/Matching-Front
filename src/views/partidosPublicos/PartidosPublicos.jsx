import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavbarLow from '../../components/navbarLow/navbarLow';
import { useSelector } from 'react-redux';

const PartidosPublicos = () => {
  const [partidoPublico, setParticoPublico] = useState([]);
  const [canchaEncontrada, setCanchaEncontrada] = useState([])

  const userLogeado = useSelector(state =>  state.user?.datauser?.user);

  console.log('aa', partidoPublico)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoCancha = await axios('/reservaByMatchType/d81fe1b8-345a-4b4c-97b9-6e64b1116aec');
        console.log(infoCancha.data.matchType)
        if (infoCancha.data.status) {
          infoCancha?.data.matchType?.map(async(cancha) => {
            console.log(cancha.CourtId)
            const canchaFound = await axios(`/courts/${cancha?.CourtId}`)
            console.log('bbcita',canchaFound)
            if(canchaFound) setCanchaEncontrada(canchaFound.courtFound)
          })
          setParticoPublico(infoCancha.data.matchType);
        }
      } catch (error) {
        console.error('Error al obtener información de las canchas:', error);
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
    }
  }
 
  

  return (
    <div>
      {partidoPublico.length === 0 ? (
        <p>No hay partidos públicos disponibles.</p>
      ) : (
        partidoPublico.map((partido) => {
          
          const canchaFiltrada = canchaEncontrada?.filter(info => info.id === partido.CourtId);
  
          return (
            <div key={partido.id}>
              <h2>Inicio: {partido.dateTimeStart}</h2>
              <h2>Final: {partido.dateTimeEnd}</h2>
              <p>Precio: {partido.totalCost}</p>
              {canchaFiltrada?.length > 0 && <p>Cancha: {canchaFiltrada[0].nombre}</p>}
              <button onClick={()=> unirmeReserva(partido.TeamMatchId)}>unirme</button>
            </div>
          );
        })
      )}
      <NavbarLow />
    </div>
  );
  
};

export default PartidosPublicos;

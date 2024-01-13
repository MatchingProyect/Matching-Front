import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PartidosPublicos = () => {
  const [partidoPublico, setParticoPublico] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoCancha = await axios.get('/reservaByMatchType/d81fe1b8-345a-4b4c-97b9-6e64b1116aec');

        if (infoCancha.data && infoCancha.data.matchType) {
          setParticoPublico(infoCancha.data.matchType);
        }
      } catch (error) {
        console.error('Error al obtener información de las canchas:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {partidoPublico?.map((partido) => (
        <div key={partido.id}>
          <h2>Inicio: {partido.dateTimeStart}</h2>
          <h2>Final: {partido.dateTimeEnd}</h2>
          <p>Precio: {partido.totalCost}</p>
          {partido.CourtId ? <p>Cancha: {partido.CourtId}</p> : null}
        </div>
      ))}
    </div>
  );
};

export default PartidosPublicos;

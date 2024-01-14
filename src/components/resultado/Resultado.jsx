import React, { useState } from 'react';

const Resultado = ({ teamMatch, resultado, setResultado }) => {
  if (!resultado) return null;

  const [resultados, setResultados] = useState({
    name: '',
    firstSet: '',
    secondSet: '',
    thirdSet: '',
  });

  const postResultados = async ( resultados) => {
    try {
      const { data } = await axios.post(`/resultadoMarcador/${teamMatch}`, resultados);
      if (data.status) {
        setResultado(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      throw Error(error.message);
    }
  };

  const handleSubmit = async (event, resultados) => {
    event.preventDefault();
    await postResultados( resultados);
  };

  return (
    <div>
      <h2>Resultado del partido:</h2>
      <form onSubmit={(event) => handleSubmit(event,  resultados)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={resultados.name}
            onChange={(event) => setResultados({ ...resultados, name: event.target.value })}
          />
        </div>
        <div>
          <label htmlFor="firstSet">First Set:</label>
          <input
            type="text"
            id="firstSet"
            name="firstSet"
            value={resultados.firstSet}
            onChange={(event) => setResultados({ ...resultados, firstSet: event.target.value })}
          />
        </div>
        <div>
          <label htmlFor="secondSet">Second Set:</label>
          <input
            type="text"
            id="secondSet"
            name="secondSet"
            value={resultados.secondSet}
            onChange={(event) => setResultados({ ...resultados, secondSet: event.target.value })}
          />
        </div>
        <div>
          <label htmlFor="thirdSet">Third Set:</label>
          <input
            type="text"
            id="thirdSet"
            name="thirdSet"
            value={resultados.thirdSet}
            onChange={(event) => setResultados({ ...resultados, thirdSet: event.target.value })}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Resultado;

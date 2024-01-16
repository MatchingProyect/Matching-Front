import axios from 'axios';
import ValorarUsuarios from '../valorarUsuarios/ValorarUsuarios';
import styles from './resultado.module.css';
import React, { useState } from 'react';

const Resultado = ({ teamMatch, resultado, setResultado, setValorarUsuarios }) => {

console.log(resultado)
  if (!resultado) return null;

  const [resultados, setResultados] = useState({
    name: 'gane/perdi',
    firstSet: '',
    secondSet: '',
    thirdSet: '',
  });

  console.log('aa',teamMatch)

  console.log(resultados)

  

  const postResultados = async (resultados) => {
    resultados.firstSet = Number(resultados.firstSet);
    resultados.secondSet = Number(resultados.secondSet);
    resultados.thirdSet = Number(resultados.thirdSet);
    try {
      const { data } = await axios.post(`/resultadoMarcador/${teamMatch}`, resultados);
      if (data) {
        setValorarUsuarios(true);
        setResultado(false)

      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message)
      throw Error(error.message);
    }
  };

  const handleSubmit = async (event, resultados) => {
    event.preventDefault();
    await postResultados(resultados);
  };

  return (
    <div className={styles.formBackground}>
      <div className={styles.formContent}>
        <button onClick={()=>setResultado(false)}>x</button>
        <h2>Resultado del partido:</h2>
        <form onSubmit={(event) => handleSubmit(event, resultados)}>
          <div>
            <label htmlFor="name" className={styles.formLabel}>
              Resultado:
            </label>
            <select
              id="name"
              name="name"
              value={resultados.name}
              onChange={(event) =>
                setResultados({ ...resultados, name: event.target.value })
              }
              className={styles.formInput}
            >
              <option value="gane/perdi">Gane/Perdi</option>
              <option value="gane">Gane</option>
              <option value="perdi">Perdi</option>
            </select>
          </div>
          <div>
            <label htmlFor="firstSet" className={styles.formLabel}>
              First Set:
            </label>
            <input
              type="text"
              id="firstSet"
              name="firstSet"
              value={resultados.firstSet}
              onChange={(event) =>
                setResultados({ ...resultados, firstSet: event.target.value })
              }
              className={styles.formInput}
            />
          </div>
          <div>
            <label htmlFor="secondSet" className={styles.formLabel}>
              Second Set:
            </label>
            <input
              type="text"
              id="secondSet"
              name="secondSet"
              value={resultados.secondSet}
              onChange={(event) =>
                setResultados({ ...resultados, secondSet: event.target.value })
              }
              className={styles.formInput}
            />
          </div>
          <div>
            <label htmlFor="thirdSet" className={styles.formLabel}>
              Third Set:
            </label>
            <input
              type="text"
              id="thirdSet"
              name="thirdSet"
              value={resultados.thirdSet}
              onChange={(event) =>
                setResultados({ ...resultados, thirdSet: event.target.value })
              }
              className={styles.formInput}
            />
          </div>
          <button type="submit" className={styles.formButton}>
            Enviar
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Resultado;

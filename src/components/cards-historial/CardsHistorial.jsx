import List from '@mui/material/List';
import CardHistorial from '../card-historial/CardHistorial';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import styles from './CardsHistorial.module.css';

export default function CardsHistorial({historial}) {
  
  return (
    <div className={styles.containerCards}>
      <List sx={{ width: '100%', padding: '0px' }}>
          <div className={styles.columnTitles}>
            <Typography variant="subtitle1" className={styles.column}>Fecha hs.</Typography>
            <Typography variant="subtitle1" className={styles.column}>Club</Typography>
            <Typography variant="subtitle1" className={styles.column}>Equipo</Typography>
            <Typography variant="subtitle1" className={styles.column}>Resultados</Typography>
            <Typography variant="subtitle1" className={styles.column}>Más</Typography>

          </div>
          {historial?.map((game, index) => (
            <CardHistorial key={game.name} game={game} index={index}></CardHistorial>
          ))}
      </List>
    </div>
  );
}

CardsHistorial.propTypes = {
  historial: PropTypes.arrayOf(
    PropTypes.shape({
      fecha: PropTypes.string.isRequired,
      hora: PropTypes.number.isRequired,
      equipo: PropTypes.arrayOf(PropTypes.string).isRequired,
      resultado: PropTypes.arrayOf(PropTypes.string).isRequired,
      club: PropTypes.number.isRequired,

    })
  ).isRequired,
};
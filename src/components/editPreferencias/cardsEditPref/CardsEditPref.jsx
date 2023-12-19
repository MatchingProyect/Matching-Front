import List from '@mui/material/List';
import PropTypes from 'prop-types';
import CardEditPref from '../cardEditPref/CardEditPref'
import styles from './CardsEditPref.module.css'

export default function CardsEditPref({preferencias}) {
  
  return (
    <div className={styles.containerEditPref}>
      <List sx={{ width: '100%', bgcolor: 'none' }}>
          {
          preferencias?.map((preferencia ) => (
            <CardEditPref key={preferencia.name} preferencia={preferencia} 
            ></CardEditPref>
          ))}
      </List>
    </div>
  );
}

CardsEditPref.propTypes = {
    preferencias: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.number.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,

    })
  ).isRequired,
};
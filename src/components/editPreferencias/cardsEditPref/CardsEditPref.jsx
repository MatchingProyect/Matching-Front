import List from '@mui/material/List';
import PropTypes from 'prop-types';
import CardEditPref from '../cardEditPref/CardEditPref'

export default function CardsEditPref({preferencias}) {
  
  return (
    <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'none' }}>
        {
        preferencias?.map((preferencia ) => (
          <CardEditPref key={preferencia.name} preferencia={preferencia} 
          ></CardEditPref>
        ))}
    </List>
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
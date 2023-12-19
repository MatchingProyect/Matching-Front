import List from '@mui/material/List';
import CardFriends from '../card-friends/card-friends.component'
import PropTypes from 'prop-types';
// import styles from './cards-friends.module.css'

export default function CardsFriends({friends, onCardClick}) {
  
  return (
    <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper', padding:'0' }}>
        {
        friends?.map((friend, index) => (
          <CardFriends key={friend.name} friend={friend} index={index}           onClick={onCardClick}
          ></CardFriends>
        ))}
    </List>
  );
}

CardsFriends.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      games: PropTypes.number.isRequired,
    })
  ).isRequired,
  onCardClick: PropTypes.func.isRequired,
};
import List from '@mui/material/List';
import CardFriends from '../card-friends/card-friends.component'
import PropTypes from 'prop-types';

export default function CardsFriends({friends}) {
  // console.log(friends)
  
  return (
    <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
        {
        friends?.map((friend) => (
          <CardFriends key={friend.name} friend={friend} ></CardFriends>
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
};
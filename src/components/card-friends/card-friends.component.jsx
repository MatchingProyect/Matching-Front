
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function CardFriends({friend}) {

  return (
    <div className='container'>

    <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar alt="Travis Howard" src="" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {friend.name}
                  </Typography>
                  {
                    friend.games.length>0 ? `(${friend.games} partidos juntos)`: `(No tienes partidos con ${friend.name})`
                  }
                </React.Fragment>
              }
            />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}

CardFriends.propTypes = {
    friend: PropTypes.shape({
        name: PropTypes.string.isRequired,
        games: PropTypes.number.isRequired,
      }).isRequired,  
};
  

export default CardFriends;

import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import styles from './card-friends.module.css'

function CardFriends({friend, index, onClick}) {

  return (
    <div>
        <ListItem alignItems="flex-start"  sx={{
            backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F3', padding: '0px'
          }}>
            <div className={styles.containerCard}>
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="" />
              </ListItemAvatar>
              <ListItemText
                primary={friend.displayName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                    </Typography>
                    {
                      friend.games>0 ? `(${friend.games} partidos juntos)`: `(No tienes partidos con ${friend.displayName})`
                    }
                  </React.Fragment>
                }
              />
              <div className={styles.centeredImage}>
                <button onClick={() => onClick(friend.displayName)}>
                  <img src={ "https://res.cloudinary.com/dbffmtz0y/image/upload/v1702507668/icon-park_more_m9dh5t.svg" } alt="Options" />
                </button>
              </div>
            </div>

        </ListItem>

        
        
    </div>
  );
}

CardFriends.propTypes = {
    friend: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        games: PropTypes.number.isRequired,
      }).isRequired,
    index: PropTypes.number.isRequired, 
    onClick: PropTypes.func
};
  

export default CardFriends;

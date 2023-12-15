
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import styles from './CardHistorial.module.css';

function CardHistorial({game, index }) {

  return (
    <div>
        <ListItem alignItems="flex-start"  sx={{
            backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F3', 
          }}>
            <div className={styles.containerCard}>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                    </Typography>
                    {game.fecha}
                  </React.Fragment>
                }
              />
               <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                    </Typography>
                      {game.hora}
                  </React.Fragment>
                }
              />
              <ListItemAvatar>
                <Avatar alt="Club" src="" />
              </ListItemAvatar>

              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="" />
              </ListItemAvatar>
              
              <ListItemText
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
                      game.resultado
                    }
                  
                  </React.Fragment>
                }
              />

              <div className={styles.centeredImage}>
                <img src={ "https://res.cloudinary.com/dbffmtz0y/image/upload/v1702507668/icon-park_more_m9dh5t.svg" } alt="Options" />
              </div>




            </div>

        </ListItem>

        
        
    </div>
  );
}

CardHistorial.propTypes = {
    game: PropTypes.shape({
        fecha: PropTypes.string.isRequired,
        hora: PropTypes.number.isRequired,
        equipo: PropTypes.arrayOf(PropTypes.string).isRequired,
        resultado: PropTypes.arrayOf(PropTypes.string).isRequired,
        club: PropTypes.number.isRequired,
      }).isRequired,
    index: PropTypes.number.isRequired, 
};

export default CardHistorial;

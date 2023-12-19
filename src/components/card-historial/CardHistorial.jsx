
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
    <div className={styles.listHistorial} >
        <ListItem alignItems="flex-start"  sx={{
            backgroundColor: index % 2 === 0 ? 'white' : '#F3F3F3', 
          }}>
            <div className={styles.containerCard}>
              <div className={styles.dateText}>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                      </Typography>
                      {game.fecha}
                    </React.Fragment>
                  }
                />
              </div>
              <div className={styles.dateAvatar}>
                <ListItemAvatar>
                    <Avatar alt="Club" src="" className={styles.avatar}/>
                </ListItemAvatar>
              </div>               
             

              <div className={styles.dateAvatarGroup}>
                {game.equipo.map((jugador, index) => (
                    <Avatar key={index} alt={jugador} src={`/static/images/avatar/${index + 1}.jpg`} className={styles.avatar} />
                  ))}
              </div>       
    
              <div className={styles.dateText}>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                      </Typography>
                      <p>{game.resultado}</p>
                      
                    
                    </React.Fragment>
                  }
                />
              </div>
             

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


import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';


const CardUser = ({ user }) => {

  const enviarRequest = async()=>{
  try {
  await axios.post('/friendRequest')

  } catch (error) {
  throw error.message
  }
  }

  return (
    <Card 
    sx = {{
      'width': '160px',
      'height' : '250px',
      'marginBottom' : '2vh',
      'box-shadow': '0px 0px 15px rgba(0, 0, 0, 0.551)',
      'borderRadius': '15px',
      'display' : 'flex',
      'flexDirection' : 'column',
      'alignItems': 'center',
      'justifyContent' : 'space-between',
      'margin': '5px',

    }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.displayName}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user.displayName}
        subheader={user.pais}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {user.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={enviarRequest}  aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions>

    </Card>
  );
}

export default CardUser

CardUser.propTypes = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.number.isRequired,
      pais: PropTypes.number.isRequired,
      deportes: PropTypes.arrayOf(PropTypes.string).isRequired,

    })
  ).isRequired,
};
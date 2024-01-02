
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
    <Card >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.name}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name}
        subheader={user.pais}
      />
      <CardMedia
        component="img"
        height="100"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {user.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={enviarRequest} aria-label="add to favorites">
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
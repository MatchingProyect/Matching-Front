import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useSelector } from 'react-redux';


const CardUser = ({ user }) => {

  const idUserQueRecibe = user?.id

 

  const userLogeado = useSelector((state) => state.user.user);

  console.log(userLogeado?.user?.id)
  
  const idUser = userLogeado?.user?.id

  const enviarRequest = async()=>{
  try {
    const requestBody = {
      UserId: idUser,
      FriendRId: idUserQueRecibe
    };
  await axios.post('/friendRequest', requestBody)

     } catch (error) {
     throw error.message
     }
  };


  return (
    <Card
      sx={{
        'width': '30vw',
        'minWidth': '110px',
        'height': '18vh',
        'box-shadow': '0px 0px 5px rgba(0, 0, 0, 0.551)',
        'borderRadius': '15px',
        'display': 'flex',
        'flexDirection': 'column',
        'alignItems': 'center',
        'justifyContent': 'space-around',
        'lineHeight': '110px',
        'marginRight': '10px',

      }}
    >
      <Avatar
        sx={{
          'marginTop': '5px',
          'width': '70px',
          'height': '70px',
          'marginTop': '20px',
        }}
        aria-label="recipe"
        src={user.avatarImg}
      >
        {user.displayName}
      </Avatar>
      <Typography
        sx={{
          'height': '50px',
          'fontSize': '17px',
          'fontWeight': '600',
          'textAlign': 'center',
          'width': '20vw',
        }}
      >
        {user.displayName}
      </Typography>
      <CardActions disableSpacing>
        <Button
          sx={{
            'fontSize': '13px',
            'fontWeight': '600',
          }}>Agregar</Button>
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
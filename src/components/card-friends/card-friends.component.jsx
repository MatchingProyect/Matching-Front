
import PropTypes from 'prop-types';

function CardFriends({friend}) {

  return (
    <div className='container'>

      <div  className='card-container'>
          <div className='title'>
            <p>{friend.name}</p>
            <p>asdasdasd</p>
          </div>


      </div>
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

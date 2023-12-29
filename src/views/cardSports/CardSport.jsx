import React from 'react'
import PropTypes from 'prop-types';

const CardSport = ({sport}) => {
  return (
    <div><h2>{sport.name}</h2></div>
  )
}

export default CardSport

CardSport.propTypes = {
  sport: PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    clubs: PropTypes.arrayOf(PropTypes.string).isRequired,

  })
).isRequired,
};
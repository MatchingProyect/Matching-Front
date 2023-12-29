import styles from './CardSport.module.css'

const CardSport = ( { iconSport,nameSport,state } ) => {
  return (
    <>
        <div className={ styles.contentSports }>
          <img className={ styles.iconSport } src={ iconSport } alt={`icon ${ nameSport }`} />
          {
            state 
            ? <p className={ styles.nameSport } >{nameSport}</p> 
            : <p className={ styles.nameSportOff } >{nameSport}</p>
          }
        </div>
    </>
  )
}

export default CardSport
import styles from './CardSport.module.css'

const CardSport = ( { iconSport,nameSport } ) => {
  return (
    <>
        <div className={ styles.contentSports }>
            <img className={ styles.iconSport } src={ iconSport } alt={`icon ${ nameSport }`} />
            <p className={ styles.nameSport } >{nameSport}</p>
        </div>
    </>
  )
}

export default CardSport
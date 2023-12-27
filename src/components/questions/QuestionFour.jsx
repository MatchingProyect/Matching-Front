import { useEffect } from 'react';
import { useUserContext } from '../../context/UserProvider';
import CardSport from './card-sport/CardSport'
import styles from './Questions.module.css'

export const QuestionFour = () => {

  const urlIcons = `https://res.cloudinary.com/dbffmtz0y/image/upload/`;

  const { datosUser,setDatosUser } = useUserContext();

  useEffect(() => {
    console.log( datosUser )
  }, [])
  

  return (
    <>
      <div className={ styles.contentQuestion } >
          <p className={ styles.titleQuestion } >¿Qué deporte jugas?</p>
          <p className={ styles.subtitleQuestion } >Puedes elegir mas de un deporte.</p>
          <div className={ styles.contentSports }>
            <CardSport iconSport={ `${ urlIcons }/v1702540814/emojione-monotone_tennis_almief.svg` } nameSport={ 'Pádel' }/>
            <CardSport iconSport={ `${ urlIcons }/v1702541735/tenis_cyo2ka.svg` } nameSport={ 'Tenis' }/>
            <CardSport iconSport={ `${ urlIcons }/v1702541734/futbol_isrkf2.svg` } nameSport={ 'Football' }/>
            <CardSport iconSport={ `${ urlIcons }/v1702541734/golf_t9uvge.svg` } nameSport={ 'Golf' }/>
            <CardSport iconSport={ `${ urlIcons }/v1702541734/basquet_bqbqrl.svg` } nameSport={ 'Basquet' }/>
            <CardSport iconSport={ `${ urlIcons }/v1702541734/hokey_upskgq.svg` } nameSport={ 'Hockey' }/>
            <CardSport iconSport={ `${ urlIcons }/v1702541735/squash_hjiwwz.svg` } nameSport={ 'Squash' }/>
          </div>
      </div>
    </>
  )
}
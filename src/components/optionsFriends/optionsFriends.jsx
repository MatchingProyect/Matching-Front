
import styles from './optionsFriends.module.css'
import PropTypes from 'prop-types';
import  { useEffect,  useState } from 'react';

export default function OptionsFriends({name, setShowOptions, showOptions}){
    
    const [hasRendered, setHasRendered] = useState(false);

    useEffect(() => {

      if (!hasRendered) {
        setHasRendered(true);
        return;
      }
  
      const handleClick = (event) => {
        const contentContainer = document.getElementById('contentFriendsContainer');  
        if (!contentContainer.contains(event.target) && showOptions) {
          setShowOptions(false);
        }
      };
  
      document.addEventListener('click', handleClick);
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [setShowOptions, showOptions, hasRendered]);
  
    return(
        <div id="optionsFriendsContainer" className={styles.containerFriends}>
            <div id="contentFriendsContainer" className={styles.contentOptions}>
                <div className={styles.options}>
                        <div className={styles.optionsImg}>
                            <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702576188/iconamoon_profile-bold_xoimai.svg" alt="Bloquear" />
                        </div>
                        <div className={styles.optionsDescription}>
                            <h4>Bloquear a {name}</h4>
                            <p>{name} no podrá verte ni ponerse en contacto contigo en Match. </p>
                        </div>
                </div>
                <div className={styles.options}>
                        <div className={styles.optionsImg}>
                            <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702576214/solar_user-block-linear_qooug4.svg" alt="Eliminar" />
                        </div>
                        <div className={styles.optionsDescription}>
                            <h4>Eliminar a {name}</h4>
                            <p>{name} no podrá verte ni ponerse en contacto contigo en Match. </p>
                        </div>

                </div>
            </div>
        </div>
    )
} 

OptionsFriends.propTypes = {

    name: PropTypes.string.isRequired, 
    setShowOptions: PropTypes.func,
    showOptions: PropTypes.bool
};
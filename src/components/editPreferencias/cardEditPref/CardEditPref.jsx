
import PropTypes from 'prop-types';
import styles from './CardEditPref.module.css'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import  { useState } from 'react';

function CardEditPref({preferencia}) {
    const iconArrowLow = "https://res.cloudinary.com/dbffmtz0y/image/upload/v1702836674/arrowLow_szgc1l.svg"
    const iconArrowUp= " https://res.cloudinary.com/dbffmtz0y/image/upload/v1702836674/arrowUp_r09eic.svg"

   console.log(preferencia)
    const [age, setAge] = useState('');
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
        };
    const handleOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

      
  return (
    <div className={styles.containerPref}>
        <div>
            <img src={preferencia.logo} alt="a" />
        </div>
        
        <div>
            <p>{preferencia.name}</p>
        </div>

        <div className={styles.customContainer}>
            <FormControl className={styles.customSelect} sx={{ m: 1, position: 'relative' }}>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    IconComponent={() => (open ? <img src={iconArrowLow}/> : <img src={iconArrowUp}/>)}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    variant="standard" 
                    sx={{
                      border: 'none',
                      '&:before': {
                          borderBottom: 'none', 
                          outline: 'none',
                      },
                      '&:after': {
                          borderBottom: 'none', 

                      }

                    }}                  
                  >
                  {preferencia.options.map((option) => (
                      <MenuItem key={option.value} value={option}>
                        {option}
                      </MenuItem>
                    ))}

                </Select>
            </FormControl>

        </div>
    </div>
  );
}

CardEditPref.propTypes = {
    preferencia: PropTypes.shape({
        name: PropTypes.string.isRequired,
        logo: PropTypes.number.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,

      }).isRequired,

};
  

export default CardEditPref;

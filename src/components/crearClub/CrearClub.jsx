import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import styles from './CrearClub.module.css';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const CrearClub = ({crearClub, setCrearClub}) =>{ 
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    if(!crearClub) return null

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleClick = () => {
      setOpen(true);
    };
  
    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

    const location = useSelector((state) => state.user.allLocations);

    const onSubmitClubs = async (data) => {
        try {
            const endPoint = '/clubs'
            const response = await axios.post(endPoint, data)
            if (response.status) {
                handleClick()

                //  dispatch(fetchClubs());
            }
           
        } catch (error) {
            throw error.message;
        }
    }

  return (
    <div className = {styles.holeCompContainer}>
    <form onSubmit={handleSubmit(onSubmitClubs)} className = {styles.formContainer}>
      <div className = {styles.inputContainer}>
        <div className = {styles.formValores}>
                <input type="text" {...register('name', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Name</label>
                </div>
                {errors.name?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
                {errors.name?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                <div className = {styles.formValores}>
                <input type="text" {...register('showers', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Showers</label>
                </div>
                {errors.showers?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
                {errors.showers?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                <div className = {styles.formValores}>
                <input type="text" {...register('grills', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Grills</label>
                </div>
                {errors.grills?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
                {errors.grills?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                <div className = {styles.formValores}>
                <input type="text" {...register('parking', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Parking</label>
                </div>
                {errors.parking?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
                {errors.parking?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                <div className = {styles.formValores}>
                <input type="text" {...register('security', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Security</label>
                </div>
                {errors.security?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
                {errors.security?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                <div className = {styles.formValores}>
            <select id="locationSelect" className = {styles.input}>
              {location?.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            <label htmlFor="locationSelect" className = {styles.label}>Location</label>
            </div>
            </div>
              <button type="submit" value='enviar' className = {styles.btnSubmit}> Create </button>
              </form>
              <button onClick={()=>setCrearClub(false)} className = {styles.close}>Cerrar</button>



              <Stack spacing={2}>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Club Creado!
                </Alert>
                </Snackbar>
            </Stack>


        </div>
  )
}

export default CrearClub
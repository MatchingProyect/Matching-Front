import React from 'react';
import axios from 'axios';
import styles from './CardPublicMatch.module.css';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function CardPublicMatch({partidoPublico, courts, locations, clubs, sports, userLogeado}){
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

      const handleClick = () => {
        setOpen(true);
      };
    

    const unirmeReserva = async()=>{
        try {
            console.log("{userLogeado.id", userLogeado?.id, partidoPublico?.TeamMatchId)
            const {data} = await axios.post(`/addUserInTeam?UserId=${userLogeado?.id}&TeamMatchId=${partidoPublico?.TeamMatchId}`)
            if(data.status) {
                handleClick()
            }
        } catch (error) {
            throw error.message
        }
      };

    const laCourta = function (){
        let theCourtOne = courts?.find((element) => element.id == partidoPublico.CourtId);
        return  theCourtOne?.name;
    }

    const laLocation = function(){
        let theCourtOne = courts?.find((element) => element.id == partidoPublico.CourtId);
        let value = theCourtOne?.LocationId;
        let result = locations?.find((element) => element.id == value);
        return result?.name;
    }
    const laClub = function(){
        let theCourtOne = courts?.find((element) => element.id == partidoPublico.CourtId);
        let value = theCourtOne?.ClubId;
        let result = clubs?.find((element)=> element.id == value);
        return result?.name;
    }

    const laSport = function(){
        let theCourtOne = courts?.find((element) => element.id == partidoPublico.CourtId);
        let value = theCourtOne?.SportId;
        let result = sports?.find((element) => element.id == value);
        return result?.name;
    }

    const laImagen = function(){
        let theCourtOne = courts?.find((element) => element.id == partidoPublico?.CourtId);
        return theCourtOne?.imgClub? theCourtOne?.imgClub : null ;
    }

    return(
        <div className = {styles.cardDiv}>
            <img src = {laImagen()} alt = 'Imagen Court' className = {styles.img}/>
            <div className = {styles.dataReserva}>
            <h1 className = {styles.nombreCancha}>{laCourta()}</h1>
            <h2 className = {styles.infoCard}>{laLocation()}</h2>
            <h2 className = {styles.infoCard}>{laClub()}</h2>
            <h2 className = {styles.infoCard}>{laSport()}</h2>
            </div>
            <div className = {styles.infoComp}>
            <label className = {styles.valueCard}>Inicio</label>
            <label className = {styles.valueCard}>{partidoPublico.dateTimeStart}</label>
            </div>
            <div className = {styles.infoComp}>
            <label className = {styles.valueCard}>Término</label>
            <label className = {styles.valueCard}>{partidoPublico.dateTimeEnd}</label>
            </div>
            <div className = {styles.infoComp}>
            <label className = {styles.valueCard}>Precio</label>
            <label className = {styles.valueCard}>${partidoPublico.totalCost}</label>
            </div>
            <button onClick = {unirmeReserva} className = {styles.btnUnirme}>Unirme</button>

            <Stack spacing={2}>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Te uniste correctamente!
                </Alert>
                </Snackbar>
            </Stack>


        </div>
    )
}
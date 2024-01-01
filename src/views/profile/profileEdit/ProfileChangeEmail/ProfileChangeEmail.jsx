import React from 'react';
import styles from './ProfileChangeEmail.module.css';
import NavbarLow from '../../../../components/navbarLow/navbarLow';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

export default function ProfileChangeEmail(){
    const { register, handleSubmit, formState: {errors} } = useForm();
    // Dentro de ambos imputs el nuevo correo a actualizar debe ser exactamente igual.
    // Una vez verificado esto, se envia una peticion al back end para verificar que no existe ningun otro usuario registrado con el mismo email.
    // Una vez se haya verificado que el email no ha estado previamente registrado, se envia un codigo generado al email y este debe ser introducido en un input de la view.
    // Si el codigo matchea, se debe enviar la actualizacion al backEnd y mostrar un mensaje de congratulations.

    return(
        <div className = {styles.changeEmailContainer}>
            <div className = {styles.divOne}>
            <h1>Reset Email</h1>
            </div>
            <form>
                <div className = {styles.inputsDiv}>
                    <div className = {styles.emailDivs}>
                <label className = {styles.labels}>Email</label>
                <TextField
                { ...register('emailOne', {
                    required: {
                        value: true,
                        message: 'Insertar nuevo email.'
                    },
                    maxLength: 35,
                    minLength: 10,
                    pattern: {
                        value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'Formato Incorrecto.',
                    }
                })}
                sx={{
                    width: '80vw',
                    backgroundColor: 'white',
                    fontSize: '25px',
                    borderRadius: '10px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.274)',
                }}
                className = {styles.inputOne}
                variant = 'filled'
                id = 'textInput'
                // label = 'Email'
                />
                {errors.emailOne && <p className = {styles.errors}>{errors.emailOne.message}</p>}
                </div>
                <div className = {styles.emailDivs}>
                <label className = {styles.labels}>Confirm Email</label>
                <TextField 
                { ...register('emailTwo', {
                    required: {
                        value: true,
                        message: 'Insertar nuevo email.'
                    },
                    maxLength: 35,
                    minLength: 10,
                    pattern: {
                        value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'Formato Incorrecto.',
                    }
                })}
                sx={{
                    width: '80vw',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.274)',
                }}
                className = {styles.inputOne}
                variant = 'filled'
                id = 'textInput'
                // label = 'Confirm Email'
                />
                {errors.emailTwo && <p className = {styles.errors}>{errors.emailTwo.message}</p>}
                </div>
                </div>
            </form>
            <NavbarLow />
        </div>
    )
}
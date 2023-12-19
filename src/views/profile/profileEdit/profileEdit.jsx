import React from 'react';
import styles from './ProfileEdit.module.css';
import { Link } from 'react-router-dom';
import NavbarLow from '../../../components/navbarLow/navbarLow';
import { Container, FormControl, TextField, Button, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function ProfileEdit() {
    const user = {
        name: 'Leonardo',
        lastname: 'Risco',
        gender: 'Masculino',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem accusamus iure asperiores? Ea magni, expedita nam placeat minima dolorem ab blanditiis.',
        dayBirth: '27/01/1999',
        email: '123321@gmail.com',
        phone: '123456789'
    };

    return (
        <div className={styles.profileEditHoleContainer}>
            <Container className={styles.divOne} maxWidth='string'>
                <Link to='/profile'><img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702573291/return_w8ycd2.svg" alt="Return" className={styles.return} /></Link>
                <h1 className={styles.titulo}>Editar Perfil</h1>
            </Container>
            <Container className={styles.divTwo} maxWidth='string' sx={{ display: 'flex', flex: 'column', justifyContent: 'center', alignItems: 'center', }}>
                <FormControl className={styles.form}>
                    <TextField
                        sx={{
                            width: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        className={styles.input} variant='filled' id="textInput" label="Nombre" defaultValue={user.name} />
                    <TextField
                        sx={{
                            minWidth: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        className={styles.input} variant='filled' id="outlined-basic" label="Apellido" defaultValue={user.lastname} />
                    <TextField 
                                        sx = {{
                                            minWidth: '70vw',
                                            backgroundColor: 'white',
                                            borderRadius: '7px',
                                            marginBottom: '3vw',
                                            borderStyle: 'solid',
                                            borderColor: 'black',
                                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                                        }}
                    
                    className={styles.input} variant='filled' id="outlined-basic" label="Genero" defaultValue={user.gender} />
                    <TextField 
                                        sx = {{
                                            minWidth: '70vw',
                                            backgroundColor: 'white',
                                            borderRadius: '7px',
                                            marginBottom: '3vw',
                                            borderStyle: 'solid',
                                            borderColor: 'black',
                                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">DD/MM/AA</InputAdornment>,
                                          }}
                    className={styles.input} variant='filled' id="outlined-basic" label="Fecha de Nacimiento" defaultValue={user.dayBirth} />
                    <TextField 
                                        sx = {{
                                            width: '70vw',
                                            backgroundColor: 'white',
                                            borderRadius: '7px',
                                            marginBottom: '3vw',
                                            borderStyle: 'solid',
                                            borderColor: 'black',
                                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                                        }}
                                        
                    className={styles.input} variant='filled' id="outlined-basic" label="Correo electronico" defaultValue={user.email} />
                    <TextField 
                                        sx = {{
                                            minWidth: '70vw',
                                            backgroundColor: 'white',
                                            borderRadius: '7px',
                                            marginBottom: '3vw',
                                            borderStyle: 'solid',
                                            borderColor: 'black',
                                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">+ 51</InputAdornment>,
                                          }}
                    
                    className={styles.input} variant='filled' id="outlined-basic" label="Numero" defaultValue={user.phone} />
                    <TextField 
                                        sx = {{
                                            minWidth: '70vw',
                                            backgroundColor: 'white',
                                            borderRadius: '7px',
                                            marginBottom: '3vw',
                                            borderStyle: 'solid',
                                            borderColor: 'black',
                                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                                        }}
                                        
                    
                    className={styles.input} multiline rows= {4} variant='filled' id="outlined-multiline-static" label="Descripcion" />
                </FormControl>
                <Button
                    onClick={() => console.log('Button Clicked')}
                    type='submit'
                    sx={{
                        marginTop: '2vh',
                        fontSize: '16px',
                        fontWeight: '600',
                        minWidth: '70vw',
                        height: '50px',
                        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.274)',
                    }}
                    color='success'
                    variant='contained'
                    className={styles.submitBtn}
                >Guardar Cambios</Button>
            </Container>
            <NavbarLow />
        </div>
    )
}
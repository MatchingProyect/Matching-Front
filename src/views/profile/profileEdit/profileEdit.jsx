import React from 'react';
import axios from 'axios';
import styles from './ProfileEdit.module.css';
import { Link } from 'react-router-dom';
import NavbarLow from '../../../components/navbarLow/navbarLow';
import { Container, FormControl, TextField, Button, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { fetchProfiles } from '../../../redux/reducer';


export default function ProfileEdit() {

    //Falta campo description en modelo USER
    //Function para traer perfil del usuario
    //    const {id} = useParams();
    // useEffect(()=>{
    //     const fetchData = async() =>{
    //         try {
    //             const {data} = await axios(`/users/${id}`)
    //             if(data.status){
    //                 reset({
    //                     id: data.userFound.id,
    //                     name: data.userFound.name,
    //                     lastName: data.userFound.lastName,
    //                     gender:  data.userFound.gender,
    //                     dayBirth:  data.userFound.dayBirth,
    //                     email: data.userFound.email,
    //                     phone: data.userFound.phone,
    //                     creditCardWarranty: data.userFound.creditCardWarranty,
    //                     avatarImg: data.userFound.avatarImg,
    //                     password: data.userFound.password
    //                 })
    //             }

    //         } catch (error) {
    //             return error.message
    //         }
    //         }
    //     fetchData()
    // },[]);


    const user = {
        id: 123,
        name: 'Leonardo',
        lastName: 'Risco',
        gender: 'Masculino',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem accusamus iure asperiores? Ea magni, expedita nam placeat minima dolorem ab blanditiis.',
        dayBirth: '27/01/1999',
        email: '123321@gmail.com',
        phone: '123456789'
    };

    const form = useForm({
        defaultValues: {
            name: user.name,
            lastName: user.lastName,
            gender: user.gender,
            dayBirth: user.dayBirth,
            email: user.email,
            phone: user.phone,
            creditCardWarranty: '',
            avatarImg: '',
            password: '',
            description: '',

        }

    });

    const { register, formState: { errors }, handleSubmit, reset } = form;

    const onSubmit = async (data) => {
        try {
            const id = user.id;
            const endPoint = `/users/${id}`;
            const response = await axios.put(endPoint, data);
            console.log(123);
            if (response.status) {
                dispatch(fetchProfiles());

            } else {
                alert(response.message)
            }

        } catch (error) {
            alert(error.message)
        }
    };



    return (
        <div className={styles.profileEditHoleContainer}>
            <Container className={styles.divOne} maxWidth='string'>
                <Link to='/profile'><img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702573291/return_w8ycd2.svg" alt="Return" className={styles.return} /></Link>
                <h1 className={styles.titulo}>Editar Perfil</h1>
            </Container>
            <Container className={styles.divTwo} maxWidth='string' sx={{ display: 'flex', flex: 'column', justifyContent: 'center', alignItems: 'center', }}>
                <FormControl className={styles.form} onSubmit={handleSubmit(onSubmit())}>
                    <TextField
                        {...register('name', { required: 'Name is required.', maxLength: 20 })}
                        sx={{
                            width: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        error = {!!errors.name}
                        helperText = {errors.name?.message}
                        className={styles.input} variant='filled' id="textInput" label="Nombre" />
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}

                    <TextField
                        {...register('lastName', { required: true, maxLength: 20 })}
                        sx={{
                            minWidth: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        className={styles.input} variant='filled' id="outlined-basic" label="Apellido"  />
                    <TextField
                        {...register('gender', { required: true, maxLength: 20 })}
                        sx={{
                            minWidth: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}

                        className={styles.input} variant='filled' id="outlined-basic" label="Genero"  />
                    <TextField
                        {...register('dayBirth', { required: true, maxLength: 20 })}
                        sx={{
                            maxWidth: '70vw',
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
                        className={styles.input} variant='filled' id="outlined-basic" label="Fecha de Nacimiento"  />
                    <TextField
                        {...register('email', { required: true, maxLength: 20 })}
                        sx={{
                            width: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}

                        className={styles.input} variant='filled' id="outlined-basic" label="Correo electronico" />
                    <TextField
                        {...register('phone', { required: true, maxLength: 20 })}
                        sx={{
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

                        className={styles.input} variant='filled' id="outlined-basic" label="Numero" />
                    <TextField
                        {...register('description', { required: true, maxLength: 260 })}
                        sx={{
                            minWidth: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}


                        className={styles.input} multiline rows={4} variant='filled' id="outlined-multiline-static" label="Descripcion" />
                    <Button
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
                </FormControl>
            </Container>
            <NavbarLow />
        </div>
    )
}
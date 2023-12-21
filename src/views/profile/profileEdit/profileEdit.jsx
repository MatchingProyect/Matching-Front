import React from 'react';
import axios from 'axios';
import styles from './ProfileEdit.module.css';
import { Link } from 'react-router-dom';
import NavbarLow from '../../../components/navbarLow/navbarLow';
import { Container, TextField, Button, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { fetchProfiles } from '../../../redux/reducer';

export default function ProfileEdit() {
    const { id } = useParams();

    // Function para traer perfil del usuario
    // useEffect(()=>{
    //     const fetchData = async() =>{
    //         try {
    //             const {data} = await axios.get(`/users/${id}`)
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

    //HardCodeando la respuesta que deberia traer el useEffect de arriba. (Fetchear el usuario por ID)
    const user = {
        id: 123,
        name: 'Leonardo',
        lastName: 'Risco',
        gender: 'Masculino',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem accusamus iure asperiores? Ea magni, expedita nam placeat minima dolorem ab blanditiis.',
        dayBirth: '1999-01-27',
        email: '123321@gmail.com',
        phone: '123456789'
    };

    const form = useForm({
        defaultValues: {
            name: user.name,
            lastName: user.lastName,
            gender: user.gender,
            dayBirth: user.dayBirth,
            email: user.email, //Confirmacion por correo Electronico
            phone: user.phone,
            creditCardWarranty: '', //??
            avatarImg: '', //Input de tipo file para la actualizacion del perfil
            password: '', //Boton de reset Password
            description: ''
        }
    });

    const { register, handleSubmit, formState: { errors } } = form;

    const onSubmit = async (data) => {
        console.log(data);
        alert(`Solicitud de actualizacion de perfil correctamente enviada al back end del usuario ${id}, resultado del formulario mostrado en consola`);

        //Function para enviar la actualizacion del perfil al backEnd
        // try {
        //     const endPoint = `/users/${id}`;
        //     const response = await axios.put(endPoint, data);
        //     console.log(123);
        //     if (response.status) {
        //         dispatch(fetchProfiles());

        //     } else {
        //         alert(response.message);
        //     }

        // } catch (error) {
        //     alert(error.message);
        // }
    };



    return (
        <div className={styles.profileEditHoleContainer}>
            <Container className={styles.divOne} maxWidth='string'>
                <Link to='/profile'><img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702573291/return_w8ycd2.svg" alt="Return" className={styles.return} /></Link>
                <h1 className={styles.titulo}>Editar Perfil</h1>
            </Container>
            <Container className={styles.divTwo} maxWidth='string' sx={{ display: 'flex', flex: 'column', justifyContent: 'center', alignItems: 'center', }}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register('name', {
                            required: true,
                            maxLength: 32,
                            minLength: 3,
                        })}
                        sx={{
                            width: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        className={styles.input} variant='filled' id="textInput" label="Nombre" />
                    {errors.name?.type === "required" && <p>This field is required</p>}
                    {errors.name?.type === "minLength" && <p>Name should contain at least 3 characters</p>}
                    {errors.name?.type === "maxLength" && <p>Name can only contain 32 characters</p>}

                    <TextField
                        {...register('lastName', {
                            required: true,
                            maxLength: 32,
                            minLength: 3,
                        })}
                        sx={{
                            minWidth: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        defaultValue={user.lastName}
                        className={styles.input} variant='filled' id="outlined-basic" label="Apellido" />
                    {/* Esto debe cambiar a un select con: Masculino, Femenino, No binario, Prefiero no especificar */}
                    {errors.lastName?.type === "required" && <p>This field is required</p>}
                    {errors.lastName?.type === "minLength" && <p>Name should contain at least 3 characters</p>}
                    {errors.lastName?.type === "maxLength" && <p>Name can only contain 32 characters</p>}
                    <TextField
                        {...register('gender', {
                            required: true,
                            maxLength: 32,
                            minLength: 3,
                        })}
                        sx={{
                            minWidth: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        defaultValue={user.gender}
                        className={styles.input} variant='filled' id="outlined-basic" label="Genero" />
                        {errors.gender?.type === "required" && <p>This field is required</p>}
                    <TextField
                        {...register('dayBirth', {
                            required: true,
                            maxLength: 32,
                            minLength: 3,
                        })}
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
                        defaultValue={user.dayBirth}
                        className={styles.input} variant='filled' id="outlined-basic" label="Fecha de Nacimiento" type='date' />
                        {errors.lastName?.type === "required" && <p>This field is required</p>}
                    <TextField
                        {...register('email', {
                            required: true,
                            maxLength: 20
                        })}
                        sx={{
                            width: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        defaultValue={user.email}
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
                        defaultValue={user.phone}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+ 51</InputAdornment>,
                        }}

                        className={styles.input} variant='filled' id="outlined-basic" label="Numero" />
                    <TextField
                        {...register('description', { required: false, maxLength: 260 })}
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
                </form>
            </Container>
            <NavbarLow />
        </div>
    );
};
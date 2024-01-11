import axios from 'axios';
import { useForm } from 'react-hook-form';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './CrearReserva.module.css';

const CrearReserva = ({ court, reserva, setReserva }) => {
    const userLogeado = useSelector((state) => state.user?.datauser?.user);
    const allFriends = useSelector((state) => state.user.allFriends);
    let [preferenceId, setPreferenceId] = useState('');
    initMercadoPago('TEST-ac197b9a-ae79-436d-9bdd-4bd088de5c27');

    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

    if (!reserva) return null;

    const sendEmail = (reservations) => {
        const defaultValues = {
            user_name: `${userLogeado.displayName}`,
            user_email: `${userLogeado.email}`,
            message:
                `${userLogeado.displayName},
                
                Hemos detectado que quieres realizar la reserva de una cancha.
                ** RESERVA: ${reservations.dataValues.dateTimeStart} -- ${reservations.dataValues.dateTimeEnd}
                ** COSTO TOTAL: ${reservations.dataValues.totalCost}
                
                Al completarse el pago, verás reflejada en tu bandeja de entrada la información del mismo.
                Muchas gracias!`,
        };
        emailjs
            .send('service_dfonkqh', 'template_j9l4qgp', defaultValues, 'AOct4aYGtYkYpPDCn')
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    const crearReserva = async (data) => {
        console.log(data)
        try {
            const endpoint = '/reservations';
            const response = await axios.post(endpoint, data)
            console.log(response.data.addReservation)

            // if (response.data.status) {
            //     const endpoint = '/createOrder';
            //     const response = await axios.post(endpoint, { id: response.data.addReservation.dataValues.id });
            //     //*Con esto se abre el botón MP
            //     setPreferenceId(response.data.id);
            // }
            const reservations = response.addReservation;

            sendEmail(reservations);
        } catch (error) {
            console.error(error)
            throw error.message;
        }
    }

    return (
        <form onSubmit={handleSubmit(crearReserva)} className={styles.formContainer}>
            <div className={styles.modalContainer}>
                <label>Name:</label>
                <input type="text" {...register('teamMatch', { required: true, maxLength: 20 })} />
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}

                <select id="UserId" aria-placeholder='Selecciona a tus amigos...' {...register('UserId', { required: true, maxLength: 20 })}>
                    {allFriends?.map(friends => (
                        <option key={friends.id} value={friends.id}>
                            {friends.displayName}
                        </option>
                    ))}
                </select>

                <select id="MatchTypeId" aria-placeholder='Selecciona el tipo de juego...' {...register('MatchTypeId', { required: true, maxLength: 20 })}>

                    <option value={'fd0d0ab9-3408-43be-a5cc-2e35f0e4740f'} >
                        Partido Público
                    </option>

                    <option value={'d3568da1-e683-44ef-b4fd-b7de4ba10825'}>
                        Partido Privado
                    </option>
                </select>

                <label>Inicio:</label>
                <input type="text" {...register('dateTimeStart', { required: true, maxLength: 20 })} />
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}

                <label>Fin:</label>
                <input type="text" {...register('dateTimeEnd', { required: true, maxLength: 20 })} />
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}

                {/* <label>Precio:</label> */}
                {/* <input type="text" {...register('totalCost', { required: true, maxLength: 20 })} />
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>} */}

                <select id="CourtId" {...register('CourtId', { required: true, maxLength: 20 })} >

                    <option value={court.id}>
                        {court.name}
                    </option>
                </select>

                <select id="ReservationTypeId" {...register('ReservationTypeId', { required: true, maxLength: 20 })}>

                    <option value={true}>
                        ReservationType
                    </option>
                </select>

                <select id="UserId"  {...register('UserId', { required: true, maxLength: 20 })}>

                    <option value={userLogeado.id}>
                        {userLogeado.displayName}
                    </option>
                </select>

                <select id="totalCost"  {...register('totalCost', { required: true, maxLength: 20 })}>

                    <option value={court.priceFee}>
                        {court.priceFee}
                    </option>
                </select>

                <button type="submit" value='enviar'> Crear Reserva </button>
                {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
            </div>

        </form>
    )
}

export default CrearReserva;
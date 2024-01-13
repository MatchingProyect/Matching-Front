import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './CrearReserva.module.css';

const CrearReserva = ({ court, reserva, setReserva }) => {
    initMercadoPago('TEST-ac197b9a-ae79-436d-9bdd-4bd088de5c27');
    const userLogeado = useSelector((state) => state.user?.datauser?.user);
    const allFriends = useSelector((state) => state.user?.allFriends);
    const [preferenceId, setPreferenceId] = useState('');

    const [dataReservation, setDataReservation] = useState({
        dateTimeStart: '',
        dateTimeEnd: '',
        totalCost: court?.priceFee,
        teamMatch: '',
        UserId: userLogeado?.id,
        CourtId: court?.id,
        MatchTypeId: '',
        FriendsId: []
    })

    useEffect(()=>{
        setDataReservation({
            ...dataReservation,
            UserId: userLogeado?.id,
            totalCost: court?.priceFee,
            CourtId: court?.id
        })
    }, [userLogeado])

    // const [errors, setErrors] = useState({
    //     dateTimeStart: '',
    //     dateTimeEnd: '',
    //     totalCost: '',
    //     teamMatch: '',
    //     UserId: '',
    //     CourtId: '',
    //     MatchTypeId: '',
    //     FriendsId: []
    // })

    const handleChange = async(event) => {
        const friendName = event.target.name;
        setDataReservation({
            ...dataReservation,
            [friendName]: event.target.value
        })
        if (event.target.name === 'FriendsId') {
            const friendId = event.target.value;
            const friendSelected = dataReservation.FriendsId.includes(friendId);
            if(friendSelected){
                const deselectFriend = dataReservation.FriendsId.filter((friend) => friend !== friendId);
                setDataReservation({
                    ...dataReservation,
                    FriendsId: deselectFriend
                })
            }
            else setDataReservation({
                ...dataReservation,
                FriendsId: [...dataReservation.FriendsId, friendId]
            });
            // setErrors(validations({
            //     ...dataReservation,
            //     [event.target.name]: event.target.value
            // }))
        }
            
    }

        if (!reserva){
            if(preferenceId) setPreferenceId('');
            return null;
        }
        
        const { dateTimeStart, dateTimeEnd, totalCost, teamMatch, UserId, CourtId, MatchTypeId, FriendsId } = dataReservation;
        const crearReserva = async () => {
            try {
                const endpoint = '/reservations';
                const { data } = await axios.post(endpoint, {
                    dateTimeStart,
                    dateTimeEnd,
                    totalCost: Number(totalCost),
                    teamMatch,
                    UserId,
                    CourtId,
                    MatchTypeId,
                    FriendsId
                });

                if (data.status) {
                    const reservations = await data.addReservation;
                    const endpoint = '/createOrder';
                    const response = await axios.post(endpoint, { id: reservations.id });
                    //*Con esto se abre el botón MP
                    setPreferenceId(response.data.id);
                    sendEmail(reservations);
                }
            } catch (error) {
               console.log(error.message);
            }
        };

        const sendEmail = (reservations) => {
            const defaultValues = {
                user_name: `${userLogeado.displayName}`,
                user_email: `${userLogeado.email}`,
                message: `${userLogeado.displayName},
                
                Hemos detectado que quieres realizar la reserva de una cancha.
                ** RESERVA: ${reservations.dateTimeStart} -- ${reservations.dateTimeEnd}
                ** COSTO TOTAL: ${reservations.totalCost}
                
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

        const handleSumbit = async (event) => {
            try {
                event.preventDefault();
                await crearReserva();
            } catch (error) {
                console.error(error)
                throw error.message
            }
        }
        console.log(userLogeado)

        return (
            <>
                <div className={styles.allContainer}>
                    <button onClick={() => setReserva(false)}>X</button>
                    <form onSubmit={handleSumbit} className={styles.formContainer}>

                        <div className={styles.modalContainer}>
                            <label>Court: {court?.name}</label>
                            <br />

                            <label>teamMatch:</label>
                            <input type="text" name='teamMatch' value={dataReservation.teamMatch} onChange={handleChange} />
                            <br />

                            <label>MatchTypeId:</label>
                            <select name="MatchTypeId" value={dataReservation.MatchTypeId} onChange={handleChange}>
                                <option>Selecciona un tipo de partido:</option>
                                <option value="ca221323-2fac-450f-8b6e-f8edc9f14e5d">Privado</option>
                                <option value="d81fe1b8-345a-4b4c-97b9-6e64b1116aec">Público</option>
                            </select>
                            <br />

                            <label>dateTimeStart:</label>
                            <input type="text" name="dateTimeStart" value={dataReservation.dateTimeStart} onChange={handleChange} />
                            <br />

                            <label>dateTimeEnd:</label>
                            <input type="text" name="dateTimeEnd" value={dataReservation.dateTimeEnd} onChange={handleChange} />
                            <br />

                            <label>totalCost: {court?.priceFee}</label>

                            <label>Friends Id:</label>
                            <select
                                name="FriendsId"
                                value={dataReservation.FriendsId}
                                onChange={(event) => handleChange(event)}
                                multiple  // Permite seleccionar múltiples opciones
                            >
                                <option value="" disabled>Selecciona amigos:</option>
                                {allFriends.map((friend) => (
                                    <option key={friend.id} value={friend.id}>{friend.displayName}</option>
                                    ))}
                            </select>
                                    <br />

                            <button type="submit">Crear Reserva</button>
                            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
                        </div>
                    </form>
                </div>
            </>
        );
    };

    export default CrearReserva;
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './CrearReserva.module.css';
import { format } from 'date-fns';


const CrearReserva = ({ court, reserva, setReserva }) => {
    initMercadoPago('TEST-ac197b9a-ae79-436d-9bdd-4bd088de5c27');
    const userLogeado = useSelector((state) => state.user?.datauser?.user);
    const allFriends = useSelector((state) => state.user?.allFriends);
    const [preferenceId, setPreferenceId] = useState('');

    const horaInicio = new Date(`1970-01-01T${court.horarioInicio}`);
    const horaCierre = new Date(`1970-01-01T${court.horarioCierre}`);

    const [hInicio, setHInicio] = useState(new Date(`1970-01-01T${court.horarioInicio}`));
    const [hCierre, setHCierre] = useState(new Date(hInicio.getTime() + 60 * 60 * 1000));
    const [horasDisponibles, setHorasDisponibles] = useState([]);

    useEffect(() => {
        const generarHorasDisponibles = () => {
            const horas = [];
            let hora = new Date(horaInicio);

            while (hora < horaCierre) {
                const horaString = hora.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
                horas.push(`${horaString}:00`);
                hora = new Date(hora.getTime() + 60 * 60 * 1000);
            }

            setHorasDisponibles(horas);
        };

        generarHorasDisponibles();
    }, []);

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

    useEffect(() => {
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

    const formatFechaHora = (fecha) => {
        return fecha.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const handleChange = async (event) => {
        const friendName = event.target.name;

        if (friendName === 'dateTimeStart') {
            const nuevaHoraInicio = new Date(`1970-01-01T${event.target.value}`);
            setHInicio(nuevaHoraInicio);
            const nuevaHCierre = new Date(nuevaHoraInicio.getTime() + 60 * 60 * 1000);
            setHCierre(nuevaHCierre);

            setDataReservation({
                ...dataReservation,
                dateTimeStart: formatFechaHora(nuevaHoraInicio),
                dateTimeEnd: formatFechaHora(nuevaHCierre),
            });
        } else {
            setDataReservation({
                ...dataReservation,
                [friendName]: event.target.value,
            });
        }
    };

    const handleHoraInicioChange = (event) => {
        const horaSeleccionada = event.target.value;
        const nuevaHoraInicio = new Date();
        nuevaHoraInicio.setHours(horaSeleccionada.split(':')[0]);
        nuevaHoraInicio.setMinutes(horaSeleccionada.split(':')[1]);
        setHInicio(nuevaHoraInicio);
        const nuevaHCierre = new Date(nuevaHoraInicio.getTime() + 60 * 60 * 1000);
        setHCierre(nuevaHCierre);

        setDataReservation({
            ...dataReservation,
            dateTimeStart: format(nuevaHoraInicio, 'yyyy-MM-dd HH:mm:ss'),
            dateTimeEnd: format(nuevaHCierre, 'yyyy-MM-dd HH:mm:ss'),
        });
    };



    if (!reserva) {
        if (preferenceId) setPreferenceId('');
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
                FriendsId: [FriendsId]
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
            .send('service_svnbgjr', 'template_t5cgfx2', defaultValues, 'zADAsfTnn9pOJcyPO')
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
    console.log(dataReservation)
    return (
        <div className={styles.holeModal}>
            <div className={styles.allContainer}>
                <div className={styles.modalHeader}>
                    <label className={styles.labelTop}>Crear Reserva</label>
                    <button onClick={() => setReserva(false)} className={styles.closeBtn}>x</button>
                </div>
                <form onSubmit={handleSumbit} className={styles.formContainer}>
                    <div className={styles.modalContainer}>
                        <label className={styles.labelModal}>Cancha</label>
                        <label className={styles.labelModal}>{court?.name}</label>
                    </div>
                    <div className={styles.modalContainer}>
                        <label className={styles.labelModal}>Nombre Equipo</label>
                        <input type="text" name='teamMatch' value={dataReservation.teamMatch} onChange={handleChange} className={styles.modalInput} />
                    </div>
                    <div className={styles.modalContainer}>
                        <label className={styles.labelModal}>Tipo Partido</label>
                        <select name="MatchTypeId" value={dataReservation.MatchTypeId} onChange={handleChange} className={styles.modalInput}>
                            <option>Tipos</option>
                            <option value="ca221323-2fac-450f-8b6e-f8edc9f14e5d">Privado</option>
                            <option value="d81fe1b8-345a-4b4c-97b9-6e64b1116aec">Público</option>
                        </select>
                    </div>


                    <div className={styles.modalContainer2}>
                        <label className={styles.labelModal2}>Selecciona un horario de inicio</label>
                        <select
                            name="dateTimeStart"
                            value={hInicio.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                            onChange={(event) => handleHoraInicioChange(event)}
                            className={styles.modalInput2}
                        >
                            <option value="" disabled></option>
                            {horasDisponibles.length > 0 && horasDisponibles.map((hora) => (
                                <option key={hora} value={hora}>{hora}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.selectedHoursContainer}>
                        <p>Horas seleccionadas:</p>
                        <p>{formatFechaHora(hInicio)} - {formatFechaHora(hCierre)}</p>
                    </div>

                    <div className={styles.modalContainer}>
                        <label className={styles.labelModal}>Precio</label>
                        <label className={styles.labelModal}>${court?.priceFee}</label>
                    </div>
                    <div className={styles.modalContainer2}>
                        <label className={styles.labelModal2}>Selecciona participantes</label>
                        <select
                            name="FriendsId"
                            value={dataReservation.FriendsId}
                            onChange={(event) => handleChange(event)}
                            multiple  // Permite seleccionar múltiples opciones
                            className={styles.modalInput2}
                        >
                            <option value="" disabled>Friends Id</option>
                            {allFriends.map((friend) => (
                                <option key={friend.id} value={friend.id}>{friend.displayName}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className={styles.createBtn}>Crear Reserva</button>
                    {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
                </form>
            </div>
        </div>
    );
};

export default CrearReserva;
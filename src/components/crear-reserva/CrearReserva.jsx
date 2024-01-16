import * as React from 'react';

import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './CrearReserva.module.css';
import { format } from 'date-fns';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CrearReserva = ({ court, reserva, setReserva }) => {
    initMercadoPago('TEST-ac197b9a-ae79-436d-9bdd-4bd088de5c27');

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const userLogeado = useSelector((state) => state.user?.datauser?.user);
    const allFriends = useSelector((state) => state.user?.allFriends);
    const [preferenceId, setPreferenceId] = useState('');

    const horaInicio = new Date(`1970-01-01T${court.horarioInicio}`);
    const horaCierre = new Date(`1970-01-01T${court.horarioCierre}`);

    const [hInicio, setHInicio] = useState(new Date(`1970-01-01T${court.horarioInicio}`));
    const [hCierre, setHCierre] = useState(new Date(hInicio.getTime() + 60 * 60 * 1000));
    const [horasDisponibles, setHorasDisponibles] = useState([]);

    function getStyles(name, personName, theme) {
        return {
          fontWeight:
            personName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }



    useEffect(() => {
        const generarHorasDisponibles = () => {
            const horas = ['00:00:00'];
            let hora = new Date(horaInicio);

            while (hora < horaCierre) {
                const horaString = hora.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
                horas.push(`${horaString}:00`);
                hora = new Date(hora.getTime() + 60 * 60 * 1000);
            }
            console.log(horas)
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

        console.log(dataReservation)
    };


    const handleChange2 = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          typeof value === 'string' ? value.split(',') : value,
        );

        console.log(personName);
      };
    
    const handleHoraInicioChange = (event) => {
        console.log( "aaaa", event.target.value)

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

        console.log(dataReservation)
    };



    if (!reserva) {
        if (preferenceId) setPreferenceId('');
        return null;
    }

    const { dateTimeStart, dateTimeEnd, totalCost, teamMatch, UserId, CourtId, MatchTypeId } = dataReservation;

    const crearReserva = async () => {
        try {
            const endpoint = '/reservations';
            const reserva = { dateTimeStart,
                dateTimeEnd,
                totalCost: Number(totalCost),
                teamMatch,
                UserId,
                CourtId,
                MatchTypeId,
                FriendsId: personName}
            console.log(reserva)
            const { data } = await axios.post(endpoint, reserva);

            if (data.status) {
                const reservations = await data.addReservation;
                const endpoint = '/createOrder';
                const response = await axios.post(endpoint, { id: reservations.id });
                setPreferenceId(response.data.id);
                sendEmail(reservations);
            }
        } catch (error) {
            console.log(error);
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


    const getDisplayNameById = (id) => {
        const friend = allFriends.find((name) => name.id === id);
        return friend ? friend.displayName : '';
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
                            <option value="hora" disabled></option>
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
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={personName}
                            onChange={handleChange2}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={getDisplayNameById(value)} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            >
                            {allFriends.map((name) => (
                                <MenuItem
                                key={name.id}
                                value={name.id}
                                style={getStyles(name.id, personName, theme)}
                                >
                                {name.displayName}
                                </MenuItem>
                            ))}
                        </Select>

                    </div>
                    <button type="submit" className={styles.createBtn}>Crear Reserva</button>
                    {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
                </form>
            </div>
        </div>
    );
};

export default CrearReserva;
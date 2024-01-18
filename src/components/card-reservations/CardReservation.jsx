import styles from './CardReservation.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ValorarUsuarios from '../valorarUsuarios/ValorarUsuarios';
import Resultado from '../resultado/Resultado';


export default function CardReservation() {
    const [infoReservation, setInfoReservation] = useState([]);
    const [infoUser, setInfoUser] = useState([]);
    const [teamMatch, setTeamMatch] = useState([]);
    const [teamName, setTeamName] = useState([]);
    const [valorarUsuarios, setValorarUsuarios] = useState(false);

    const userLogeado = useSelector((state) => state.user?.datauser?.user);
    const [resultado, setResultado] = useState(false);

    const formattedReservation = []



    useEffect(() => {
        const fetchAnfitrionInfo = async (infoReservation) => {
            try {
                const promises = infoReservation?.map(async (info) => {
                    const endpoint = `/users/${info.UserId}`;
                    const { data } = await axios(endpoint);
                    return data.userFound.user['displayName'];
                });
                const nameAnfitrion = await Promise.all(promises);
                setInfoUser(nameAnfitrion);

            } catch (error) {
                console.log(error)
                throw error.message;
            }
        };
        console.log('genios')
        const fetchTeamMatchName = async (team) => {
            try {
                const name = team?.map(async (nombreTeam) => {
                    const endpoint = `/teamMatch/${nombreTeam.TeamMatchId}`;
                    const { data } = await axios(endpoint);
                    return data.oneTeamMatch;
                });
                const nameTeamMatch = await Promise.all(name);
                setTeamName(nameTeamMatch);
            } catch (error) {
                console.log(error)
                throw error.message;
            }
        }
        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };
        
        
        const fetchReservationsInfo = async (team) => {
            console.log("team", team)
            try {
                const promises = await Promise.all(team?.map(async (newTeam) => {
                    const endpoint = `/reservationTeamMatch/${newTeam?.TeamMatchId}`;
                    try {
                        const { data } = await axios(endpoint);
                        console.log("dataaaaaa", data);
                        if (data?.status) {
                            const formattedReservation = {
                                ...data.reservation,
                                dateTimeStart: formatDate(data.reservation.dateTimeStart),
                                dateTimeEnd: formatDate(data.reservation.dateTimeEnd),
                            };
                            return formattedReservation;
                        } else {
                            throw new Error('La solicitud no tuvo éxito.');
                        }
                    } catch (apiError) {
                        console.log(`Error en la solicitud para ${newTeam?.TeamMatchId}: ${apiError.message}`);
                        return 'lo que quieras';
                    }
                }));
                
                console.log("filteredReservations", promises)
                setInfoReservation(promises);
                fetchAnfitrionInfo(promises);
            } catch (error) {
                
                console.log("Error general:", error);
            }
            
        };
        
        
        
        const fetchTeamMatch = async () => {
            try {
                const endpoint = `/teamMatchByUser/${userLogeado?.id}`;
                const { data } = await axios(endpoint);
                console.log(data)
                if (data?.status) {
                    setTeamMatch(data.teamMatchByUser);
                    fetchReservationsInfo(data.teamMatchByUser);
                    fetchTeamMatchName(data.teamMatchByUser)
                }
            } catch (error) {
                console.log(error)
                throw error.message;
            }
        };
        fetchTeamMatch();
    }, [userLogeado]);

    return (
        <div className={styles.holeMiReserva}>
            {infoReservation?.map((reservation, index) => (
                <div key={index} className={styles.cardReservationContainer}>
                    <h1 className={styles.textTitle}>Reserva de {infoUser[index] || 'Nombre no disponible'}</h1>
                    <div className={styles.divDeInfo}>
                        <label className = {styles.textInfo}>Equipo</label>
                        <label className = {styles.textInfo}>{teamName[index]?.name || 'Equipo no disponible'}</label>
                    </div>
                    <div className={styles.divDeInfo}>
                        <label className = {styles.textInfo}>Inició</label>
                        <label className = {styles.textInfo}>{reservation?.dateTimeStart || 'No disponible'}</label>
                    </div>
                    <div className={styles.divDeInfo}>
                        <label className = {styles.textInfo}>Terminó</label>
                        <label className = {styles.textInfo}>{reservation?.dateTimeEnd || 'No disponible'}</label>
                    </div>
                    <div className={styles.divDeInfo}>
                        <label className = {styles.textInfo}>Precio</label>
                        <label className = {styles.textInfo}>{reservation?.totalCost || 'No disponible'}</label>
                    </div>

                    <Resultado teamMatch={reservation?.TeamMatchId} setResultado={setResultado} resultado={resultado} setValorarUsuarios={setValorarUsuarios} />
                    <ValorarUsuarios teamMatch={reservation?.TeamMatchId} setValorarUsuarios={setValorarUsuarios} valorarUsuarios={valorarUsuarios}
          />
        
                    <button onClick={() => setResultado(true)} className={styles.finishBtn}>Juego Terminado</button>
                </div>
            ))}
        </div>
    );

}

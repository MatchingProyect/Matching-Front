import styles from './CardReservation.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ValorarUsuarios from '../valorarUsuarios/ValorarUsuarios';


export default function CardReservation() {
    const [infoReservation, setInfoReservation] = useState([]);
    const [infoUser, setInfoUser] = useState([]);
    const [teamMatch, setTeamMatch] = useState([]);
    const [teamName, setTeamName] = useState([]);
    const [valorarUsuarios, setValorarUsuarios] = useState(false)
    const userLogeado = useSelector((state) => state.user?.datauser?.user);

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
                throw error.message;
            }
        }
        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };

        const fetchReservationsInfo = async (team) => {
            try {
                const promises = await Promise.all(team?.map(async (newTeam) => {
                    try {
                        const endpoint = `/reservationTeamMatch/${newTeam?.TeamMatchId}`;
                        const { data } = await axios(endpoint);
                        if (data.status) {
                            const formattedReservation = {
                                ...data.reservation,
                                dateTimeStart: formatDate(data.reservation.dateTimeStart),
                                dateTimeEnd: formatDate(data.reservation.dateTimeEnd),
                            };
                            return formattedReservation;
                        } else {
                            return 'lo que quieras';
                        }
                    } catch (error) {
                        console.log(error.message);
                    }
                }));
                const filteredReservations = promises.filter(reservation => reservation !== 'lo que quieras');
                setInfoReservation(filteredReservations);
                fetchAnfitrionInfo(filteredReservations);
            } catch (error) {
                throw error.message;
            }
        };
        const fetchTeamMatch = async () => {
            try {
                const endpoint = `/teamMatchByUser/${userLogeado?.id}`;
                const { data } = await axios(endpoint);
                if (data.status) {
                    setTeamMatch(data.teamMatchByUser);
                    fetchReservationsInfo(data.teamMatchByUser);
                    fetchTeamMatchName(data.teamMatchByUser)
                }
            } catch (error) {
                throw error.message;
            }
        };
        fetchTeamMatch();
    }, [userLogeado]);




    // useEffect(() => {
        
    //     const fetchReservationsInfo = async () => {
    //         try {
    //             const promises = await Promise.all(teamMatch?.map(async (teamMatch) => {
                    
    //                 const endpoint = `/reservationTeamMatch/${teamMatch?.TeamMatchId}`;
    //                 const { data } = await axios(endpoint);
    //                 return data.reservation[0];
    //             }));
    //             console.log('un mensaje', promises)
    //             const filteredReservations = promises.filter(reservation => reservation !== undefined);
    //             setInfoReservation(filteredReservations);
    //         } catch (error) {
    //             throw error.message;
    //         }
    //     };
    //     fetchReservationsInfo();
    // }, [teamMatch]);

    // useEffect(() => {
    //     const fetchAnfitrionInfo = async () => {
    //         try {
    //             const promises = infoReservation?.map(async (info) => {
    //                 const endpoint = `/users/${info.UserId}`;
    //                 const { data } = await axios(endpoint);
    //                 return data.userFound.user['displayName'];
    //             });
    //             const nameAnfitrion = await Promise.all(promises);
    //             setInfoUser(nameAnfitrion);
    //         } catch (error) {
    //             throw error.message;
    //         }
    //     };
    //     fetchAnfitrionInfo();
    // }, [infoReservation]);
    // console.log(infoReservation)

    // useEffect(() => {
    //     const fetchTeamMatchName = async () => {
    //         try {
    //             const name = teamMatch?.map(async (nombreTeam) => {
    //                 const endpoint = `/teamMatch/${nombreTeam.TeamMatchId}`;
    //                 const { data } = await axios(endpoint);
    //                 return data.oneTeamMatch;
    //             });
    //             const nameTeamMatch = await Promise.all(name);
    //             setTeamName(nameTeamMatch);
    //         } catch (error) {
    //             throw error.message;
    //         }
    //     }
    //     fetchTeamMatchName()
    // }, [teamMatch])

    console.log('xd', infoReservation)

    return (
        <div>
            {infoReservation?.map((reservation, index) => (
                <div key={index} className={styles.cardReservationContainer}>
                    <h2>Anfitrión: {infoUser[index] || 'Nombre no disponible'}</h2>
                    <h2>Nombre Equipo: {teamName[index]?.name || 'Equipo no disponible'}</h2>
                    <h3>Tiempo Inicio: {reservation?.dateTimeStart || 'No disponible'}</h3>
                    <h3>Tiempo Fin: {reservation?.dateTimeEnd || 'No disponible'}</h3>
                    <h3>Precio Total: {reservation?.totalCost || 'No disponible'}</h3>
                    <br />
                    <ValorarUsuarios teamMatch={reservation.TeamMatchId
                    } setValorarUsuarios={setValorarUsuarios} valorarUsuarios={valorarUsuarios} />
                    {valorarUsuarios ? null : <button onClick={() => setValorarUsuarios(true)}>Juego Terminado</button>}
                </div>
            ))}
        </div>
    );

}

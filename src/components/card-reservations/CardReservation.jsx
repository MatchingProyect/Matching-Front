import styles from './CardReservation.module.css';
import CardsReservation from '../cards-reservations/CardsReservation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


export default function CardReservation() {
    const [infoReservation, setInfoReservation] = useState([]);
    const [infoUser, setInfoUser] = useState([]);
    const [teamMatch, setTeamMatch] = useState([]);
    const [teamName, setTeamName] = useState([]);
    const userLogeado = useSelector((state) => state.user?.datauser?.user);

    useEffect(() => {
        const fetchTeamMatch = async () => {
            try {
                const endpoint = `/teamMatchByUser/${userLogeado.id}`;
                const { data } = await axios(endpoint);
                if (data.status) {
                    const teamMatch = data.teamMatchByUser?.map((teamMatch) => {
                        return teamMatch;
                    });
                    setTeamMatch(teamMatch);
                }
            } catch (error) {
                throw error.message;
            }
        };
        fetchTeamMatch();
    }, []);

    console.log('bbcita', infoReservation)

    useEffect(() => {
        const fetchReservationsInfo = async () => {
            try {
                const promises = teamMatch?.map(async (teamMatch) => {
                    const endpoint = `/reservationTeamMatch/${teamMatch.TeamMatchId}`;
                    const { data } = await axios(endpoint);
                    return data.reservation[0];
                });
                const allInfoReservation = await Promise.all(promises);
                setInfoReservation(allInfoReservation);
            } catch (error) {
                throw error.message;
            }
        };
        fetchReservationsInfo();
    }, [teamMatch]);

    useEffect(() => {
        const fetchAnfitrionInfo = async () => {
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
        fetchAnfitrionInfo();
    }, [infoReservation]);
    
    useEffect(() => {
        const fetchTeamMatchName = async() => {
            try {
                const name = teamMatch?.map(async (teamMatch) => {
                    const endpoint = `/teamMatch/${teamMatch.TeamMatchId}`;
                    const { data } = await axios(endpoint);
                    return data.oneTeamMatch;
                });
                const nameTeamMatch = await Promise.all(name);
                setTeamName(nameTeamMatch);
            } catch (error) {
                throw error.message;
            }
        }
        fetchTeamMatchName()
    }, [teamMatch])

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
                </div>
            ))}
        </div>
    );
    
}

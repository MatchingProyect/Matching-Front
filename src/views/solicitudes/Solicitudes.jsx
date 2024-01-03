import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Solicitudes = () => {
    const [friendRequest, setFriendRequest] = useState(null);
    const user = useSelector((state) => state.user.user.user);
    console.log(user)
    const id = user.id;

    console.log(id)
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios(`/friendRequest/${id}`);
                if (data.status) {
                    const friendRequestData = data.getFriendRequest;
                    setFriendRequest(friendRequestData);
                }
            } catch (error) {
                throw error.message;
            }
        };

        fetchData();
    }, [id]);

    const agregarAmigo = async () => {
        try {
            await axios.post('/addFriend', {
                user1Id: friendRequest.userQueMando.id,
                user2Id: friendRequest.user.id,
                status: true,
            });
        } catch (error) {
            throw error.message;
        }
    };

    const rechazarAmigo = async () => {
        try {
            await axios.post('/addFriend', {
                user1Id: friendRequest.userQueMando.id,
                user2Id: friendRequest.user.id,
                status: false,
            });
        } catch (error) {
            throw error.message;
        }
    };

    if (!friendRequest) return null;

    return (
        <div>
            <h2>solicitudes</h2>
            <div>
                <img src={friendRequest.userQueMando.avatarImg} alt={friendRequest.userQueMando.name} />
                <h4>{friendRequest.userQueMando.name}</h4>
                <button onClick={agregarAmigo}>Aceptar</button>
                <button onClick={rechazarAmigo}>Rechazar</button>
                <button onClick={() => setSolicitudes(false)}>x</button>
            </div>
        </div>
    );
};

export default Solicitudes;

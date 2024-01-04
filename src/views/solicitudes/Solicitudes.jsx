import axios from 'axios'
import { fr } from 'date-fns-jalali/locale';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Solicitudes = () => {
    const [request, setRequest] = useState([])
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
                    setRequest(friendRequestData)
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
                user1Id: request.userQueMando.id,
                user2Id: request.user.id,
                status: true,
            });
        } catch (error) {
            throw error.message;
        }
    };

    const rechazarAmigo = async () => {
        try {
            await axios.post('/addFriend', {
                user1Id: request.userQueMando.id,
                user2Id: request.user.id,
                status: false,
            });
        } catch (error) {
            throw error.message;
        }
    };

    
    //<img src={`${request.userQueMando.avatarImg}`} alt={request.userQueMando.name} /> tira error

    return (
        <div>
            <h2>Solicitudes</h2>
            {request.map((friendRequest, index) => (
                <div key={index}>
                    <h4>{friendRequest.userQueMando.name}</h4>
                    <button onClick={() => agregarAmigo(friendRequest.userQueMando.id, friendRequest.user.id)}>Aceptar</button>
                    <button onClick={() => rechazarAmigo(friendRequest.userQueMando.id, friendRequest.user.id)}>Rechazar</button>
                    <Link to='/home' ><button>x</button></Link>
                </div>
            ))}
        </div>
    );
};

export default Solicitudes;

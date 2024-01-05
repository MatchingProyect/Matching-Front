import axios from 'axios'
import { fr } from 'date-fns-jalali/locale';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Solicitudes = () => {
    const [request, setRequest] = useState([])
    const [infoSoli, setInfoSoli] = useState([])
    const user = useSelector((state) => state.user.user.user);
    console.log('hola',user)
    const id = user?.id;

    useEffect(() => {
        
            const infoSoliFetch = async () => {
                try {
                    const { data } = await axios(`/users/${request?.user?.FriendRId}`);
                    if (data) setInfoSoli(data.userFound.user);
                } catch (error) {
                    throw error.message;
                }
            };
            infoSoliFetch();
        
    }, [request]);

    console.log('aaa',request)



    
  
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('id Soli',id)
                const { data } = await axios(`/friendRequest/${id}`);
                console.log("friendRequest", data)
                if (data.status) {
                    const friendRequestData = data.getFriendRequest;
                    setRequest(friendRequestData)
                }
            } catch (error) {
                throw error.message;
            }
        };

        fetchData();
    }, []);

    const agregarAmigo = async () => {
        try {
            const {data} = await axios.post('/addFriend', {
                FriendId: request.userQueRecibe.FriendId,
                UserId: request.user.UserId,
                status: "true",
            });
            if(data.status) console.log('amigo agregado')
        } catch (error) {
            throw error.message;
        }
    };

    const rechazarAmigo = async () => {
        try {
            await axios.post('/addFriend', {
                user1Id: request.userQueRecibe.FriendId,
                user2Id: request.user.UserId,
                status: "rechazado",
            });
        } catch (error) {
            throw error.message;
        }
    };

    
    //

    return (
        <div>
            <h2>Solicitudes</h2>
            {request?

                (<div>
                    <img src={`${infoSoli?.avatarImg}`} alt={infoSoli?.displayName} /> 
                    <h4>{infoSoli?.displayName}</h4>
                    <button onClick={() => agregarAmigo(request.user.id, request.user.id)}>Aceptar</button>
                    <button onClick={() => rechazarAmigo(request.user.id, request.user.id)}>Rechazar</button>
                    <Link to='/home' ><button>x</button></Link>
                </div>) : null
            }
        </div>
    );
};

export default Solicitudes;

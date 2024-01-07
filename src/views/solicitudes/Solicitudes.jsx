import axios from 'axios'
import { fr } from 'date-fns-jalali/locale';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Solicitudes = () => {
    const [request, setRequest] = useState([])
    const [infoSoli, setInfoSoli] = useState([])
    const user = useSelector((state) => state.user.user.user);
    
    const id = user?.id;

    useEffect(() => {
        
            const infoSoliFetch = async () => {
                try {
                    let allUsers = []
                    const usersRequest = await Promise.all(request?.map( async(req) =>{
                        const { data } = await axios(`/users/${req.UserId}`);
                        if (data) allUsers.push(data)
                    }))
                    if(usersRequest) setInfoSoli(allUsers)
                } catch (error) {
                    throw error.message;
                }
            };
            infoSoliFetch();
        
    }, [request]);

    

  
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const { data } = await axios(`/friendRequest/${id}?userType=friend`);
                
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

    const agregarAmigo = async (friend, user) => {
        try {
            const {data} = await axios.post('/addFriend', {
                FriendId: friend,
                UserId: user,
                status: "true",
            });
            if(data.status) console.log('amigo agregado')
        } catch (error) {
            throw error.message;
        }
    };

    const rechazarAmigo = async (friend, user) => {
        try {
            await axios.post('/addFriend', {
                FriendId: friend,
                UserId: user,
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
            {request?.map(request => {
                const filteredInfo = infoSoli.filter(user => request.UserId === user.userFound.user.id)
                console.log(filteredInfo)
                return (
                    <div>
                    <img src={`${filteredInfo[0]?.userFound?.user?.avatarImg}`} alt={filteredInfo[0]?.userFound?.user?.displayName} /> 
                    <h4>{filteredInfo[0]?.userFound?.user?.displayName}</h4>
                    <button onClick={() => agregarAmigo(request.UserId, request.FriendRId)}>Aceptar</button>
                    <button onClick={() => rechazarAmigo(request.UserId, request.FriendRId)}>Rechazar</button>
                    <Link to='/home' ><button>x</button></Link>
                </div>
                )
               
        })
}
        </div>
    );
};



export default Solicitudes;

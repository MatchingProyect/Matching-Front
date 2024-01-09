import axios from 'axios'
import { fr } from 'date-fns-jalali/locale';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchUser } from '../../redux/reducer';
import styles from './solicitudes.module.css'
// import Swal from 'sweetalert2'
import NavbarLow from '../../components/navbarLow/navbarLow';

const Solicitudes = () => {
    const [request, setRequest] = useState([])
    const [infoSoli, setInfoSoli] = useState([])
    const user = useSelector((state) => state.user.user.user);

    const dispatch = useDispatch()
    
    const id = user?.id;

    console.log('ddd',request)

    useEffect(() => {
        
            const infoSoliFetch = async () => {
                try {
                    let allUsers = []
                    console.log('abcd', request)
                    if(request.length > 0){
                        const usersRequest = await Promise.all(request?.map( async(req) =>{
                            console.log('luisito',req.UserId)
                            const { data } = await axios(`/users/${req.UserId}`);
                            
                            console.log('rrr',data)
                            if (data) allUsers.push(data)
                        }))
                    console.log('bb',usersRequest)
                        if(usersRequest) setInfoSoli(allUsers)
                        
                    }
                } catch (error) {
                    throw error.message;
                }
            };
            infoSoliFetch();
        
    }, [request]);

    

  
    console.log(request)

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const { data } = await axios(`/friendRequest/${id}?userType=friend`);
                console.log('aa', data)
                if (data.status) {
                    const friendRequestData = data.getFriendRequest;
                    console.log('ccc', friendRequestData)
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
            if(data.status){
                dispatch(fetchUser())
                // Swal.fire({
                //     position: "center",
                //     icon: "success",
                //     title: "Amigo agregado exitosamente",
                //     showConfirmButton: false,
                //     timer: 1500
                //   });
            } 
        } catch (error) {
            throw error.message;
        }
    };

    const rechazarAmigo = async (friend, user) => {
        try {
            const rechazado = await axios.post('/addFriend', {
                FriendId: friend,
                UserId: user,
                status: "rechazado",
            });
            if(rechazado) dispatch(fetchUser())
        } catch (error) {
            throw error.message;
        }
    };

    console.log('luquitas',infoSoli)
    //

    return (
        <div>
            <div>
            <h2>Solicitudes</h2>
            
            </div>
            
            {request?.map(request => {
                {console.log('solicitudes',request.status)}
                if(request.estado === "true" || request.estado === "rechazado") return (<h2>No hay Solicitudes</h2>)
                const filteredInfo = infoSoli.filter(user => request.UserId === user.userFound.user.id)
                {console.log('xd',request.UserId)}
                return (
                    <div className={styles.container}>
                        <div className={styles.profile}>
                    <img  src={`${filteredInfo[0]?.userFound?.user?.avatarImg}`} alt={filteredInfo[0]?.userFound?.user?.displayName} /> 
                    <h4>{filteredInfo[0]?.userFound?.user?.displayName}</h4>
                    </div>
                    <div className={styles.buttons}>
                    <button className={styles.accept} onClick={() => agregarAmigo(request.UserId, request.FriendRId)}>Aceptar</button>
                    <button onClick={() => rechazarAmigo(request.UserId, request.FriendRId)}>Rechazar</button>
                    
                    </div>
                </div>
                )
               
        })
}
    <NavbarLow/>
        </div>
    );
};



export default Solicitudes;

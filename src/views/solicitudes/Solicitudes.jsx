import axios from 'axios'
import { fr } from 'date-fns-jalali/locale';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchUser } from '../../redux/reducer';
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
                let allUsers = [];
                for (const req of request) {
                    try {
                        const { data } = await axios(`/users/${req.UserId}`);
                        console.log('rrr', data);
                        if (data) {
                            allUsers.push(data);
                        }
                    } catch (error) {
                        console.error('Error fetching user:', error);
                        
                    }
                }
                setInfoSoli(allUsers);
            } catch (error) {
                console.error('Error in infoSoliFetch:', error);
            }
        };
        
        infoSoliFetch();
        
    }, [request]);

    

  
    

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

    
    //

    return (
        <div>
            <h2>Solicitudes</h2>
            {request?.map(request => {
                const filteredInfo = infoSoli.filter(user => request.UserId === user.userFound.user.id)
                
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
    <NavbarLow />
        </div>
    );
};



export default Solicitudes;

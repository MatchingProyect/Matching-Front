import axios from 'axios'
import  { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../redux/reducer';
import styles from './solicitudes.module.css'
import NavbarLow from '../../components/navbarLow/navbarLow';

const Solicitudes = () => {
    const [request, setRequest] = useState([])
    const [infoSoli, setInfoSoli] = useState([])
    const user = useSelector(state =>  state.user?.datauser?.user);

    const dispatch = useDispatch()
    const id = user?.id;
    console.log("id", id)

    useEffect(() => {
        
        const infoSoliFetch = async () => {
            try {
                let allUsers = []
                if(request.length > 0){
                    const usersRequest = await Promise.all(request?.map( async(req) =>{
                        const { data } = await axios(`/users/${req.UserId}`);                
                        if (data) allUsers.push(data)
                    }))
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

    return (
        <div>
            <div>
                <h2>Solicitudes</h2>
            </div>
            
            {request?.map(requestItem => {
                
                if (requestItem.estado === "true" || requestItem.estado === "rechazado") {
                    return (<h2 key={requestItem.id}>No hay Solicitudes</h2>);
                }

                const filteredInfo = infoSoli.filter(user => requestItem.UserId === user.userFound.user.id);

                return (
                    <div key={requestItem.id} className={styles.container}>
                        <div className={styles.profile}>
                            <img src={`${filteredInfo[0]?.userFound?.user?.avatarImg}`} alt={filteredInfo[0]?.userFound?.user?.displayName} /> 
                            <h4>{filteredInfo[0]?.userFound?.user?.displayName}</h4>
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.accept} onClick={() => agregarAmigo(requestItem.UserId, requestItem.FriendRId)}>Aceptar</button>
                            <button onClick={() => rechazarAmigo(requestItem.UserId, requestItem.FriendRId)}>Rechazar</button>
                        </div>
                    </div>
                );
            })}
            <NavbarLow />
        </div>

    );
};



export default Solicitudes;

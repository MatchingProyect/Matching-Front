import axios from 'axios'
import  { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUpdateFriend } from '../../redux/reducer';
import styles from './solicitudes.module.css'
import NavbarLow from '../../components/navbarLow/navbarLow';

const Solicitudes = () => {
    const [request, setRequest] = useState([])
    const [infoSoli, setInfoSoli] = useState([])
    const user = useSelector(state =>  state.user?.datauser?.user);
    const dispatch = useDispatch()
    const id = user?.id;
    let allUsers = []

    useEffect(() => {
        
        const infoSoliFetch = async () => {
            try {
                if(request.length > 0){
                    const usersRequest = await Promise.all(request?.map( async(req) =>{
                        const { data } = await axios(`/users/${req.UserId}`);                
                        if (data) allUsers.push(data)
                    }))
                    if(usersRequest) setInfoSoli(allUsers)   
                    console.log(allUsers)         
                }
            } catch (error) {
                throw error.message;
            }
        };
        infoSoliFetch();
        
    }, [request]);

    
    useEffect(() => {
        const fetchData = async () => {
            if(id) {
                try {
                    const { data } = await axios(`/friendRequest/${id}?userType=friend`);
                    if (data.status) {
                        const friendRequestData = data.getFriendRequest;
                        setRequest(friendRequestData)
                    }
                    console.log(data)
                } catch (error) {
                    throw error.message;
                }
            }

        };

        fetchData();
    }, [id]);

    const agregarAmigo = async (friend, user) => {
        try {
            console.log(friend, user)
            const {data} = await axios.post('/addFriend', {
                FriendId: friend,
                UserId: user,
                status: "true",
            });

            const updatedAllUsers = infoSoli.filter((ele) => {
                if (ele.userFound?.user?.id === friend) {
                    const friendNew = ele.userFound?.user;
                    dispatch(fetchUpdateFriend(friendNew)) 
                    return false; 
                }
                return true; 
            });

            setInfoSoli(updatedAllUsers) 

        } catch (error) {
            console.log(error)
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
            if(rechazado) {
                // dispatch(fetchUser())
            }
        } catch (error) {
            throw error.message;
        }
    };

    return (
        <div>
            <div>
                <h2>Solicitudes</h2>
            </div>
            {
                infoSoli.length? null : 
                <h2>NO HAY SOLICITUDES DE AMISTAD</h2>
            }

            {infoSoli?.map(requestItem => {
                return (

                    <div key={requestItem.id} className={styles.container}>
                        <div className={styles.profile}>
                            <img src={`${requestItem?.userFound?.user?.avatarImg}`} alt={requestItem?.userFound?.user?.displayName} /> 
                            <h4>{requestItem?.userFound?.user?.displayName}</h4>
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.accept} onClick={() => agregarAmigo(requestItem?.userFound?.user?.id, id )}>Aceptar</button>
                            <button onClick={() => rechazarAmigo(requestItem?.userFound?.user?.id, id)}>Rechazar</button>
                        </div>
                    </div>
                );
            })}
            <NavbarLow />
        </div>

    );
};



export default Solicitudes;

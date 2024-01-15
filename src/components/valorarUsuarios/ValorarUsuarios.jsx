import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Resultado from '../resultado/Resultado';
import { useSelector } from 'react-redux';

const ValorarUsuarios = ({valorarUsuarios, setValorarUsuarios, teamMatch}) => {

    const [idUsuarios, setIdUsuarios] = useState([])
    const [usuarios, setUsuarios] = useState();
    const [valoracion, setValoracion] = useState({});
    const [resultado, setResultado] = useState(false)

    const userLogeado = useSelector((state) => state.user?.datauser?.user);


    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const idUsers = await axios(`/usersByTeam/${teamMatch}`)
                setIdUsuarios(idUsers.data.userByTeam)
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                
            }
        };
        fetchUsers()
    },[])

    useEffect(() => {
        const usuariosAValorar = async () => {
            try {
                
                const usersData = await Promise.all(
                    idUsuarios?.map(async (idUser) => {
                        try {
                            const { data } = await axios(`/users/${idUser.UserId}`);
                            if (data.status) return data.userFound;
                        } catch (error) {
                            throw error.message;
                        }
                    })
                );
                const userFiltered = usersData.filter(users =>  (userLogeado.id != users.user.id))
                    console.log("userFiltered", userFiltered)
                setUsuarios(userFiltered);
            } catch (error) {
                console.error(error);
            }
        };
    
        usuariosAValorar();
    }, [idUsuarios]);
    
    const handleChange = (event, UserId) => {
        setValoracion({
            ...valoracion,
            [UserId]: event.target.value
        });
        console.log(valoracion);
    }

    const postValoracion = async (id) => {
        console.log("valoracion",`/valoraciones/${id}`);
        try {
            const { data } = await axios.post(`/valoraciones/${id}`, { valoracion: valoracion[id] });
            if (data.status) {
                setValoracion({});
                setResultado(true)
                setValorarUsuarios(false);
            } 
            else return console.log(data.message);
        } catch (error) {
            console.log(error)
            throw Error(error.message);
        }
    }
    
    const handleSubmit = async (id) => {
        console.log("handleSubmit")
        await postValoracion(id);
    }
    
    
    return (
        <div>
            <button onClick={() => setValorarUsuarios(false)}>x</button>
    
            {usuarios?.map((user, index) => (
                <div key={index}>
                    <h2>Deja una valoracion a: {user.user.displayName}</h2>
                    <form >
                        <label htmlFor="valoracion">Valorar usuario</label>
                        <input
                            type="text"
                            name="valoracion"
                            value={valoracion[user.user.id]}
                            onChange={(event) => handleChange(event, user.user.id)}
                        />
                    </form>
                    <button type="submit" onClick={() => handleSubmit(user.user.id)}>Enviar</button>
                </div>

            ))}
            <Resultado teamMatch={teamMatch} setResultado={setResultado} resultado={resultado} />
        </div>
    )
}

export default ValorarUsuarios
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Resultado from '../resultado/Resultado';

const ValorarUsuarios = ({valorarUsuarios, setValorarUsuarios, teamMatch}) => {

    const [idUsuarios, setIdUsuarios] = useState([])
    const [usuarios, setUsuarios] = useState();
    const [valoracion, setValoracion] = useState({});
    const [resultado, setResultado] = useState(false)

    console.log('luquitas wapo',idUsuarios)

    console.log('luisito', teamMatch)

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
    
                setUsuarios(usersData);
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
    }

    const postValoracion = async (id) => {
        try {
            const { data } = await axios.post(`/valoraciones/${id}`, { valoracion: valoracion[id] });
            if (data.status) {
                setValoracion({});
                setValorarUsuarios(false);
                setResultado(true)
            } 
            else return console.log(data.message);
        } catch (error) {
            throw Error(error.message);
        }
    }
    
    const handleSubmit = async (event, id) => {
        event.preventDefault();
        await postValoracion(id);
    }
    
    console.log('aqui wapo', usuarios)
    
    if (!valorarUsuarios) return null;
    
    return (
        <div>
            <button onClick={() => setValorarUsuarios(false)}>x</button>
    
            {usuarios?.map((user, index) => (
                <div key={index}>
                    <h2>Deja una valoracion a: {user.user.displayName}</h2>
                    <form onSubmit={(event) => handleSubmit(event, user.user.id)}>
                        <label htmlFor="valoracion">Valorar usuario</label>
                        <input
                            type="text"
                            name="valoracion"
                            value={valoracion[user.user.id]}
                            onChange={(event) => handleChange(event, user.user.id)}
                        />
                    </form>
                </div>
            ))}
            <Resultado teamMatch={teamMatch} setResultado={setResultado} resultado={resultado} />
            <button type="submit">Enviar</button>
        </div>
    )
}

export default ValorarUsuarios
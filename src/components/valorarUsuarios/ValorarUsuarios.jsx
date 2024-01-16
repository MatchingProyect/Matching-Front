import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Resultado from '../resultado/Resultado';
import { useSelector } from 'react-redux';

const ValorarUsuarios = ({ valorarUsuarios, setValorarUsuarios, teamMatch}) => {
    const [idUsuarios, setIdUsuarios] = useState([]);
    const [usuarios, setUsuarios] = useState();
    const [valoracion, setValoracion] = useState({});
   
    const userLogeado = useSelector((state) => state.user?.datauser?.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const idUsers = await axios(`/usersByTeam/${teamMatch}`);
                setIdUsuarios(idUsers.data.userByTeam);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };
        fetchUsers();
       
    }, []);

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
                const userFiltered = usersData.filter(users => (userLogeado.id !== users.user.id));
                setUsuarios(userFiltered);
            } catch (error) {
                console.error(error);
            }
        };

        usuariosAValorar();
    }, [idUsuarios, userLogeado]);

    const handleChange = (event, UserId) => {
        setValoracion({
            ...valoracion,
            [UserId]: event.target.value
        });
        console.log(valoracion);
    };

    const postValoracion = async (id) => {
        console.log("valoracion", `/valoraciones/${id}`);
        try {
            const { data } = await axios.post(`/valoraciones/${id}`, { valoracion: valoracion[id] });
            if (data.status) {
                setValoracion({});
                setValorarUsuarios(false);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
            throw Error(error.message);
        }
    };

    const handleSubmit = async (id) => {
        console.log("handleSubmit");
        await postValoracion(id);
    };

    if (!valorarUsuarios || !usuarios) return null;

    return (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={()=>setValorarUsuarios(false) }>x</button>
            {usuarios.map((user, index) => (
              <div key={index}>
                <h2 className={styles.modalTitle}>Deja una valoración a: <span className={styles.spanDisplayName}>{user.user.displayName}</span></h2>
                <form className={styles.modalForm}>
                  <label className={styles.modalLabel} htmlFor="valoracion">Valorar usuario</label>
                  <input
                    className={styles.modalInput}
                    type="text"
                    name="valoracion"
                    value={valoracion[user.user.id] || ''}
                    onChange={(event) => handleChange(event, user.user.id)}
                  />
                </form>
                <button className={styles.modalButton} type="submit" onClick={() => handleSubmit(user.user.id)}>✅</button>
              </div>
            ))}
            
          </div>
        </div>
      );
};

export default ValorarUsuarios;

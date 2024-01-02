import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Solicitudes = ({solicitudes, setSolicitudes}) => {

    const user = useSelector((state)=>state.user.user)

    if(!solicitudes) return null

    const id = user.id

    useEffect(()=>{
       const fetchData = async()=>{
        try {
           const {data} = await axios(`/friendRequest/${id}`)
           if(data.status) {
            const friendRequest = data.getFriendRequest
            return friendRequest
           }

        } catch (error) {
            throw error.message
        }
       }
       fetchData()
    },[])


    const agregarAmigo = async({friendRequest, status})=>{
        try {
         await axios.post('/addFriend', friendRequest.userQueMando.id, friendRequest.user.id, status= "true" )

        } catch (error) {
            throw error.message
        }
    }

    const rechazarAmigo = async({friendRequest, status})=>{
        try {
         await axios.post('/addFriend', friendRequest.userQueMando.id, friendRequest.user.id, status= "false" )

        } catch (error) {
            throw error.message
        }
    }


  return (
    <div>
        <h2>solicitudes</h2>
        <div>
            <img src={friendRequest.userQueMando.avatarImg} alt={friendRequest.userQueMando.name} />
        <h4>{friendRequest.userQueMando.name}</h4>

        <button onClick={agregarAmigo} >Aceptar</button>
        <button onClick={rechazarAmigo} >Rechazar</button>

        </div>
    </div>
  )
}

export default Solicitudes;
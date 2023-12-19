import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
    const [userDetail, setUserDetail] = useState([])
    const {id} = useParams()
    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const {data} = await axios(`/users/${id}`)
                if(data.status) setUserDetail(data.userFound)
            } catch (error) {
                return error.message
            }
        }
        fetchData()
    }, [])

  return (
        <>
        <h3>Nombre:{userDetail?.name} Apellido:{userDetail?.lastName}</h3>
        <p>Genero: {userDetail?.gender} </p>
        <p>dayBirth: {userDetail?.dayBirth}</p>
        </>
  )
}

export default UserDetail
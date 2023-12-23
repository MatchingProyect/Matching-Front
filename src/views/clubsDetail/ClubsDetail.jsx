import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ClubsDetail= () => {
    const [clubsDetail, setClubsDetail] = useState([])
    const {id} = useParams()
    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const {data} = await axios(`/clubs/${id}`)
                if(data.status) setClubsDetail(data.clubById)
            } catch (error) {
                return error.message
            }
        }
        fetchData()
    }, [])

  return (
        <>
        <h3>Nombre:{clubsDetail?.name} Apellido:{clubsDetail?.lastName}</h3>
        <p>Genero: {clubsDetail?.gender} </p>
        <p>dayBirth: {clubsDetail?.dayBirth}</p>
        </>
  )
}

export default ClubsDetail
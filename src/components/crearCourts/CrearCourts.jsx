import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styles from './CrearCourts.module.css';
import { fetchCourts } from '../../redux/reducer';

const CrearCourts = ({ crearCourt, setCrearCourt }) => {
  const sports = useSelector((state) => state.user.allSports);
  const clubs = useSelector((state) => state.user.allClubs);
  const location = useSelector((state) => state.user.allLocations);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priceFee: '',
    warrantyReservation: '',
    grassType: '',
    lighting: '',
    doorsType: '',
    wallsType: '',
    reputation: '',
    horarioInicio: '',
    horarioCierre: '',
    ClubId: '', 
    SportId: '', 
    LocationId: '', 
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClubChange = (event) => {
    setFormData({
      ...formData,
      ClubId: event.target.value,
    });
  };
  
  const handleSportChange = (event) => {
    setFormData({
      ...formData,
      SportId: event.target.value,
    });
  };
  
  const handleLocationChange = (event) => {
    setFormData({
      ...formData,
      LocationId: event.target.value,
    });
  };

  const {
    name,
    description,
    priceFee,
    warrantyReservation,
    grassType,
    lighting,
    doorsType,
    wallsType,
    reputation,
    horarioInicio,
    horarioCierre,
    ClubId,
    SportId,
    LocationId
  } = formData;

  const onSubmitCourts = async () => {
    try {
      const endPoint = '/courts';
      const { data } = await axios.post(endPoint,{
        name,
        description,
        priceFee: Number(priceFee),
        warrantyReservation,
        grassType,
        lighting,
        doorsType,
        wallsType,
        reputation,
        horarioInicio,
        horarioCierre,
        ClubId,
        SportId,
        LocationId});

      console.log(data);
      if (data.status) {
         dispatch(fetchCourts());
         setCrearCourt(false);
      }
    } catch (error) {
      console.log(error);
      throw error.message;
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await onSubmitCourts();
    } catch (error) {
      console.log(formData)
      console.log(error);
      throw error.message;
    }
  }
  if (!crearCourt) return null;

  return (
    <div className={styles.holeCompContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Name</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Description</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="priceFee"
            value={formData.priceFee}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>PriceFee</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="warrantyReservation"
            value={formData.warrantyReservation}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Warranty</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="grassType"
            value={formData.grassType}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>GrassType</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="lighting"
            value={formData.lighting}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Lighting</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="doorsType"
            value={formData.doorsType}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>DoorsType</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="wallsType"
            value={formData.wallsType}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>WallsType</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="reputation"
            value={formData.reputation}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Reputation</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="horarioInicio"
            value={formData.horarioInicio}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Horario Inicio</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="horarioCierre"
            value={formData.horarioCierre}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Horario Cierre</label>
        </div>


        <div className={styles.inputContainer}>
          <select id="clubSelect" className={styles.input} onChange={handleClubChange}>
            {clubs?.map(club => (
              <option key={club.id} value={club.id}>
                {club.name}
              </option>
            ))}
          </select>
          <label htmlFor="clubSelect" className={styles.label}>Club</label>
        </div>
        <div className={styles.inputContainer}>


          <select id="sportSelect" className={styles.input} onChange={handleSportChange}>
            {sports?.map(sport => (
              <option key={sport.id} value={sport.id}>
                {sport.name}
              </option>
            ))}
          </select>
          <label htmlFor="sportSelect" className={styles.label}>Sport</label>
        </div>
        <div className={styles.inputContainer}>

          <select id="locationSelect" className={styles.input} onChange={handleLocationChange}>
            {location?.map(location => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          <label htmlFor="locationSelect" className={styles.label}>Location</label>
        </div>
        <button type="submit" value='enviar' className={styles.btnSubmit}>Create</button>
      </form>
      <button onClick={() => setCrearCourt(false)} className={styles.close}>Cerrar</button>
    </div>
  )
}

export default CrearCourts
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styles from './CrearCourts.module.css';
import { fetchCourts } from '../../redux/reducer';
import validar from './validations';

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
    imgClub: '',
    horarioInicio: '',
    horarioCierre: '',
    ClubId: '',
    SportId: '',
    LocationId: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    priceFee: '',
    warrantyReservation: '',
    grassType: '',
    lighting: '',
    doorsType: '',
    wallsType: '',
    reputation: '',
    imgClub: '',
    horarioInicio: '',
    horarioCierre: '',
    ClubId: '',
    SportId: '',
    LocationId: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    }),
    setErrors(validar({
      ...formData,
      [event.target.name]: event.target.value
    }))
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
    imgClub,
    horarioInicio,
    horarioCierre,
    ClubId,
    SportId,
    LocationId
  } = formData;

  const onSubmitCourts = async () => {
    try {
      const endPoint = '/courts';
      const { data } = await axios.post(endPoint, {
        name,
        description,
        priceFee: Number(priceFee),
        warrantyReservation,
        grassType,
        lighting,
        doorsType,
        wallsType,
        reputation,
        imgClub,
        horarioInicio,
        horarioCierre,
        ClubId,
        SportId,
        LocationId
      });

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

  const generateOptions =() => {
    const options = [];
    for (let hour = 7; hour <= 24; hour++) {
      const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
      options.push(
        <option key={formattedHour} value={`${formattedHour}:00:00`}>
          {formattedHour}:00
        </option>
      );
    }
    return options;
  }

  if (!crearCourt) return null;

  return (
    <div className={styles.holeCompContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>

      <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Nombre</label>
          </div>
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Descripción</label>
          </div>
          {errors.description && <p className={styles.error}>{errors.description}</p>}
        </div>

        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
          <input
            type="text"
            name="priceFee"
            value={formData.priceFee}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Precio</label>
          </div>
          {errors.priceFee && <p className={styles.error}>{errors.priceFee}</p>}
        </div>

        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
          <input
            type="text"
            name="warrantyReservation"
            value={formData.warrantyReservation}
            onChange={handleChange}
            className={styles.input}
            />
          <label className={styles.label}>Garantía</label>
          </div>
            {errors.warrantyReservation && <p className={styles.error}>{errors.warrantyReservation}</p>}
        </div>

        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
          <input
            type="text"
            name="grassType"
            value={formData.grassType}
            onChange={handleChange}
            className={styles.input}
            />
          <label className={styles.label}>Tipo de Pasto</label>
          </div>
            {errors.grassType && <p className={styles.error}>{errors.grassType}</p>}
        </div>

        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
          <input
            type="text"
            name="lighting"
            value={formData.lighting}
            onChange={handleChange}
            className={styles.input}
            />
          <label className={styles.label}>Iluminación</label>
          </div>
            {errors.lighting && <p className={styles.error}>{errors.lighting}</p>}
        </div>

        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
          <input
            type="text"
            name="doorsType"
            value={formData.doorsType}
            onChange={handleChange}
            className={styles.input}
            />
          <label className={styles.label}>Tipo de Puerta</label>
          </div>
            {errors.doorsType && <p className={styles.error}>{errors.doorsType}</p>}
        </div>

        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
          <input
            type="text"
            name="wallsType"
            value={formData.wallsType}
            onChange={handleChange}
            className={styles.input}
            />
          <label className={styles.label}>Tipo de Muro</label>
          </div>
            {errors.wallsType && <p className={styles.error}>{errors.wallsType}</p>}
        </div>

        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
          <input
            type="text"
            name="reputation"
            value={formData.reputation}
            onChange={handleChange}
            className={styles.input}
            />
          <label className={styles.label}>Reputation</label>
          </div>
            {errors.reputation && <p className={styles.error}>{errors.reputation}</p>}
        </div>

        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
          <input
            type="text"
            name="imgClub"
            value={formData.imgClub}
            onChange={handleChange}
            className={styles.input}
            />
          <label className={styles.label}>Imagen</label>
          </div>
            {errors.imgClub && <p className={styles.error}>{errors.imgClub}</p>}
        </div>

        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
  <select
    name="horarioInicio"
    value={formData.horarioInicio}
    onChange={handleChange}
    className={styles.input}
  >
    {generateOptions()}
  </select>
  <label className={styles.label}>Horario Inicio</label>
  </div>
  {errors.horarioInicio && <p className={styles.error}>{errors.horarioInicio}</p>}
</div>

<div className={styles.inputContainer}>
<div className = {styles.inputDiv}>
  <select
    name="horarioCierre"
    value={formData.horarioCierre}
    onChange={handleChange}
    className={styles.input}
  >
    {generateOptions()}
  </select>
  <label className={styles.label}>Horario Cierre</label>
  </div>
  {errors.horarioCierre && <p className={styles.error}>{errors.horarioCierre}</p>}
</div>


        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
          <select id="clubSelect" className={styles.input} onChange={handleClubChange}>
            <option value="">Selecciona un club:</option>
            {clubs?.map(club => (
              <option key={club.id} value={club.id}>
                  {club.name}
                </option>
            ))}
          </select>
          <label htmlFor="clubSelect" className={styles.label}>Club</label>
          </div>
            {errors.ClubId && <p className={styles.error}>{errors.ClubId}</p>}
        </div>
        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>
          <select id="sportSelect" className={styles.input} onChange={handleSportChange}>
            <option value="">Selecciona un deporte:</option>
            {sports?.map(sport => (
              <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
            ))}
          </select>
          <label htmlFor="sportSelect" className={styles.label}>Sport</label>
          </div>
            {errors.SportId && <p className={styles.error}>{errors.SportId}</p>}
        </div>
        <div className={styles.inputContainer}>
        <div className = {styles.inputDiv}>

          <select id="locationSelect" className={styles.input} onChange={handleLocationChange}>
            <option value="">Selecciona una ubicación:</option>
            {location?.map(location => (
              <option key={location.id} value={location.id}>
                  {location.name}
                </option>
            ))}
          </select>
          <label htmlFor="locationSelect" className={styles.label}>Location</label>
          </div>
            {errors.LocationId && <p className={styles.error}>{errors.LocationId}</p>}
        </div>

        <button type="submit" value='enviar' className={styles.btnSubmit}>Create</button>
      </form>
      <button onClick={() => setCrearCourt(false)} className={styles.close}>Cerrar</button>
    </div>
  )
}

export default CrearCourts
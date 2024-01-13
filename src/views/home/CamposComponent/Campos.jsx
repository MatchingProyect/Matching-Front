import styles from './campo.module.css';
import { useState } from 'react';
import CardCourt from '../../cardCourt/CardCourt';
import { useSelector } from 'react-redux';


const Campos = () => {

    const clubs = useSelector((state) => state.user.allClubs);
    const locations = useSelector((state) => state.user.allLocations);
    const courts = useSelector((state) => state.user.allCourts);

    const [filteredCourts, setFilteredCourts] = useState([]);

    const courtsFilterByLocations = function(event){
        let value = event.target.value;
        let courtsFilteredByLocations = courts.filter((element) => element.LocationId == value);
        return setFilteredCourts(courtsFilteredByLocations);
      };
    
      const courtsFilterByClubs = function(event){
        let value = event.target.value;
        let courtsFilteredByClubs = courts.filter((element) => element.ClubId == value);
        return setFilteredCourts(courtsFilteredByClubs);
      };
    


  return (
    <div className={styles.divCourts}>
        <h2 className={styles.courtsTitle}>Campos</h2>
        <div className = {styles.filtroContainer}>
            <div className = {styles.filtrosDiv}>
                <label className = {styles.filterLabel}>Ciudades</label>
                <select onChange = {courtsFilterByLocations} className = {styles.selectFiltros}>
                    <option disabled >Ciudades</option>
                    <option>Todas las Ciudades</option>
                    {locations?.filter(location => location.estado == true).map((element) => <option value = {element.id} key = {element.id}>{element.name}</option>)}
                </select>
            </div>
            <div className = {styles.filtrosDiv}>
                <label className = {styles.filterLabel}>Clubes</label>
                <select onChange = {courtsFilterByClubs} className = {styles.selectFiltros}>
                    <option disabled >Clubes</option>
                    <option>Todos los Clubes</option>
                    {clubs?.filter(club => club.estado == true).map((element) => <option value = {element.id} key = {element.id}>{element.name}</option> )}
                </select>
            </div>
        </div>
        {
            filteredCourts.length > 0 ? 
                filteredCourts.filter(court => court.estado === true)
                .map(filteredCourt => (
                    <CardCourt key={filteredCourt.id} court={filteredCourt} />
                )) : courts?.filter(court => court.estado === true)
                .map(filteredCourt => (
                    <CardCourt key={filteredCourt.id} court={filteredCourt} />
                ))
        }
    </div>
  );
};

export default Campos;

import styles from './campo.module.css';
import { useState, useEffect } from 'react';
import CardCourt from '../../cardCourt/CardCourt';
import { useSelector } from 'react-redux';
import CardClub from '../../cardClubs/CardClub';


const Campos = ({clubs, locations, courts}) => {
    const [filteredCourts, setFilteredCourts] = useState([courts]);
    const [filteredClubs, setFilteredClubs] = useState([clubs]);
    useEffect(()=> {
        setFilteredCourts(courts);
        setFilteredClubs(clubs)
    }, [courts, clubs]);
    console.log(filteredClubs);

    const courtsFilterByLocations = function(event){
        let value = event.target.value;
        console.log(value);
        let courtsFilteredByLocations = courts.filter((element) => element.LocationId == value);
        let filteredClubs = clubs.filter((element) => element.LocationId == value);
        return setFilteredCourts(courtsFilteredByLocations), setFilteredClubs(filteredClubs);
      };
    
      const courtsFilterByClubs = function(event){
        let value = event.target.value;
        let courtsFilteredByClubs = courts.filter((element) => element.ClubId == value);
        return setFilteredCourts(courtsFilteredByClubs);
      };

  return (
    <div className={styles.divCourts}>

        <h2 className={styles.courtsTitle}>Campos</h2>
        <div className = {styles.clubsComponent}>
            {
                clubs?.length > 0 && clubs?.map((element) => <CardClub club = {element} key = {element.id}/>)
            }
        </div>
        <div className = {styles.filtroContainer}>
            <div className = {styles.filtrosDiv}>
                <label className = {styles.filterLabel}>Ciudades</label>
                <select onChange = {courtsFilterByLocations} className = {styles.selectFiltros}>
                    <option disabled >Ciudades</option>
                    {locations?.filter(location => location.estado == true).map((element) => <option value = {element.id} key = {element.id}>{element.name}</option>)}
                </select>
            </div>
            <div className = {styles.filtrosDiv}>
                <label className = {styles.filterLabel}>Clubes</label>
                <select onChange = {courtsFilterByClubs} className = {styles.selectFiltros}>
                    <option disabled >Clubes</option>
                    {filteredClubs?.filter(club => club.estado == true).map((element) => <option value = {element.id} key = {element.id}>{element.name}</option> )}
                </select>
            </div>
        </div>
        <div className = {styles.cardsContainerScroll}>
            <div  className = {styles.cardController}>
         {
            filteredCourts.length > 0 ? 
                filteredCourts.filter(court => court.estado === true)
                .map(filteredCourt => (
                    <CardCourt key={filteredCourt.id} court={filteredCourt} />
                )) : 
                <div className = {styles.divNoCourts}>
                    <h1 className = {styles.textNoCourts}>No existen courts con este club o en esta localidad</h1>
                </div>
                
        } 
        </div>
        </div>
    </div>
  );
};

export default Campos;

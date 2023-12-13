// import styles from './friends.styles.css';
import  { useState } from 'react';
// import SearchIcon from '@material-ui/icons/Search';
import CardsFriends from '../../components/cards-friends/card-friends.component';
export default function Friends(){

    const [name, setName] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        // onSearch(name);
      };


      const handleChange = (event) => {
        setName(event.target.value);
        console.log(event.target.value);
        if (event.target.value === '') {
        //   onSearch(null); 
        }
      };

    return(
        <div>
            <h1>Amigos</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Busque la raza' value={name} onChange={handleChange} />
            
                <button type='button' className='icon-button' onClick={handleSubmit}>
                {/* <SearchIcon className='icon' /> */}
                </button>
            </form>

            <CardsFriends></CardsFriends>
            



        </div>
    )
} 
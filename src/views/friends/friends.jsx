import  { useState } from 'react';
import CardsFriends from '../../components/cards-friends/cards-friends.component'
import { Link } from 'react-router-dom';

export default function Friends(){

    const friends = [
        {
            name: "John",
            games: 10
        },
        {
            name: "Adam",
            games: 8
        },
        {
            name: "Peter",
            games: 3
        },
        {
            name: "Diego",
            games: 3
        },
        {
            name: "Daniel",
            games: 0
        }
    
      ]

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
                <button type='button' className='icon-button' onClick={handleSubmit}>
                    <img src={ "https://res.cloudinary.com/dbffmtz0y/image/upload/v1702489357/eye.slash_vthsb6.svg" } alt="Search" />
                </button>
                <input type="text" placeholder='Buscar por nombre o correo' value={name} onChange={handleChange} />
            </form>

            <div className='filter'>
                <p>{friends.length} amigos.</p>
                <p>Ordenar</p>
            </div>

            <CardsFriends friends ={friends}></CardsFriends>


            <div>
                <Link to = '/'> 
                    <img src={ "https://res.cloudinary.com/dbffmtz0y/image/upload/v1702508016/ic_baseline-share_pzgv1u.svg" } alt="Compartir" />
                    <p>Invitar Amigos</p>
                </Link>

            </div>



        </div>
    )
} 
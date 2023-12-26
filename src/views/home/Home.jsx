import React from 'react';
import styles from './home.module.css';
import CardUser from '../cardUsers/CardUser';
import CardSport from '../cardSports/CardSport';
import CardClub from '../cardClubs/CardClub';
import SearchBar from '../searchBar/SearchBar';
import CardCourt from '../cardCourt/CardCourt';

export default function Home({ sports, clubs, courts, users }) {

    return (
        <>
            <SearchBar users={users} />
            {users?.map((user) => {
                return (
                    <CardUser user={user} />
                )
            })}
            {sports?.map((sport) => {
                return (
                    <CardSport sport={sport} />
                )
            })}
            {clubs?.map((club) => {
                return (
                    <CardClub club={club} />
                )
            })}
            {courts?.map((court) => {
                <CardCourt court={court} />
            })}
        </>
    )
}
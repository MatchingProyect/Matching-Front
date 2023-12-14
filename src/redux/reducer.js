import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    allUsers: [],
    allSports: [],
    allClubs: [],
    allLocations: []
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
       setUsers: (state, action) =>{
        state.allUsers = action.payload
       },
       setSports: (state, action)=>{
        state.allSports = action.payload
       },
       setClubs: (state, action)=>{
        state.allClubs = action.payload
       },
       setLocations: (state, action)=>{
        state.allLocations = action.payload
       }
    }
})

export const fetchUsers = ()=>async(dispatch)=>{
    try {
        const {data} = await axios('http://localhost:3000/users')
        if(data.status) dispatch(setUsers(data.allUsers))
    } catch (error) {
        throw error.message
    }
}
export const fetchSports = ()=>async(dispatch)=>{
    try {
        const {data} = await axios('http://localhost:3000/sports')
        if(data.status) dispatch(setSports(data.allSports))
    } catch (error) {
        throw error.message
    }
}
export const fetchLocations = ()=>async(dispatch)=>{
    try {
        const {data} = await axios('http://localhost:3000/locations')
        if(data.status) dispatch(setLocations(data.allLocations))
    } catch (error) {
        throw error.message
    }
}
export const fetchClubs = ()=>async(dispatch)=>{
    try {
        const {data} = await axios('http://localhost:3000/clubs')
        if(data.status) dispatch(setClubs(data.allClubs))
    } catch (error) {
        throw error.message
    }
}

export const { setClubs, setLocations, setUsers, setSports } = userSlice.actions;
export default userSlice.reducer;
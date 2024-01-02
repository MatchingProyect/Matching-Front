import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    allUsers: [],
    allSports: [],
    allClubs: [],
    allCourts: [],
    allFriends: [],
    allLocations: [],
    allReservations: [],
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
       setCourts: (state, action)=>{
        state.allCourts = action.payload
       },
       setProfiles: (state, action) =>{
        state.allProfiles = action.payload
       },
       setFriends: (state, action) => {
        state.allFriends = action.payload;
       },
       setLocations: (state, action) => {
        state.allLocations = action.payload;
       },
       setReservations: (state, action) => {
        state.allReservations = action.payload;
       },
    }
})

export const fetchLocations = ()=>async(dispatch)=>{
    try {
         const {data} = await axios('/locations')
        if(data.status) dispatch(setLocations(data.allLocations))
    } catch (error) {
        throw error.message
    }
}

export const fecthReservations = ()=>async(dispatch)=>{
    try {
         const {data} = await axios('/reservations')
        if(data.status) dispatch(setReservations(data.allReservations))
    } catch (error) {
        throw error.message
    }
}

export const fetchProfiles = ()=>async(dispatch)=>{
    try {
         const {data} = await axios('/profiles')
        if(data.status) dispatch(setProfiles(data.allProfiles))
    } catch (error) {
        throw error.message
    }
}

export const fetchUsers = ()=>async(dispatch)=>{
    try {
         const {data} = await axios('/users')
        if(data.status) dispatch(setUsers(data.allUsers))
    } catch (error) {
        throw error.message
    }
}

export const fetchFriends = () => async(dispatch) => {
    try {
        const {data} = await axios('/users')
       if(data.status) dispatch(setFriends(data.allUsers))
   } catch (error) {
       throw error.message
   }
}

export const fetchSports = ()=>async(dispatch)=>{
    try {
        const {data} = await axios('/sports')
        if(data.status) dispatch(setSports(data.allSports))
    } catch (error) {
        throw error.message
    }
}
export const fetchCourts = ()=>async(dispatch)=>{
    try {
        const {data} = await axios('/courts')
        if(data.status) dispatch(setCourts(data.allCourts))
    } catch (error) {
        throw error.message
    }
}
export const fetchClubs = ()=>async(dispatch)=>{
    try {
         const {data} = await axios('/clubs')
         if(data.status) dispatch(setClubs(data.allClubs))
    } catch (error) {
        throw error.message
    }
}

export const { setClubs, setCourts, setUsers, setSports, setProfiles, setFriends, setLocations, setReservations } = userSlice.actions;
export default userSlice.reducer;
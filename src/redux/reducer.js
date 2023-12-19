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
       },
       setProfiles: (state, action) =>{
        state.allProfiles = action.payload
       }
    }
})

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
export const fetchSports = ()=>async(dispatch)=>{
    try {
        const {data} = await axios('/sports')
        if(data.status) dispatch(setSports(data.allSports))
    } catch (error) {
        throw error.message
    }
}
export const fetchLocations = ()=>async(dispatch)=>{
    try {
        const {data} = await axios('/locations')
        if(data.status) dispatch(setLocations(data.allLocations))
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

export const { setClubs, setLocations, setUsers, setSports, setProfiles } = userSlice.actions;
export default userSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    allUsers: [],
    allSports: [],
    allClubs: [],
    allCourts: [],
    allFriends: [],
    allLocations: [],
    allProfiles: [],
    allReservations: [],
    datauser: []
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
        state.allCourts = action.payload;
       },
       setProfile: (state, action) =>{
        state.datauser.profile = action.payload
       },
       setFriends: (state, action) => {
        state.allFriends = action.payload
       },
       setDataUser: (state, action) =>{
        state.datauser = action.payload
       },
       setReservations: (state, action) => {
        state.allReservations = action.payload;
       },
       setLocations: (state, action) => {
        state.allLocations = action.payload;
       },
       setProfiles: (state, action) => {
        state.allProfiles = action.payload;
       },
       
       resetState: (state) => {
        state.allUsers = [];
        state.allSports = [];
        state.allClubs = [];
        state.allCourts = [];
        state.allFriends = [];
        state.allLocations = [];
        state.allReservations = [];
        state.datauser = [];
    },
    },
});


export const fetchUser = (id) => async (dispatch) => {
    try {
      const { data } = await axios(`/users/${id}`);
      if (data.status) {
        dispatch(setDataUser(data.userFound));
        const friends = await axios(`/friends/${data.userFound.user.id}`)
        if(friends) dispatch(setFriends(friends.data.friends))
        const profilesDeport = await axios(`/userProfiles/${data.userFound.user.id}`)
    if(profilesDeport) dispatch(setProfile(profilesDeport.theOne))
      }
    } catch (error) {
        throw error.message;
    }
  };

  export const fetchProfile = (id) => async (dispatch) => {
    try {
        const { data } = await axios(`/userProfiles/${id}`);
        if (data.status){
            dispatch(setProfile(data.theOne));
        }
    } catch (error) {
        throw error.message;
    }
  }

//   export const fetchFriends = (id) => async(dispatch) => {
//     try {
//         const {data} = await axios(`/users/${id}`)
//        if(data.status) dispatch(setFriends(data.userFound.user))
//    } catch (error) {
//        throw error.message
//    };
// };

export const fetchReservations = ()=>async(dispatch)=>{
    try {
        const {data} = await axios(`/reservations`)
        if(data.status) dispatch(setReservations(data.allReservations))
    } catch (error) {
        throw error.message
    }
};

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
        const {data} = await axios(`/users`);
        if(data.status) {
            dispatch(setUsers(data.allUsers))
        }
    } catch (error) {
        throw error.message
    }
};



export const fetchSports = ()=>async(dispatch)=>{
    try {
        const {data} = await axios('/sports')
        if(data.status) dispatch(setSports(data.allSport))
    } catch (error) {
        throw error.message
    }
}

export const fetchLocations = ()=>async(dispatch)=>{
    try {
        const {data} = await axios('/locations');
        if(data.status) dispatch(setLocations(data.allLocations))
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
         const {data} = await axios('/clubs');
         if(data.status) dispatch(setClubs(data.allClubes))
    } catch (error) {
        throw error.message
    }
}

export const logout = () => (dispatch) => {
    dispatch(resetState()); 
};

export const { setClubs,resetState, setCourts, setUsers, setSports, setProfile, setFriends, setDataUser, setReservations, setLocations, setProfiles } = userSlice.actions;
export default userSlice.reducer;
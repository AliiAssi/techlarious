import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile:null,
    },
    reducers: {
        setUserProfile(state,action){
            state.profile = action.payload;
        },
        setProfilePhoto(state,action){
            state.profile.profilePhoto.url = action.payload;
        },
        updateProfileState(state,action){
            state.profile = action.payload;
        },

    },
});





const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export {profileActions, profileReducer};
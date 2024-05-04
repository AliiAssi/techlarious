import request from "../../utils/request";
import {toast} from 'react-toastify'
import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";
//get user profile
export function getUser(userId) {
    return async (dispatch)=>{
        try{
            const {data} = await request.get(`/api/user/profile/${userId}`);
            dispatch(profileActions.setUserProfile(data));  
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
}

//update profile photo 
export function uploadProfilePhoto(newPhoto) {
    return async (dispatch,getState)=>{
        try{
            const token = getState().auth.user.token;
            const {data} = await request
            .post(`api/user/profile/profile-photo-upload`,newPhoto, {
                headers:{
                    Authorization: 'bearer ' + token,
                    "Content-Type" :"multipart/form-data"
                }
            })
            toast.error(data.profilePhoto.url)
            dispatch(profileActions.setProfilePhoto(data.profilePhoto.url));
            dispatch(authActions.setUserPhoto(data.profilePhoto))
            toast.success(data.message);
            //modify the local storage =
            const user = JSON.parse(localStorage.getItem('user'));
            user.profilePhoto = data.profilePhoto;
            localStorage.setItem('user', JSON.stringify(user));
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
}
//upload profile photo 
export function updateProfile(userId,profile) {
    return async (dispatch,getState)=>{
        try{
            const token = getState().auth.user.token;
            const {data} = await request
            .put(`api/user/profile/${userId}`,profile, {
                headers:{
                    Authorization: 'bearer ' + token,
                }
            })
            dispatch(profileActions.updateProfileState(data));
            dispatch(authActions.setUserName(data.username))
            toast.success("updated profile successfully");
            //modify the local storage =
            const user = JSON.parse(localStorage.getItem('user'));
            user.username = data.username;

            localStorage.setItem('user', JSON.stringify(user));
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
}
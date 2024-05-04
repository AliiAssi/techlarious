import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import {toast} from 'react-toastify';
// Login User api call




export function loginUser(user){
    return async(dispatch)=>{
        try
        {
            /*const reponse = await fetch("http://127.0.0.1:3000/api/auth/login",{
                method: "POST",
                body:JSON.stringify(user),
                headers :{
                    "Content-Type": "application/json"
                }
            });*/
            const res = await request.post("/api/auth/login",user);
            /*const data = await reponse.json();
            dispatch(authActions.login(data));
            localStorage.setItem("user", JSON.stringify(data));*/
            dispatch(authActions.login(res.data));
            localStorage.setItem("user", JSON.stringify(res.data));

        }
        catch(error){
            toast.error(error.response.data.message);   
        }
    }
}

export function logoutUser(){
    return (dispatch)=>{
        dispatch(authActions.logout())
        localStorage.removeItem('user')
    }
}
export function registerUser(user){
    return async(dispatch)=>{
        try{
            const res = await request.post("api/auth/register",user);
            dispatch(authActions.register(res.data.message))
        }catch(e){
            toastr.error(e.response.data.message)
        }       
    }
}
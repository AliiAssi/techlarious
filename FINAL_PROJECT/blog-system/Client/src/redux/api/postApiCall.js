import request from "../../utils/request";
import {toast} from 'react-toastify'
import { postActions } from "../slices/postSlice";

//get all posts based on the page number 
export function getPosts(pageNumber) {
    return async (dispatch)=>{
        try{
            const {data} = await request.get(`api/post?pageNumber=${pageNumber}`)
            dispatch(postActions.setPosts(data));  
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
}

// get number of posts
export function getpostsCount() {
    return async (dispatch)=>{
        try{
            const {data} = await request.get(`api/post/count`)
            dispatch(postActions.setPostsCount(data.toString()));  
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
}

// get posts based on the    category
export function getPostsBasedOnCategory(category) {
    return async (dispatch)=>{
        try{
            const {data} = await request.get(`api/post?category=${category}`)
            dispatch(postActions.setPosts(data));  
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
}

//create a new post 
export function createNewPost( post){
    return async(dispatch,getState)=>{
        try{
            console.log("FormData contents:", post);
            dispatch(postActions.setLoadingTrue());
            const {data} = await request.post("api/post/",
            post,
            {
                headers:{
                    Authorization: 'bearer ' + getState().auth.user.token,
                    "Content-Type" :"multipart/form-data"
                }
            }
            );
            dispatch(postActions.setIsPostCreatedTrue())
            setTimeout(()=> dispatch(postActions.setIsPostCreatedFalse()), 2000);

        }
        catch(err){
            toast.error(err.response.data.message);
            dispatch(postActions.setLoadingFalse());
        }
    }
}

//get single post 
export function getSinglePost(postId){
    return async (dispatch)=>{
        try{
            const {data} = await request.get(`api/post/${postId}`);
            dispatch(postActions.setPost(data));  
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    } 
}

//toggle like
export function setToggleLike(postId){
    return async (dispatch,getState)=>{
        try{
            console.log(postId);
            const {data} = await request.put(`api/post/like/${postId}`,{},{
                headers:{
                    Authorization : 'bearer ' + getState().auth.user.token,
                }
            });
            dispatch(postActions.toggleLike(data));  
            toast.success(data.message);
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    } 
}

//update post image 
export function updatePostImage(image,postId){
    console.log("i"+image);
    return async (dispatch,getState)=>{
        try{
            console.log(postId);
            const {data} = await request.post(`api/post/postPhoto/${postId}`,image,{
                headers:{
                    Authorization : 'bearer ' + getState().auth.user.token,
                    "Content-Type" : 'multipart/form-data'
                }
            });
            toast.success("image uploaded successfully");
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    } 
}

//update post blog
export function updatePost(post,postId){
    return async (dispatch,getState)=>{
        try{
            console.log(post);
            const {data} = await request.put(`api/post/${postId}`,post,{
                headers:{
                    Authorization : 'bearer ' + getState().auth.user.token,
                }
            });
            toast.success(data.message);
            try{
                const {data} = await request.get(`api/post/${postId}`);
                dispatch(postActions.setPost(data));  
            }
            catch(err){
                toast.error(err.response.data.message);
            }        }
        catch(err){
            toast.error(err.response.data.message);
        }
    } 
}
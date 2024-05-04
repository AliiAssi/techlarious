import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts:[],
        postCount: 0,
        postsCategory:[],
        loading:false,
        isPostCreated: false,
        post:null,
    },
    reducers: {
        setPosts(state,action){
            state.posts = action.payload;
        },
        setPostsCount(state,action){
            state.postCount = action.payload
        },
        setPostsCategory(state,action){
            state.postsCategory = action.payload
        },
        setLoadingTrue(state){
            state.loading = true;
        },
        setLoadingFalse(state){
            state.loading = false;
        },
        setIsPostCreatedTrue(state){
            state.isPostCreated = true;
            state.loading = false;
        },
        setIsPostCreatedFalse(state){
            state.isPostCreated = false;
        },
        setPost(state, action){
            state.post =  action.payload;
        },
        toggleLike(state, action){
            state.post.likes  = action.payload.likes;
        }
        
    },
});





const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export {postActions, postReducer};
import { createSlice } from "@reduxjs/toolkit";
import { deleteItem, setItem } from "../helpers/manage-localstory";

const initialState={
    isLogin:false,
    isLoading:false,
    user:null,
    error:null,
    users:[]
}
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        userAuthStart:(state)=>{
            state.isLoading=true
        },
        userAuthSeccess:(state,action)=>{
            state.isLoading=false
            state.user=action.payload.user
            state.isLogin=true
            if (action.payload.token) {
                setItem("token", action.payload.token); // Faqat token bo‘lsa saqlash
            }
        },
        userAuthFail:(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        },
        userLogOut:(state)=>{
            state.isLogin=false
            state.user=null
            deleteItem('token')
        },
        userLogOutFail(state,action){
            state.error=action.payload
        },
        getUsersStart:(state)=>{
            state.isLoading=true
        },
        getUsersSeccess:(state,action)=>{
            state.isLoading=false
            state.users=action.payload.user
        },
        getUsersFail:(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        }
    },
})
export const {userLogOutFail,userLogOut,userAuthStart,userAuthSeccess,userAuthFail,getUsersFail,getUsersSeccess,getUsersStart}=authSlice.actions
export default authSlice.reducer
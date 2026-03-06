import { createSlice } from "@reduxjs/toolkit";
const initialState={
role:localStorage.getItem("role")||null,
email:""
}
const UserSlice=createSlice(
    {
        name:"roleemail",
        initialState,
        reducers:{
            setRole:(state,action)=>{
                state.role=action.payload;
                localStorage.setItem("role",action.payload);
            },
            setEmail:(state,action)=>{
                state.email=action.payload;
            }
        }
    }
)
export const{setRole,setEmail,setId}=UserSlice.actions;
export default UserSlice.reducer;
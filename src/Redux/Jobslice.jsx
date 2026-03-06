import { createSlice } from "@reduxjs/toolkit";
 const initialState={
    jobs:[],
 }
const JobSlice=createSlice(
    {
        name:"jobs",
        initialState,
        reducers:{
            addjob:(state,action)=>{
              state.jobs.push(action.payload);
            },
            deleteJob:(state,action)=>{
                const id=action.payload;
                state.jobs=state.jobs.filter(job=>job.id!==id);
            }
        }
    }
)
export const{addjob,deleteJob}=JobSlice.actions;
export default  JobSlice.reducer;
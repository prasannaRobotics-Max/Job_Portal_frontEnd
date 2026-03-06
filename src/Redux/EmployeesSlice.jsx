    import { createSlice } from "@reduxjs/toolkit"

    const initialState={
        jobseekers:[],
    }
    const EmployeeSlice=createSlice(
        {
            name:"jobseekers",
            initialState,
            reducers:{
                SetEmployees:(state,action)=>{
                    state.jobseekers.push(action.payload);
                }
            }
        }
    )
    export const {SetEmployees}=EmployeeSlice.actions;
    export default EmployeeSlice.reducer;
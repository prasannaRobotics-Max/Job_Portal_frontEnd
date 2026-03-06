import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice.jsx";
import  JobSlice  from "./Jobslice.jsx";
import EmployeeSlice from "./EmployeesSlice.jsx";
const Store=configureStore(
    {
        reducer:{
            userRoleemail:UserSlice,
            postedjobs:JobSlice,
            employees:EmployeeSlice,
        }
    }
)
export default Store;
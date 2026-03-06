import { Route,BrowserRouter,Routes} from "react-router-dom";
import Employer from "/src/components/Employer.jsx";
import Employee from "/src/components/Employee.jsx";
import Contact from "/src/components/Contact.jsx";
import JobPost from "/src/components/JobPost.jsx";
import Applications from "/src/components/Applications.jsx";
import Home from "/src/components/Home.jsx";
import JobPost from "../components/Jobpost";
import Profile from"/src/components/Profile.jsx";
import EmployeeJobs from"/src/components/EmployeeJobs.jsx";
function AppRouter(){
    return(
        <>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/jobSeeker" element={<Employee/>}></Route>
                <Route path="/employer" element={<Employer/>}></Route>
                <Route path="/Home" element={<Home/>}></Route>
                <Route path="/jobs" element={<JobPost/>}></Route>
                <Route path="/contact" element={<Contact/>}></Route>
                <Route path="/applications" element={<Applications/>}></Route>
                <Route path="/yourjobs" element={<EmpJobs/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/employeeJobs" element={<EmployeeJobs/>}></Route>
            </Routes>
          </BrowserRouter>
        </>
    )
}
export default AppRouter;
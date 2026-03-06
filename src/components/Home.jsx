import { useSelector } from "react-redux";
import "/src/CSS/Home.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAll } from "../Service/JobsService";
import { createApplication } from "../Service/ApplicationService";
import { getByFilter } from "../Service/JobsService";
import { Button } from "bootstrap";
function Home() {
    const [applications, setApplications] = useState([]);
    const [isFiltered, SetIsFiltered] = useState(false);
    const [jobs, SetJobs] = useState([]);
    const [filteredJobs, SetFilteredJobs] = useState([]);
    const [input, SetInput] = useState("");
    const [searchFilter, SetSearchFilter] = useState("");
    const role = useSelector((state) => state.userRoleemail.role);
    const email = useSelector((state) => state.userRoleemail.email);
    console.log(role, email);
    const id = localStorage.getItem("userId");
    const navigate = useNavigate();
    console.log(id);
    useEffect(() => {
        async function handleJobs() {
            try {
                const res = await getAll();
                console.log(res)
                SetJobs(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        handleJobs();
    }, []);
    async function handleApplication(jobId, empId) {
        if (role !== "EMPLOYER") {
            const data = {
                jobSeekerId: id,
                jobId: jobId,
                empId: empId
            }
            console.log(data);
            try {
                const res = await createApplication(data);
                console.log(res);
                alert("Successfully applied");
            } catch (error) {
                console.log("Application:", error);
            }
        }
    }
    function handleLogOut() {
        localStorage.clear("userId");
        localStorage.clear("token");
        localStorage.clear("role");
        navigate("/");
    }
    async function handleFilter(filter) {
        SetSearchFilter(filter);
        console.log(input);
        try {
            const res = await getByFilter(searchFilter, input);
            SetFilteredJobs(res.data);
        }
        catch (err) {
            console.log("No Matching details found");
        }
        SetIsFiltered(true);

    }
    function handleBack() {
        SetIsFiltered(false);
    }
    return (
        <>
            <div id="topbar">
                <div id="logo"><img src="./src/assets/logo.jpg" alt="logo" /></div>

                <div id="search"><div> <input type="text" onChange={(e) => SetInput(e.target.value)} /></div><div id="filters"><button className="btn btn-primary" onClick={() => handleFilter("location")}>Location</button><button className="btn btn-primary" onClick={() => handleFilter("role")}>Role</button><button className="btn btn-primary" onClick={() => handleFilter("company")}>Company</button><button className="btn btn-primary" onClick={() => handleFilter("salary")}>Salary</button></div></div>

                <div id="jobs">
                    <div>
                        <h1><Link to={"/employeeJobs"} id="appliedjobs">💼</Link></h1><p>Applied Jobs</p>
                    </div>
                    {role !== "JOBSEEKER" && (
                        <div>
                            <h1><Link to={"/applications"} id="applications">📄</Link></h1><p>Applications</p>
                        </div>)}
                    {role !== "JOBSEEKER" && (
                        <div>
                            <h1><Link to={"/jobs"} id="applications">➕</Link></h1><p>Add job</p>
                        </div>)}
                    <div>
                        <Link to={"/profile"}>
                            <img src="./src/assets/profile.png" alt="profile" id="profile" /><p>Profile</p></Link></div>
                </div>

                <button className="btn btn-danger" style={{ width: 100, height: 50, marginTop: 30 }} onClick={handleLogOut}>Log Out</button>
            </div>
            <br /><br />
            <br /><br />

            <div id="homecontent">

                {!isFiltered && (
                    <>
                        <div id="jobsouter">
                            <h2>Categories:</h2>
                            {Array.from(new Set(jobs.map(job => job.category.toLowerCase()))).map((category, index) => (
                                <div key={index} className="jobsections">
                                    <a href="#">{category}</a>
                                </div>
                            ))}
                        </div>

                        {jobs.length > 0 ? (
                            <div className="card mb-3 shadow-sm" id="job">
                                {jobs.map((job) => (
                                    <div key={job.id}>
                                        <img src={`http://localhost:8080/${encodeURI(job.companyProfile)}`} alt="logo" />
                                        <h3 className="card-title">Role:<strong>{job.jobRole}</strong></h3>
                                        <h4 className="card-subtitle mb-2 text-muted">Company Name: {job.companyName}</h4>
                                        <h4>Description:</h4>
                                        <p className="card-text">{job.description}</p>
                                        <p>Salary: {job.salary}</p>
                                        <p>DeadLine: {job.deadLine}</p>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleApplication(job.id, job.empId)}
                                        >
                                            Apply
                                        </button>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h1 align="center">Refresh the page again</h1>
                        )}
                    </>
                )}

                {isFiltered && (
                    filteredJobs.length > 0 ? (
                        <div className="card mb-3 shadow-sm" id="job">
                            {filteredJobs.map((job) => (
                                <div key={job.id}>
                                    <img src={`http://localhost:8080/${encodeURI(job.companyProfile)}`} alt="logo" />
                                    <h3 className="card-title">Role:<strong>{job.jobRole}</strong></h3>
                                    <h4 className="card-subtitle mb-2 text-muted">Company Name: {job.companyName}</h4>
                                    <h4>Description:</h4>
                                    <p className="card-text">{job.description}</p>
                                    <p>Salary: {job.salary}</p>
                                    <p>DeadLine: {job.deadLine}</p>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleApplication(job.id, job.empId)}
                                    >
                                        Apply
                                    </button>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    ) : (
                        < p>No Details Found<button onClick={handleBack}>Go Back</button></p>
                    )
                )}

            </div>


        </>
    )
}
export default Home;
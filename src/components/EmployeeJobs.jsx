import { useEffect, useState } from "react";
import { getApplicationByEmployee } from "../Service/ApplicationService";
function EmployeeJobs(){
     const[applications,setApplications]=useState([]);
        const id=localStorage.getItem("userId");
        useEffect(()=>{
            async function fetchApplications(){
                const res=await getApplicationByEmployee(id);
                console.log(res);
                setApplications(res.data);
            }
            fetchApplications();
        },[]);
       return (
      <div className="container mt-4">
        <h3 className="mb-4">My Applications</h3>
    
        {applications.length === 0 ? (
          <div className="alert alert-info">
            No applications found.
          </div>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="card mb-3 shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center">
                
                <div>
                  <h5 className="card-title mb-1">
                    {app.jobTitle ? app.jobTitle : `Company Name: ${app.companyName}`}
                  </h5>
                  <p className="mb-0 text-muted">
                    Applied for Job : {app.role}
                  </p>
                </div>
    
                <span
                  className={`badge ${
                    app.status === "APPROVED"
                      ? "bg-success"
                      : app.status === "REJECTED"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {app.status}
                </span>
    
              </div>
            </div>
          ))
        )}
      </div>
    );
    
    }
    
export default EmployeeJobs;
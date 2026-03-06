    import { useEffect, useState } from "react";
    import "/src/CSS/EmpJobs.css";
    import { Link } from "react-router-dom";
import { deleteJob, getJobByEmployer } from "../Service/JobsService";
    function EmpJobs(){
        const id=localStorage.getItem("userId");
     
        const[jobs,Setjobs]=useState([]);
      
        async function handleDeleteJob(id){
            try{
           const del=await deleteJob(id);
            }
            catch(err)
            {
                console.log("error:",err);
                console.log("Error in fetching Jobs");
            }
        }
       useEffect(()=>{
           async function fetchJobs(){
            const res=await getJobByEmployer(id);
            const jobData=res.data;
            Setjobs(jobData);
           }
          fetchJobs();
       },[])
    return(
        <>        
            <div id="total"><h1>Total:{jobs.length}</h1></div>
            {jobs.map((job)=>(
            <div className="jobs" key={job.id}>
                <h3>Role:{job.jobRole}</h3>
                <h5>Category:{job.category}</h5>
                <p>Desctription:{job.description}</p>
                <button className="btn btn-danger" onClick={()=>handleDeleteJob(job.id)}  >Delete</button>
            </div>
            ))}
            <Link to={"/home"}><button>Home</button></Link>
        </>
    )
    }
    export default EmpJobs;
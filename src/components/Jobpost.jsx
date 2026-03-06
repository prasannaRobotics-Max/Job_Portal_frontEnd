import { useState } from "react";
import "/src/CSS/post.css";
import { Link } from "react-router-dom";
import { addJob } from "../Service/JobsService";

function Jobpost(){
     const[empid,SetEmpid]=useState(0);
     const[Jobrole,SetJobrole]=useState("");
     const[description,SetDescription]=useState("");
     const[Category,SetCategory]=useState("");
     const[logo,Setlogo]=useState("");
     const[salary,SetSalary]=useState(0);
     const[deadLine,SetDeadLine]=useState("");
     const[organization,Setorganization]=useState("");
     const[location,setLocation]=useState("");
     const id=localStorage.getItem("userId");
    async  function handlePost(){
        if(empid&& Jobrole&& description&& Category&& logo && salary &&deadLine)
        {
            const formData=new FormData();
            formData.append("empId",empid);
            formData.append("companyName",organization);
            formData.append("companyLogo",logo);
            formData.append("jobRole",Jobrole);
            formData.append("description",description);
            formData.append("salary",salary);
            formData.append("location",location);
            formData.append("deadLine",deadLine);
            formData.append("category",Category);
            const res=await addJob(formData);
            console.log(res);
            if(res.status===201)
            {
          alert("Job Added Successfully");
            }
        }
        else{
           alert("Missing Details!. Fill the Blank Fields");
        }
     }
    return(
        <>
            <form id="form">
           
                <div className="mb-3">
                <label className="form-label">Enter the Id:</label>
                <input className="form-control" type="text" placeholder="id" value={id} required onChange={(e)=>SetEmpid(id)}/>
                </div>
                <div className="mb-3">
                <label className="form-label">Enter the Organization Name:</label>
                <input className="form-control" type="text" placeholder="Organization" required  onChange={(e)=>Setorganization(e.target.value)}/>
                </div>
                <div className="mb-3">
                <label className="form-label">Enter the Job Role:</label>
                <input className="form-control" type="text" placeholder="role" required  onChange={(e)=>SetJobrole(e.target.value)}/>
                </div>
                <div className="mb-3">
                <label className="form-label">Enter the Description(give a short description, a one line):</label>
                <textarea className="form-control" required onChange={(e)=>SetDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                <label className="form-label">Enter the Salary:</label>
                <input className="form-control" type="number" required onChange={(e)=>SetSalary(e.target.value)}/>
                </div>
                <div className="mb-3">
                <label className="form-label">Enter the DeadLine:</label>
                <input className="form-control" type="date" required onChange={(e)=>SetDeadLine(e.target.value)}/>
                </div>
                <div className="mb-3">
                <label className="form-label">Enter the Location:</label>
                <input  type="text"className="form-control" required onChange={(e)=>setLocation(e.target.value)}/>
                </div>
                <label className="form-label">Enter the Category:</label>
                <input className="form-control" type="text" placeholder="Category"  required onChange={(e)=>SetCategory(e.target.value)}/>
                <br /><br />
                <label className="form-label">Upload the Logo:</label>
                <input type="file"  required onChange={(e)=>Setlogo(e.target.files[0])}/>
                <br /><br />
                <button type="button" className="btn btn-primary" onClick={handlePost}>Post</button>
            </form>
              <Link to={"/home"}><button className="btn btn-primary">Home</button></Link>
              <Link to={"/yourjobs"}><button className="btn btn-primary">Your Jobs</button></Link>
             
        </>
    )
}
export default Jobpost;
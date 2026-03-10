import { useState } from "react";
import "/src/CSS/Employee.css";
import { Link } from "react-router-dom";
import { registerUser } from "../Service/UserService";

function Employee()
{
    const[isAddclicked,Setisaddclicked]=useState(false);
    const[isformopen,Setisformopen]=useState(true);
    const[ismsgshow,Setismsgshow]=useState(false);
    const[education,Seteducation]=useState({ 
        name:"",
        location:"",
        totalMarks:0,
        yearOfCompletion:"",
     levelOfStudy:""
    });
    const[employee,SetEmployee]=useState({
        profile:"",
        userName:"",
        role:"JOBSEEKER",
        contactNumber:"",
        email:"",
        password:" ",
        location:"",
        educationSection:[],
        resume:null,
    });

   async function handleRegister(){
    console.log(employee.userName, employee.profile , employee.dob ,employee.contactNumber , employee.email , employee.password, employee.location , employee.resume);
        if(employee.userName && employee.profile &&employee.contactNumber && employee.email && employee.password
            && employee.location && employee.resume)
        {
            if(employee.educationSection.length>0)
            {
        Setismsgshow(true);
        Setisaddclicked(false);
        const formData=new FormData();
        formData.append("resume",employee.resume);
        formData.append("profile",employee.profile);
        const jobSeeker={
            userName:employee.userName,
            role:employee.role,
            email:employee.email,
            contactNumber:employee.contactNumber,
            password:employee.password,
            location:employee.location,
            educations:employee.educationSection
        }
        console.log(jobSeeker);
       formData.append("user",new Blob([JSON.stringify(jobSeeker)],{type:"application/json"}));
        const res= await registerUser(formData);
        console.log(res.data);
        }
    }
    else{
        alert("Missing Fields!!!!");
    }
    }
    function handleChange(e){
        const{name,value,files}=e.target;
        if(name==="resume"|| name==="profile")
        {
        
            SetEmployee(prev=>({
                ...prev,[name]:files[0]
            }));
        }else{
        SetEmployee(prev=>({
            ...prev,
            [name]:value
        }));
        }
        
    }
   function handleEducation(e){
   const{name,value}=e.target;
   Seteducation(prev=>({
    ...prev,
    [name]:value
   }));
    }

    function addEducation(){
 SetEmployee(prev=>(
        {...prev,educationSection:[...prev.educationSection,education]}
    ));
    alert("Details added successfully");
    }

    

    function handleView(){
        Setisformopen(false);
        Setisaddclicked(true);
    }
    function handleStep1(){
        Setisformopen(true);
        Setisaddclicked(false);
    }
    function handleDelete(id){
        const jobseekersid=id;
        SetEmployee(prev=>({...prev,educationSection:prev.educationSection.filter(jobseek=>jobseek.id!==jobseekersid)}));
    }
    
    return(
        <>
        {isformopen &&(
        <form>
            <label>Upload the profile</label>
            <input
             type="file"
             name="profile"
             onChange={handleChange} />
           <h1>Personal Details:</h1>
            <label>Enter the  Name:</label>
            <br />
            <input 
            name="userName"
            type="text"
             placeholder="userName"
             required
             onChange={handleChange}
             />
            <br /><br />
            <label>Enter the Contact Number:</label>
            <br />
            <input 
            type="text"
             placeholder="contact number"
             required
             name="contactNumber"
             onChange={handleChange}
             />
            <br /><br />
            <label>Enter the Email Address:</label>
            <br />
            <input
             type="email" 
             placeholder="email"
             required
             name="email"
             onChange={handleChange}
             />
             <br /><br />
             <label>Enter the Residing Location:</label>
            <br />
            <input
             type="text" 
             placeholder="location"
             required
             name="location"
             onChange={handleChange}
             />

             
             <h1>Credentials:</h1>
             <label>Enter the password:</label>
             <br />
             <input
              type="password"
               placeholder="password"
                required 
                name="password"
                onChange={handleChange}
             />
             <br /><br />
             <label>Re enter the password:</label>
             <input
              type="text"
              placeholder="confirm password" 
              required
              />
              
             <h1>Education:</h1>
             <div>
                <label>Choose the level of Study:</label>
                <select required name="levelOfStudy" onChange={handleEducation}>
                    <option value=""> Select</option>
                    <option value="SSLC">SSLC</option>
                    <option value="HSC">HSC</option>
                    <option value="UG">Under Graduate</option>
                    <option value="PG">Post Graduate</option>
                </select>
                <br /><br />
                <label>Enter the University/School Name:</label>
                <br />
                <input
                 type="text" 
                 required
                 name="name"
                 onChange={handleEducation}
                  />
                <br /><br />
                <label>Enter the Location:</label>
                <input
                 type="text"
                 required
                 name="location"
                 onChange={handleEducation}
                  />
                <br /><br />
                <label>CGPA/total:</label>
                <input 
                type="number"
                required
                name="totalMarks"
                onChange={handleEducation}
                 />
                 <br /><br />
                 <label>Enter the year of study</label>
                 <input 
                 type="number"
                 name="yearOfCompletion"
                onChange={handleEducation} />
                 <br /><br />
                <button type="button" onClick={addEducation}>Add Education</button>
             </div>
             <br /><br />
             <label>Upload Your Resume:</label>
             <input 
             type="file"
             required
             name="resume"
             accept=".pdf,.doc,.docx"
             onChange={handleChange}
              />
        <button id="next" className="btn btn-primary mb-3" onClick={handleView}>next</button>
        </form>
        
        )}
       {isAddclicked &&(
        <section id="view">
            <label>User Name:{employee.userName}</label>
            <br /><br />
            <label>Contact Number:{employee.contactNumber}</label>
            
            <br /><br />
            <label>Email:{employee.email}</label>
           
            <br /><br />
            <label>Password:{employee.password}</label>
            
            <br /><br />
            <label>Education</label>
            <br />
            <table>
                <thead>
                <tr>
                    <th>Grade</th>
                    <th>Name</th>
                    <th>CGPA/Total</th>
                    <th>Location</th>
                    <th>Year Of Study</th>
                </tr>
                </thead>
                <tbody>
                    {employee.educationSection.map(edu=>(
                <tr key={edu.id}>
                    <td>{edu.levelOfStudy}</td>
                    <td>{edu.name}</td>
                    <td>{edu.location}</td>
                    <td>{edu.totalMarks}</td>
                    <td>{edu.yearOfCompletion}</td>
                    <td><button className="btn btn-danger" type="button" onClick={()=>handleDelete(edu.id)}>Delete</button></td>
                </tr>
                ))}
                </tbody>
            </table>
            {employee.resume &&(
            <label><a href={URL.createObjectURL(employee.resume)} target="_blank" >View Your resume here</a></label>)}
            <br />
            <button id="prev" type="button" className="btn btn-primary mb-3" onClick={handleStep1}>Previous</button>
        
            <button id="next" type="button"className="btn btn-primary mb-3" onClick={handleRegister}>Register</button>
            
        </section>
       )}

         {ismsgshow &&( <div><h1>🎉🎊🥳Welcome Job Seeker . We wish You the Best of Luck to kick start Your journey🎉🎊🥳</h1>
         <Link to={"/"}><button className="btn btn-primary mb-3" id="home">Login</button></Link>
         </div>
        )}
     </>
        
    )
}
export default Employee;

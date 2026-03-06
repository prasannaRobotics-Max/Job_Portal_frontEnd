import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../Service/UserService";
function Employer() {
    const [ismsg, Setismsg] = useState(false);
    const [isform, Setisform] = useState(true);
    const [isregister, Setisregister] = useState(false);
    const [name, Setname] = useState("");
    const role = "EMPLOYER";
    const [organization, Setorganization] = useState("");
    const [email, Setemail] = useState("");
    const [password, Setpassword] = useState("");
    
    function step1() {
        Setisform(false);
        Setisregister(true);
    }
    async function step2() {
         const formData=new FormData();
         const employer={
            userName:name,
            companyName:organization,
            password:password,
            email:email,
            role:role
         }
         console.log(name,organization,password,email,role);
         formData.append("user",new Blob([JSON.stringify(employer)],{type:"application/json"}));
         const res=await registerUser(formData);
        
         Setisregister(false);
        Setismsg(true);
    }
    function handleprev() {
        Setisform(true);
        Setisregister(false);
    }


    return (
        <>
            {isform && (
                <form>
                    <label>Enter Your Name:</label>
                    <br /><br />
                    <input type="text" placeholder="name" required onChange={(e) => Setname(e.target.value)} />
                    <br /><br />
                    <label>Enter Your Organization Name:</label>
                    <br /><br />
                    <input type="text" placeholder="oraganization name" required onChange={(e) => Setorganization(e.target.value)} />
                    <br /><br />
                    <label>Enter the Email Address:</label>
                    <br /><br />
                    <input type="email" placeholder="email" required onChange={(e) => Setemail(e.target.value)} />
                    <br /><br />
                    <label>Enter the Password:</label>
                    <br /><br />
                    <input type="password" placeholder="password" required onChange={(e) => Setpassword(e.target.value)} />
                    <br /><br />
                    <label>Reenter your password:</label>
                    <br /><br />
                    <input type="text" placeholder="confirm password" required />
                    <br /><br />

                    <button className="btn btn-primary mb-3" onClick={step1}>Next</button>
                </form>
            )}
            {isregister && (
                <section className="container mt-5 p-4 shadow rounded bg-white">
                    <h1 className="mb-3 text-center">Verify Your Details</h1>
                    <label className="mb-3 form-label">Name:{name}</label>
                    <br /><br />
                    <label className="mb-3 form-label">Organization:{organization}</label>
                    <br /><br />
                    <label className="mb-3 form-label">Email:{email}</label>
                    <br /><br />
                    <label className="mb-3 form-label">Password:{password}</label>
                    <br /><br />

                    <button id="prev" type="button" className="btn btn-primary mb-3" onClick={handleprev}>Previous</button>
                    <button id="next" type="button" className="btn btn-primary mb-3" onClick={step2}>Register</button>
                </section>)}
            {ismsg && (
                <div>
                    <h1 align="center">🎉🎊🥳Welcome! Thank you for choosing our platform to find your next great hire🎉🎊🥳</h1>
                    <Link to={"/"}><button style={{ position: "fixed", bottom: 0, right: 20 }} className="btn btn-primary mb-3">Login</button></Link>
                </div>
            )}


        </>
    )
}
export default Employer;
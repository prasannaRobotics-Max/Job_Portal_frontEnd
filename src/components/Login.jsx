import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEmail, setRole } from "../Redux/UserSlice";
import "/src/CSS/login.css";
import { useNavigate,Link } from "react-router-dom";
import { loginUser } from "../Service/UserService";

function Login(){
    const[email,SetEmail]=useState("");
    const[password,SetPassword]=useState("");
    const[isRegister,SetisRegister]=useState(false);
    const[error,SetError]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
   async function handleLogin(){
        if(email && password)
        {
        dispatch(setEmail(email));
        const loginData={
            email:email,
            password:password
        }
        try{
         const res=await loginUser(loginData);
        dispatch(setRole(res.data.role));
         localStorage.setItem("userId",res.data.userId);
         localStorage.setItem("token",res.data.token);
    navigate("/home");
        }catch(err)
        {
            SetError("Invalid Credentials");
        }
    }
}

    function handleRegister(){
        SetisRegister(true);
       
    }
    return(
        <>
        <div id="top"></div>
        <div id="logincontent">
            <div id="welcome">
                <h1>Welcome to Next Role</h1>
                <p>Sign in with Your credentials</p>
            </div>
            <div>
        <form>
            <label className="form-label"> Enter the Email Address:</label>
            <input  className=" form-control" type="email" required  onChange={(e)=>SetEmail(e.target.value)}/>
            <br /><br />
            <label className="form-label">Enter the Password:</label>
            <input className="form-control" type="password" required onChange={(e)=>SetPassword(e.target.value)} />
            <br /><br />
            <br />{error &&(<p style={{color:"red"}}>{error}</p>)}
            <div id="register">
            <button className="btn btn-primary" type="button" onClick={handleLogin}>Login</button>
            <button className="btn btn-primary" type="button"  onClick={handleRegister}>Register</button>
             </div>
             <br />
              {isRegister &&(
            <div>
           <Link to={"/employer"}><button className="btn btn-primary" type="button">EMPLOYER</button></Link>
            <Link to={"/jobseeker"}><button className="btn btn-primary" type="button">JOBSEEKER</button></Link>
            </div>
            )}  
           
        </form>
        </div>
        </div>
        </>
    )
}
export default Login;


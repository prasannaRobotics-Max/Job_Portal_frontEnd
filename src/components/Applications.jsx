import { useEffect, useState } from "react";
import { getApplicationByEmployer, updateApplication } from "../Service/ApplicationService";
import { Link } from "react-router-dom";

function Applications() {

    const [applications, setApplications] = useState([]);
    
    const [status, setStatus] = useState("");

    useEffect(() => {
        const id = localStorage.getItem("userId");

        async function fetchApplications() {
            const res = await getApplicationByEmployer(id);
            console.log(res);
            setApplications(res.data);
        }

        fetchApplications();
    }, []);
    async function handleStatusChange(id, status) {
        const currentStatus = {
            status: status
        }
        const res = await updateApplication(id, currentStatus);
        console.log(res);
        setStatus(res.data);
    }

    return (
        <>
        <button className="btn btn-primary" style={{marginLeft:10,marginTop:10}}><Link style={{color:"white",textDecoration:"none"}} to={"/home"}>Home</Link></button>
        <div style={{ width: "800px", margin: "0 auto" }}>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
            >
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                    <tr>
                        <th style={thStyle}>Role</th>
                        <th style={thStyle}>Resume</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {applications.map((app, index) => (
                        <tr key={index}>
                            <td style={tdStyle}>{app.role}</td>

                            <td style={tdStyle}>
                                <a
                                    href={`http://localhost:8080/${app.resume}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    View Resume
                                </a>
                            </td>

                            <td style={tdStyle}>{app.status}</td>

                            <td style={tdStyle}>

                                <button
                                    className="btn btn-success"
                                    onClick={() => handleStatusChange(app.id, "APPROVED")}
                                >
                                    Approve
                                </button>
                                {status !== "APPROVED" && (
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleStatusChange(app.id, "REJECTED")}
                                    >
                                        Reject
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
</>
    );
    
}

const thStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "blue",
    textAlign: "left"
};

const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd"
};

export default Applications;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getById, updateUser } from "../Service/UserService";
import { Link, useNavigate } from "react-router-dom";
function Profile() {
    const email = useSelector(state => state.userRoleemail.email);
    const role = useSelector(state => state.userRoleemail.role);
    const id = localStorage.getItem("userId");
    const Navigate = useNavigate();
    const [details, SetDetails] = useState([]);
    const [isUpdate, SetIsUpdate] = useState(false);
    const [formData, SetFormData] = useState(
        {
            userName: "",
            email: "",
            contactNumber: 0,
            location: "",
            profile: null,
            resume: null,
            companyName: ""
        }
    );
    useEffect(() => {
        async function fetchProfile() {
            const res = await getById(id);
            console.log(res.data);
            SetDetails(res.data);
        }
        fetchProfile();
    }, []);
    function handleHome() {
        Navigate("/home");
    }
    function handleChange(e) {
        const { name, value, files } = e.target;
        if (files) {

            SetFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {

            SetFormData(prev => ({ ...prev, [name]: value }));
        }
    }
    async function handleUpdateSubmit(e) {
        e.preventDefault();
        SetFormData({
            userName: formData.userName ?? "",
            email: formData.email ?? "",
            location: formData.location ?? "",
            contactNumber: formData.contactNumber ?? "",
            companyName: formData.companyName ?? "",
            profile: formData.profile ?? null,
            resume: formData.resume ?? null
        });
        try {
            const res = await updateUser(id, formData);
            console.log(res);
            alert("Update Successfull!!");
        }
        catch (err) {
            console.log(err);
        }

    }
    return (
        <div className="container mt-4">
            <div className="card p-4 shadow">

                <div className="text-center mb-4">
                    {details.profileURL && (
                        <img
                            src={`http://localhost:8080/${encodeURI(details.profileURL)}`}
                            alt="Profile"
                            width="120"
                            height="120"
                            style={{ borderRadius: "50%" }}
                        />
                    )}
                    <h3 className="mt-3">{details.userName}</h3>
                    <p>{details.email}</p>
                    {role==="JOBSEEKER" &&(
                    <p><strong>Location:</strong> {details.location}</p>
                    )}
                    {role==="JOBSEEKER" &&(
                    <p><strong>Contact Number:</strong> {details.contactNumber}</p>
                    )}
                </div>


                {details.role === "JOBSEEKER" && (
                    <>
                        <h5 className="mb-3">Education Details</h5>

                        {details.educations && details.educations.length > 0 ? (
                            details.educations.map((edu, index) => (
                                <div key={index} className="border p-3 mb-2 rounded">
                                    <p><strong>Level:</strong> {edu.levelOfStudy}</p>
                                    <p><strong>Institution:</strong> {edu.name}</p>
                                    <p><strong>Total Marks:</strong> {edu.totalMarks}</p>
                                    <p><strong>Year:</strong> {edu.yearOfCompletion}</p>
                                </div>
                            ))
                        ) : (
                            <p>No education details available.</p>
                        )}

                        {details.resumeURL && (
                            <div className="mt-3">
                                <a
                                    href={`http://localhost:8080/${encodeURI(details.resumeURL)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-primary"
                                >
                                    View Resume
                                </a>
                            </div>
                        )}
                    </>
                )}


                {role === "EMPLOYER" && (
                    <>
                        <h5 className="mb-3">Company Details</h5>

                        <p><strong>Company Name:</strong> {details.companyName}</p>


                        {details.profileURL && (
                            <div className="mt-3">
                                <img
                                    src={`http://localhost:8080/${details.profileURL}`}
                                    alt="Company Logo"
                                    width="150"
                                />
                            </div>
                        )}
                    </>
                )}

            </div>
            <button className="btn btn-warning mt-3 mb-3" onClick={() => SetIsUpdate(true)}>Update</button>
            {isUpdate && (
                <form onSubmit={handleUpdateSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input
                            className="form-control"
                            name="userName"
                            type="text"
                            value={formData.userName}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            className="form-control"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            className="form-control"
                            name="password"
                            type="text"
                            value={formData.password}
                            onChange={handleChange}

                        />
                    </div>
                    {role==="JOBSEEKER" &&(
                    <div className="mb-3">
                        <label className="form-label">Location:</label>
                        <input
                            className="form-control"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>)}
                    {role==="JOBSEEKER" &&(
                    <div className="mb-3">
                        <label className="form-label">Contact Number:</label>
                        <input
                            className="form-control"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />
                    </div>)}

                    {role === "EMPLOYER" && (
                        <div className="mb-3">
                            <label className="form-label">Company Name:</label>
                            <input
                                className="form-control"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    
                    {role==="JOBSEEKER" &&(
                    <div className="mb-3">
                        <label className="form-label">Profile:</label>
                        <input
                            className="form-control"
                            name="profile"
                            onChange={handleChange}
                            type="file"
                        />
                    </div>
                    )}
                    {role==="JOBSEEKER" &&(
                    <div className="mb-3">
                        <label className="form-label">Resume:</label>
                        <input
                            className="form-control"
                            name="resume"
                            onChange={handleChange}
                            type="file"
                        />
                    </div>)}

                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => SetIsUpdate(false)}
                    >
                        Cancel
                    </button>
                </form>
            )}
            <button className="btn btn-primary" style={{ color: "white" }} onClick={handleHome}>Home</button>

        </div>

    );

}
export default Profile;
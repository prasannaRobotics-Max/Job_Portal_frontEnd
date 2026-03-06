import axios from "axios";  
const API_URL="http://localhost:8080/applications";
const getAuthHeader=()=>{
    const token=localStorage.getItem("token");
    return{
        Authorization:`Bearer ${token}`
    };
};
export const getApplicationByEmployee=async(id)=>{
    return await axios.get(`${API_URL}/jobSeeker/${id}`,{
        headers:{
                ...getAuthHeader()
        }
    });
}
export const createApplication=async(applicationData)=>{
    return await axios.post(`${API_URL}/add`,applicationData,{
        headers:{
            'Content-Type':'application/json',
                 ...getAuthHeader()
        }
    }
)}
export const getApplicationByEmployer=async(id)=>{
    return await axios.get(`${API_URL}/employer/${id}`,
        {
            headers:{
                     ...getAuthHeader()
            }
        }
    );
}
export const updateApplication=async(id,data)=>{
    return await axios.patch(`${API_URL}/${id}`,data,{
        headers:{
            'Content-Type':'application/json',
                 ...getAuthHeader()
        }
    }
)};
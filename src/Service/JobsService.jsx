import axios from "axios";
const API_URL="http://localhost:8080/jobs";
const getAuthHeader=()=>{
const token=localStorage.getItem("token");
return{
    Authorization:`Bearer ${token}`
};
};
export const addJob=async(data)=>{
    return await axios.post(`${API_URL}/add`,data,{
        headers:{
            'Content-Type':'multipart/form-data',
            ...getAuthHeader()
        }
    });
}

export const editJob=async(id,data)=>{
    return await axios.patch(`${API_URL}/edit/${id}`,data,{
        headers:{
            'Content-Type':'multipart/form-data',
                 ...getAuthHeader()
        }
    });
}
export const deleteJob=async(id)=>{
    return await axios.delete(`${API_URL}/delete/${id}`,{
        headers:{
            ...getAuthHeader()}
    });
}
export const getJob=async(id)=>{
    return await axios.get(`${API_URL}/${id}`,{
        headers:{
                 ...getAuthHeader()
        }
    });
}
export const getAll=async()=>{
    return axios.get(`${API_URL}`,{
        headers:{
                 ...getAuthHeader()
        }
    });
}
export const getJobByEmployer=async(id)=>{
    return axios.get(`${API_URL}/employerId/${id}`,{
        headers:{
                 ...getAuthHeader()
        }
    });
}
export const getByFilter=async(filter,input)=>{
    return axios .get( `${API_URL}/${filter}/${input}`,{
        headers:{
                 ...getAuthHeader()
        }
    });
}
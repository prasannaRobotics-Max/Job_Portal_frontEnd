import axios from "axios";
const API_URL="https://job-portal-frontend-6dv2.onrender.com/users";
const getAuthHeader=()=>{
    const token=localStorage.getItem("token");
    return{
        Authorization:`Bearer ${token}`
    };
}
export const registerUser=async(UserData)=>{
    return await axios.post(`${API_URL}/add`,UserData,{
        headers:{
            'Content-Type':'multipart/form-data'
           
        }
    });
}


export const getAllUsers=async()=>{
    return await axios.get(`${API_URL}`,{
        headers:{
            ...getAuthHeader()
        }
    });
}

export const getById=async(id)=>{
    return await axios.get(`${API_URL}/${id}`,{
        headers:{
            ...getAuthHeader()
        }
    });
}
export const deleteUser=async(id)=>{
    return await axios.delete(`${API_URL}/delete/${id}`,{
        headers:{
            ...getAuthHeader()
        }
    });
}

export const updateUser=async(id,updateData)=>{
    return await axios.patch(`${API_URL}/update/${id}`,updateData,{
           headers:{
            'Content-Type':'multipart/form-data',
            ...getAuthHeader()
           }
    });
}

export const loginUser=async(data)=>{
    return await axios.post(`${API_URL}/auth`,data,{
        headers:{
            'Content-Type':'application/json',
    }
});
}

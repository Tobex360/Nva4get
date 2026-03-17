import axios from "axios";

const API_URL = 'http://localhost:9000';

const registerUser = (data)=>{
    return axios.post(`${API_URL}/user/register`,data);
}

const loginUser = (data)=>{
    return axios.post(`${API_URL}/user/login`,data);
}

const AuthServices ={
    registerUser,
    loginUser
}

export default AuthServices;
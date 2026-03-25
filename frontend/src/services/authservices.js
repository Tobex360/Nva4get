import axios from "axios";
import { API_URL } from "../config/api";

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

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


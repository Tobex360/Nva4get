const getApiUrl = () =>{
    if (import.meta.env.PROD){
        return 'https://nva4get-backend.onrender.com/';
    }
    return 'http://localhost:9000';
};

export const API_URL = getApiUrl();
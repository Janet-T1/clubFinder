import axios from "axios"

export const makeRequest = axios.create({
    baseURL:"https://clubfinderapi-62mof7e34-janet-t1s-projects.vercel.app",
    withCredentials: true, 
});
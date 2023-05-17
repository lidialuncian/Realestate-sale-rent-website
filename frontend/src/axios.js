import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true
    // headers: {
    //     post: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Headers":
    //             "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    //     }
    // }
});

export default axiosInstance;
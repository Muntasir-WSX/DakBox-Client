import axios from "axios";

const axiosInstance = axios.create
({
    baseURL: `https://dak-box-server.vercel.app`,
})
const UseAxios = () => {
    return axiosInstance;
};

export default UseAxios;
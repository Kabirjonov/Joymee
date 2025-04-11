import axios from "axios";
import { getItem } from "../helpers/manage-localstory";
axios.defaults.baseURL='http://localhost:3005/api'
axios.interceptors.request.use((config)=>{
    const token = getItem('token')
    config.headers.Authorization = token?token:''
    return config
})
export default axios